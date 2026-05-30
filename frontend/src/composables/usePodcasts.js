import { api, imgUrl } from '@/api/cultura.js'

const gradients = [
  'from-slate-900 to-slate-700',
  'from-rose-900 to-pink-800',
  'from-amber-900 to-orange-800',
  'from-emerald-900 to-green-800',
  'from-blue-900 to-indigo-800',
  'from-teal to-cyan-900',
]

function normalize(p, idx) {
  return {
    id: p.id,
    slug: p.slug,
    nome: p.titulo,
    autor: 'TV Cultura',
    descricao: p.descricao || '',
    spotify: p.url_externa || '',
    gradient: gradients[idx % gradients.length],
    imagem: imgUrl(p.imagem_local) || p.imagem_url || null,
  }
}

export async function fetchPodcasts() {
  const list = await api.podcasts()
  return list.map(normalize)
}
