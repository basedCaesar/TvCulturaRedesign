import { api, imgUrl } from '@/api/cultura.js'

export const categoriasProgramas = [
  'Todos',
  'Notícias',
  'Arte e Cultura',
  'Infantil',
  'Educação',
]

const categoriaDisplay = {
  jornalismo:       'Notícias',
  'arte-e-cultura': 'Arte e Cultura',
  infantil:         'Infantil',
  educacao:         'Educação',
}

const gradients = [
  'from-amber-900 to-orange-800',
  'from-rose-900 to-pink-800',
  'from-slate-900 to-slate-700',
  'from-emerald-900 to-green-800',
  'from-blue-900 to-indigo-800',
  'from-purple-900 to-violet-800',
  'from-red-900 to-rose-800',
  'from-cyan-900 to-blue-800',
  'from-orange-900 to-red-800',
  'from-teal to-cyan-900',
  'from-yellow-900 to-amber-800',
  'from-fuchsia-900 to-purple-800',
]

function titleFromUrl(url) {
  if (!url) return ''
  try {
    return url
      .split('/').pop()
      .replace(/\.html?$/, '')
      .replace(/^\d+_/, '')
      .replace(/-/g, ' ')
      .replace(/^\w/, c => c.toUpperCase())
  } catch {
    return ''
  }
}

function normalizePrograma(p, gradient) {
  return {
    id: p.id,
    slug: p.slug,
    nome: p.titulo,
    categoria: categoriaDisplay[p.categoria] ?? p.categoria ?? '',
    descricao: p.descricao?.trim() || '',
    descricaoLonga: p.descricao?.trim() || '',
    imagem: imgUrl(p.imagem_local) || null,
    gradient,
  }
}

function normalizeEpisodio(ep, gradient) {
  return {
    id: ep.id,
    titulo: titleFromUrl(ep.url_original),
    descricao: ep.descricao || '',
    youtubeId: ep.youtube_id || '',
    data: ep.data_episodio || '',
    gradient,
  }
}

export async function fetchProgramas() {
  const list = await api.programas()
  return list.map((p, i) => normalizePrograma(p, gradients[i % gradients.length]))
}

export async function fetchProgramaPorId(slug) {
  const p = await api.programa(slug)
  const gradient = gradients[p.id % gradients.length]
  return {
    ...normalizePrograma(p, gradient),
    episodios: (p.episodios || []).map(ep => normalizeEpisodio(ep, gradient)),
  }
}

export async function fetchEpisodio(programSlug, epId) {
  const p = await api.programa(programSlug)
  const gradient = gradients[p.id % gradients.length]
  const programa = normalizePrograma(p, gradient)
  const raw = (p.episodios || []).find(ep => String(ep.id) === String(epId))
  if (!raw) throw new Error('Episódio não encontrado.')
  return { programa, episodio: normalizeEpisodio(raw, gradient) }
}
