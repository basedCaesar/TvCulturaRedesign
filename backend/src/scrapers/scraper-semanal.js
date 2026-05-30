require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

const db = require('../db');
const { runMigrations } = require('../db/migrations');
const { sleep, generateWeekDates } = require('../utils/helpers');
const { downloadAndConvert } = require('../utils/downloader');

runMigrations();

const BASE_URL = 'https://cultura.uol.com.br';
const DELAY = 1500;
const VALID_CATEGORIAS = ['jornalismo', 'arte-e-cultura', 'infantil', 'educacao'];
const MAX_PAGES_FALLBACK = 5;

const NEWS_SITEMAPS = [
  { categoria: 'noticias',        url: `${BASE_URL}/sitemap/noticias.xml` },
  { categoria: 'entretenimento',  url: `${BASE_URL}/sitemap/entretenimento.xml` },
  { categoria: 'economia',        url: `${BASE_URL}/sitemap/economia.xml` },
  { categoria: 'receitas',        url: `${BASE_URL}/sitemap/receitas.xml` },
  { categoria: 'esporte',         url: `${BASE_URL}/sitemap/esporte.xml` },
];

const http = axios.create({
  timeout: 15000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CulturaBot/1.0)' }
});

const upsertGrade = db.prepare(`
  INSERT INTO grade (programa_titulo, categoria, episodio_titulo, descricao, horario, data, imagem_url, link_programa)
  VALUES (@programa_titulo, @categoria, @episodio_titulo, @descricao, @horario, @data, @imagem_url, @link_programa)
  ON CONFLICT(data, horario) DO UPDATE SET
    programa_titulo = excluded.programa_titulo,
    categoria       = excluded.categoria,
    episodio_titulo = excluded.episodio_titulo,
    descricao       = excluded.descricao,
    imagem_url      = excluded.imagem_url,
    link_programa   = excluded.link_programa,
    atualizado_em   = CURRENT_TIMESTAMP
`);

const upsertNoticia = db.prepare(`
  INSERT INTO noticias (titulo, slug, categoria, conteudo, imagem_local, imagem_url, url_original, publicado_em)
  VALUES (@titulo, @slug, @categoria, @conteudo, @imagem_local, @imagem_url, @url_original, @publicado_em)
  ON CONFLICT(slug) DO UPDATE SET
    titulo      = excluded.titulo,
    categoria   = excluded.categoria,
    conteudo    = excluded.conteudo,
    imagem_local= excluded.imagem_local,
    imagem_url  = excluded.imagem_url,
    publicado_em= excluded.publicado_em
`);

async function fetchSitemapUrls(sitemapUrl, limit = 30) {
  const { data } = await http.get(sitemapUrl);
  const $ = cheerio.load(data, { xmlMode: true });

  const urls = [];
  $('url').each((_, el) => {
    if (urls.length >= limit) return false;
    const loc = $('loc', el).text().trim();
    const lastmod = $('lastmod', el).text().trim();
    const date = lastmod ? new Date(lastmod) : null;
    if (loc) urls.push({ loc, publishedAt: date });
  });

  return urls;
}

async function scrapeArticle(url) {
  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const titulo =
    $('h1').first().text().trim() ||
    $('meta[property="og:title"]').attr('content') ||
    null;

  const SELECTORS = ['article', '.conteudo', '.texto', '.corpo', '[class*="content"]']
  let container = null
  for (const sel of SELECTORS) {
    const el = $(sel).first()
    if (el.length && el.text().trim().length > 100) { container = el; break }
  }
  let conteudo = null
  if (container) {
    container.find('script, style, nav, footer, aside, .tags, .relacionadas, .leia-tambem, .leia-mais, [class*="relacionad"], [class*="compartilh"], [class*="social"]').remove()
    conteudo = container.html()?.trim() || null
  }

  const imagem_url =
    $('meta[property="og:image"]').attr('content') ||
    $('[class*="destaque"] img, [class*="featured"] img, article img').first().attr('src') ||
    null;

  const dateStr =
    $('meta[property="article:published_time"]').attr('content') ||
    $('time[datetime]').first().attr('datetime') ||
    null;

  const publicado_em = dateStr ? new Date(dateStr) : null;

  return { titulo, conteudo, imagem_url, publicado_em };
}

