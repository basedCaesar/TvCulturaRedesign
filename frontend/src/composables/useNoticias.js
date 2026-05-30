import DOMPurify from 'dompurify'
import { api, imgUrl } from '@/api/cultura.js'

export const categorias = [
  'Todas',
  'Notícias',
  'Entretenimento',
  'Esporte',
  'Economia',
  'Receitas',
]

const categoriaDisplay = {
  noticias:       'Notícias',
  entretenimento: 'Entretenimento',
  esporte:        'Esporte',
  economia:       'Economia',
  receitas:       'Receitas',
}

const gradients = [
  'from-blue-900 to-teal',
  'from-purple-900 to-indigo-900',
  'from-amber-900 to-orange-900',
  'from-green-900 to-emerald-800',
  'from-red-900 to-rose-800',
  'from-slate-800 to-zinc-900',
  'from-teal to-cyan-900',
]

function titleFromSlug(slug) {
  return slug
    .replace(/^\d+_/, '')
    .replace(/-/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())
}

function formatData(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('pt-BR')
}

function formatTempo(iso) {
  if (!iso) return ''
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000)
  if (h < 1) return 'Há menos de 1 hora'
  if (h < 24) return `Há ${h} hora${h > 1 ? 's' : ''}`
  const d = Math.floor(h / 24)
  return `Há ${d} dia${d > 1 ? 's' : ''}`
}

function sanitizeHtml(raw) {
  if (!raw) return null
  return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } })
}

function normalize(n, idx) {
  return {
    id: n.id,
    slug: n.slug,
    categoria: categoriaDisplay[n.categoria] ?? n.categoria,
    titulo: titleFromSlug(n.slug),
    descricao: n.descricao || '',
    data: formatData(n.publicado_em),
    tempo: formatTempo(n.publicado_em),
    gradient: gradients[idx % gradients.length],
    imagem: imgUrl(n.imagem_local) || n.imagem_url || null,
    conteudoHtml: sanitizeHtml(n.conteudo),
  }
}

export async function fetchNoticias() {
  const [r1, r2, r3, r4, r5] = await Promise.all([
    api.noticias(1, 100),
    api.entretenimento(1, 100),
    api.esporte(1, 100),
    api.economia(1, 100),
    api.receitas(1, 100),
  ])
  const all = [...r1.data, ...r2.data, ...r3.data, ...r4.data, ...r5.data]
  return all.map(normalize)
}

export async function fetchNoticiaPorId(slug) {
  const n = await api.noticiaBySlug(slug)
  return normalize(n, n.id % gradients.length)
}
