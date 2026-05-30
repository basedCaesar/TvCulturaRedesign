require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const db = require('../db');
const { runMigrations } = require('../db/migrations');
const { sleep } = require('../utils/helpers');
const { downloadAndConvert } = require('../utils/downloader');

runMigrations();

const BASE_URL = 'https://cultura.uol.com.br';
const DELAY = 1500;
const VALID_CATEGORIAS = ['jornalismo', 'arte-e-cultura', 'infantil', 'educacao'];

const PROGRAM_SLUGS = [
  'agrocultura', 'antimateria', 'arenadossaberes', 'asaventurasdetintim',
  'balaio', 'bing', 'bluey', 'boaspraticas', 'brasiljazzsinfonica',
  'brasilmostraatuacara', 'brasiltocachoro', 'cabaretliterario', 'cafefilosofico',
  'camarote21', 'cartaoverde', 'classicos', 'camaraviva', 'cocorico',
  'culturaemba', 'culturalivre', 'culturamemoria', 'direcoes', 'docmundo',
  'encuentrosenbrasil', 'energia', 'entrelinhas', 'especialculturameioambiente',
  'futurando', 'godofredo', 'grandeteatroempretoebranco', 'historiadaartenobrasil',
  'inglescommusica', 'irmaodojorel', 'jornaldacultura', 'jornaldatarde',
  'letralivre', 'linhascruzadas', 'leoocaminhao', 'manoseminas', 'masha',
  'materiadecapa', 'metropolis', 'meuamigaozao', 'milo', 'missadeaparecida',
  'misteriosanimais', 'morganaeceleste', 'mosaicos', 'mundobita', 'mundodalua',
  'nossalingua', 'oiduggee', 'omortomundodegeorge', 'omundodebeakman',
  'onovosemprevem', 'pianomagicodaju', 'opiniao', 'showdaluna',
  'paramigosimparaveis', 'parquinho jurássico', 'peppapig', 'persona',
  'pjmasks', 'planetapalavra', 'preludio', 'provoca', 'missaododia',
  'receitadeviagem', 'reportereco', 'rodaviva', 'rodaretro', 'saudebrasil',
  'shaun', 'simon', 'srbrasil', 'turbossauros', 'turmadamonica',
  'violaetambor', 'viola', 'vlogsdoquintal', 'voxpopuli'
];

const http = axios.create({
  timeout: 15000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CulturaBot/1.0)' }
});