async function scrapeGrade() {
  const dates = generateWeekDates();

  for (const { urlDate, dbDate } of dates) {
    console.log(`[SEMANAL] Grade: ${dbDate}...`);

    try {
      const url = `${BASE_URL}/grade/${urlDate}.html`;
      const { data } = await http.get(url);
      const $ = cheerio.load(data);

      let count = 0;

      $('section.grade-box').each((_, el) => {
        const horario = $(el).find('time').first().text().trim();
        const categoria = $(el).find('.info-programa h2 a').first().text().trim() || null;
        const programa_titulo = $(el).find('.info-programa h3 a').first().text().trim();
        const episodio_titulo = $(el).find('.info-programa h4, section.mais h3, section.mais h4').first().text().trim() || null;
        const descricao = $(el).find('section.mais p').first().text().trim() || null;
        const imagem_url = $(el).find('img').first().attr('src') || null;
        const link_href = $(el).find('a[href*="/programas/"]').first().attr('href') || null;
        const link_programa = link_href ? (link_href.startsWith('http') ? link_href : `${BASE_URL}${link_href}`) : null;

        if (horario && programa_titulo) {
          try {
            upsertGrade.run({ programa_titulo, categoria, episodio_titulo, descricao, horario, data: dbDate, imagem_url, link_programa });
            count++;
          } catch (err) {
            console.error(`[SEMANAL] Erro ao salvar grade ${dbDate} ${horario}: ${err.message}`);
          }
        }
      });

      console.log(`[SEMANAL] Grade ${dbDate}: ${count} itens`);

    } catch (err) {
      if (err.response?.status === 404) {
        console.log(`[SEMANAL] Grade ${dbDate}: sem dados`);
      } else {
        console.error(`[SEMANAL] Erro na grade ${dbDate}: ${err.message}`);
      }
    }

    await sleep(DELAY);
  }
}

async function scrapeNoticias() {
  const imgDir = path.join(__dirname, '../../data/images/noticias');
  fs.mkdirSync(imgDir, { recursive: true });

  const LIMIT_POR_CATEGORIA = 30;

  let totalNoticias = 0;
  let novasNoticias = 0;

  for (const { categoria, url: sitemapUrl } of NEWS_SITEMAPS) {
    console.log(`[SEMANAL] Notícias ${categoria}...`);

    let urls;
    try {
      urls = await fetchSitemapUrls(sitemapUrl, LIMIT_POR_CATEGORIA);
      console.log(`[SEMANAL] ${categoria}: ${urls.length} URLs`);
    } catch (err) {
      console.error(`[SEMANAL] Erro sitemap ${categoria}: ${err.message}`);
      continue;
    }

    for (const { loc, publishedAt } of urls) {
      const slug = loc.replace(/\.html$/, '').replace(/\/$/, '').split('/').pop();
      if (!slug) continue;

      try {
        await sleep(DELAY);
        const article = await scrapeArticle(loc);

        if (!article.titulo) continue;

        const publicado_em = article.publicado_em || publishedAt;

        let imagem_local = null;
        if (article.imagem_url && !/placeholder|default|no-image/i.test(article.imagem_url)) {
          try {
            const outputPath = path.join(imgDir, `${slug}.webp`);
            const fullUrl = article.imagem_url.startsWith('http') ? article.imagem_url : `${BASE_URL}${article.imagem_url}`;
            await downloadAndConvert(fullUrl, outputPath, 800);
            imagem_local = `images/noticias/${slug}.webp`;
          } catch (err) {
            console.error(`[SEMANAL] Erro imagem ${slug}: ${err.message}`);
          }
        }

        const existing = db.prepare('SELECT id FROM noticias WHERE slug = ?').get(slug);
        upsertNoticia.run({
          titulo: article.titulo,
          slug,
          categoria,
          conteudo: article.conteudo,
          imagem_local,
          imagem_url: article.imagem_url,
          url_original: loc,
          publicado_em: publicado_em ? publicado_em.toISOString() : null
        });

        totalNoticias++;
        if (!existing) novasNoticias++;

      } catch (err) {
        console.error(`[SEMANAL] Erro notícia ${loc}: ${err.message}`);
      }
    }
  }

  console.log(`[SEMANAL] Notícias: ${totalNoticias} processadas, ${novasNoticias} novas`);
}

async function runSemanal() {
  console.log('[SEMANAL] Iniciando atualização semanal...');
  try {
    await scrapeGrade();
    await scrapeNoticias();
    db.prepare('INSERT OR REPLACE INTO meta (chave, valor) VALUES (?, ?)').run(
      'ultima_execucao_semanal',
      new Date().toISOString()
    );
    console.log('[SEMANAL] Concluído.');
  } catch (err) {
    console.error('[SEMANAL] Erro fatal:', err.message);
  }
}

if (require.main === module) {
  runSemanal().catch(err => {
    console.error('[SEMANAL] Erro:', err.message);
    process.exit(1);
  });
}

module.exports = { runSemanal };
