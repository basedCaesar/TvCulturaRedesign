import { api, imgUrl } from '@/api/cultura.js'

const gradients = [
  'from-teal to-blue-900',
  'from-amber-900 to-orange-900',
  'from-green-900 to-emerald-800',
  'from-purple-900 to-indigo-900',
  'from-blue-900 to-teal',
  'from-red-900 to-rose-800',
  'from-teal to-cyan-800',
  'from-green-900 to-lime-800',
]

const categoriaDisplay = {
  noticias:       'Notícias',
  entretenimento: 'Entretenimento',
  esporte:        'Esporte',
  economia:       'Economia',
  receitas:       'Receitas',
}

function titleFromSlug(slug) {
  return slug
    .replace(/^\d+_/, '')
    .replace(/-/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())
}

function formatTempo(iso) {
  if (!iso) return ''
  const h = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000)
  if (h < 1) return 'Há menos de 1 hora'
  if (h < 24) return `Há ${h} hora${h > 1 ? 's' : ''}`
  const d = Math.floor(h / 24)
  return `Há ${d} dia${d > 1 ? 's' : ''}`
}

function normalize(n, idx) {
  return {
    id: n.id,
    slug: n.slug,
    categoria: categoriaDisplay[n.categoria] ?? n.categoria,
    titulo: titleFromSlug(n.slug),
    descricao: n.descricao || '',
    tempo: formatTempo(n.publicado_em),
    gradient: gradients[idx % gradients.length],
    imagem: imgUrl(n.imagem_local) || n.imagem_url || null,
  }
}

export const mockRadio = [
  { id: 1, titulo: 'Cultura Livre por AJULIACOSTA', subtitulo: 'Cultura FM', icon: '♪', gradient: 'from-teal to-cyan-900' },
  { id: 2, titulo: 'Cultura Jazz — várias tendências do jazz', subtitulo: 'Cultura Brasil', icon: '♫', gradient: 'from-purple-900 to-indigo-900' },
  { id: 3, titulo: 'Schumann meets Jazz, álbum', subtitulo: 'Cultura FM', icon: '♩', gradient: 'from-blue-900 to-sky-900' },
  { id: 4, titulo: 'Concerto da Orquestra Suíça com Olga Scheps', subtitulo: 'Cultura Brasil', icon: '♬', gradient: 'from-amber-900 to-yellow-900' },
]

export async function fetchDestaques() {
  const res = await api.noticias(1, 10)
  return res.data.slice(0, 6).map(normalize)
}

export async function fetchNoticiasHome() {
  const res = await api.noticias(1, 10)
  return res.data.slice(6, 10).map((n, i) => normalize(n, i + 6))
}

export async function fetchHeroNoticia() {
  const res = await api.noticias(1, 1)
  return res.data[0] ? normalize(res.data[0], 0) : null
}