function slugToFilename(slug) {
  return slug
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

async function scrapePrograma(slug) {
  const url = `${BASE_URL}/programas/${encodeURI(slug)}`;
  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const titulo =
    $('h1').first().text().trim() ||
    $('meta[property="og:title"]').attr('content') ||
    slug;

  const descricao =
    $('#content-programa #info-programa p').first().text().trim() ||
    $('meta[property="og:description"]').attr('content') ||
    null;

  const bodyClass = ($('body').attr('class') || '') + ' ' + ($('main, #main, [role="main"]').attr('class') || '');
  const categoria = VALID_CATEGORIAS.find(c => bodyClass.includes(c)) || null;

  const imagem_url =
    $('meta[property="og:image"]').attr('content') ||
    $('[class*="capa"] img, [class*="banner"] img, [class*="thumb"] img').first().attr('src') ||
    $('img').first().attr('src') ||
    null;

  return { titulo, descricao, categoria, imagem_url, url_original: url };
}

async function scrapeEpisodeLinks(slug) {
  const { data } = await http.get(`${BASE_URL}/programas/${encodeURI(slug)}`);
  const $ = cheerio.load(data);

  const seen = new Set();
  const links = [];

  const slugPath = slugToFilename(slug);
  $(`a[href*="/programas/${slugPath}/"], a[href*="/programas/${slug}/"]`).each((_, el) => {
    const href = $(el).attr('href') || '';
    if (
      href &&
      href !== `/programas/${slug}` &&
      href !== `/programas/${slug}/` &&
      !seen.has(href)
    ) {
      seen.add(href);
      links.push(href);
    }
  });

  return links;
}

async function scrapeEpisode(url) {
  const { data } = await http.get(url);
  const $ = cheerio.load(data);

  const titulo =
    $('meta[property="og:title"]').attr('content') ||
    $('aside h2').first().text().trim() ||
    null;

  const descricao = $('article p').filter((_, el) => {
    return $(el).find('figure, iframe').length === 0 && $(el).text().trim().length > 20
  }).first().text().trim() || null;

  let data_episodio = null;
  try {
    const jsonLd = $('script[type="application/ld+json"]').first().html()
    if (jsonLd) {
      const parsed = JSON.parse(jsonLd)
      if (parsed.datePublished) data_episodio = new Date(parsed.datePublished).toISOString()
    }
  } catch (_) {}

  let youtube_id = null;
  $('iframe').each((_, el) => {
    if (youtube_id) return;
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    const match = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (match) youtube_id = match[1];
  });

  if (!youtube_id) {
    const match = data.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (match) youtube_id = match[1];
  }

  return { titulo, descricao, data_episodio, youtube_id, url_original: url };
}

function titleToSlug(title) {
  return title
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function scrapePodcasts() {
  const imgDir = path.join(__dirname, '../../data/images/podcasts');
  fs.mkdirSync(imgDir, { recursive: true });

  console.log('[FULL] Scraping podcasts...');
  const { data } = await http.get(`${BASE_URL}/podcast/`);
  const $ = cheerio.load(data);

  const insertPodcast = db.prepare(`
    INSERT INTO podcasts (titulo, descricao, imagem_url, imagem_local, url_externa, slug)
    VALUES (@titulo, @descricao, @imagem_url, @imagem_local, @url_externa, @slug)
    ON CONFLICT(slug) DO UPDATE SET
      titulo       = excluded.titulo,
      descricao    = excluded.descricao,
      imagem_url   = excluded.imagem_url,
      imagem_local = excluded.imagem_local,
      url_externa  = excluded.url_externa
  `);

  const cards = $('section.programas section.grade-box').toArray();

  for (let i = 0; i < cards.length; i++) {
    const el = cards[i];

    try {
      const titulo = $(el).find('.info-programa h3 a, .info-programa h3').first().text().trim();
      if (!titulo) continue;

      const descricao = $(el).find('section.mais p').first().text().trim() || null;
      const url_externa = $(el).find('section.mais a').last().attr('href') || null;

      const imgEl = $(el).find('img').first();
      const imagem_url =
        imgEl.attr('src') ||
        imgEl.attr('data-src') ||
        imgEl.attr('data-lazy-src') ||
        imgEl.attr('data-original') ||
        null;

      const slug = titleToSlug(titulo);

      console.log(`[FULL] Podcast encontrado: ${titulo} (${i + 1}/${cards.length})`);

      let imagem_local = null;
      const podcastImgPath = path.join(imgDir, `${slug}.webp`);
      if (imagem_url && !/placeholder|default|no-image/i.test(imagem_url)) {
        if (fs.existsSync(podcastImgPath)) {
          imagem_local = `images/podcasts/${slug}.webp`;
        } else {
          try {
            console.log(`[FULL] Baixando imagem: ${slug}.webp`);
            const fullUrl = imagem_url.startsWith('http') ? imagem_url : `${BASE_URL}${imagem_url}`;
            await downloadAndConvert(fullUrl, podcastImgPath, 400);
            imagem_local = `images/podcasts/${slug}.webp`;
          } catch (err) {
            console.error(`[FULL] Erro ao baixar imagem podcast ${slug}: ${err.message}`);
          }
        }
      }

      insertPodcast.run({ titulo, descricao, imagem_url, imagem_local, url_externa, slug });
    } catch (err) {
      console.error(`[FULL] Erro no podcast [${i}]: ${err.message}`);
    }

    if (i < cards.length - 1) await sleep(DELAY);
  }

  console.log(`[FULL] Podcasts: ${cards.length} encontrados`);
}

const insertPrograma = db.prepare(`
  INSERT INTO programas (slug, titulo, categoria, descricao, imagem_local, imagem_url, url_original)
  VALUES (@slug, @titulo, @categoria, @descricao, @imagem_local, @imagem_url, @url_original)
  ON CONFLICT(slug) DO UPDATE SET
    titulo       = excluded.titulo,
    categoria    = excluded.categoria,
    descricao    = excluded.descricao,
    imagem_local = excluded.imagem_local,
    imagem_url   = excluded.imagem_url,
    url_original = excluded.url_original
`);

const insertEpisodio = db.prepare(`
  INSERT INTO episodios (programa_id, titulo, descricao, youtube_id, url_original, data_episodio)
  VALUES (@programa_id, @titulo, @descricao, @youtube_id, @url_original, @data_episodio)
  ON CONFLICT(url_original) DO UPDATE SET
    descricao     = COALESCE(excluded.descricao, descricao),
    youtube_id    = COALESCE(excluded.youtube_id, youtube_id),
    titulo        = COALESCE(excluded.titulo, titulo),
    data_episodio = COALESCE(excluded.data_episodio, data_episodio)
`);

const getProgramaBySlug = db.prepare('SELECT id FROM programas WHERE slug = ?');

async function main() {
  console.log('[FULL] Iniciando scraper completo...');
  const startTime = Date.now();

  const imgDir = path.join(__dirname, '../../data/images/programas');
  fs.mkdirSync(imgDir, { recursive: true });

  let totalPrograms = 0;
  let totalEpisodes = 0;

  for (let i = 0; i < PROGRAM_SLUGS.length; i++) {
    const slug = PROGRAM_SLUGS[i];
    const filename = slugToFilename(slug);

    let prog;
    try {
      console.log(`[FULL] Scraping programa: ${slug} (${i + 1}/${PROGRAM_SLUGS.length})`);
      prog = await scrapePrograma(slug);
    } catch (err) {
      console.error(`[FULL] Erro ao carregar ${slug}: ${err.message}`);
      await sleep(DELAY);
      continue;
    }

    let imagem_local = null;
    const rawImgUrl = prog.imagem_url;
    const outputPath = path.join(imgDir, `${filename}.webp`);
    if (rawImgUrl && !/placeholder|default|no-image|sem-imagem/i.test(rawImgUrl)) {
      if (fs.existsSync(outputPath)) {
        imagem_local = `images/programas/${filename}.webp`;
      } else {
        try {
          console.log(`[FULL] Baixando imagem: ${filename}.webp`);
          const fullUrl = rawImgUrl.startsWith('http') ? rawImgUrl : `${BASE_URL}${rawImgUrl}`;
          await downloadAndConvert(fullUrl, outputPath, 400);
          imagem_local = `images/programas/${filename}.webp`;
        } catch (err) {
          console.error(`[FULL] Erro ao baixar imagem ${slug}: ${err.message}`);
        }
      }
    }

    const result = insertPrograma.run({ ...prog, slug, imagem_local });
    const programa_id = result.lastInsertRowid || getProgramaBySlug.get(slug)?.id;

    try {
      await sleep(DELAY);
      const episodeLinks = await scrapeEpisodeLinks(slug);
      console.log(`[FULL] Episódios encontrados: ${episodeLinks.length}`);

      for (const link of episodeLinks) {
        try {
          await sleep(DELAY);
          const ep = await scrapeEpisode(link.startsWith('http') ? link : `${BASE_URL}${link}`);
          if (ep.titulo || ep.youtube_id) {
            insertEpisodio.run({ programa_id, ...ep });
            totalEpisodes++;
          }
        } catch (err) {
          console.error(`[FULL] Erro no episódio ${link}: ${err.message}`);
        }
      }
    } catch (err) {
      console.error(`[FULL] Erro ao buscar episódios de ${slug}: ${err.message}`);
    }

    totalPrograms++;
    if (i < PROGRAM_SLUGS.length - 1) await sleep(DELAY);
  }

  await sleep(DELAY);
  try {
    await scrapePodcasts();
  } catch (err) {
    console.error('[FULL] Erro ao scraping podcasts:', err.message);
  }

  db.prepare('INSERT OR REPLACE INTO meta (chave, valor) VALUES (?, ?)').run(
    'ultima_execucao_full',
    new Date().toISOString()
  );

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  console.log(`[FULL] Concluído em ${mins}m${secs}s — ${totalPrograms} programas, ${totalEpisodes} episódios`);
}

main().catch(err => {
  console.error('[FULL] Erro fatal:', err.message);
  process.exit(1);
});
