const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function tryGet(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) return null
  const data = await res.json()
  return data?.error ? null : data
}

export function imgUrl(imagem_local) {
  return imagem_local ? `${BASE}/${imagem_local}` : null
}

const CATEGORIAS_NOTICIAS = ['noticias', 'entretenimento', 'esporte', 'economia', 'receitas']

export const api = {
  noticias:       (page = 1, limit = 100) => get(`/api/noticias?page=${page}&limit=${limit}`),
  entretenimento: (page = 1, limit = 100) => get(`/api/entretenimento?page=${page}&limit=${limit}`),
  esporte:        (page = 1, limit = 100) => get(`/api/esporte?page=${page}&limit=${limit}`),
  economia:       (page = 1, limit = 100) => get(`/api/economia?page=${page}&limit=${limit}`),
  receitas:       (page = 1, limit = 100) => get(`/api/receitas?page=${page}&limit=${limit}`),

  async noticiaBySlug(slug) {
    for (const cat of CATEGORIAS_NOTICIAS) {
      const n = await tryGet(`/api/${cat}/${slug}`)
      if (n) return n
    }
    throw new Error('Notícia não encontrada.')
  },

  programas:  ()     => get('/api/programas'),
  programa:   (slug) => get(`/api/programas/${slug}`),
  episodio:   (id)   => get(`/api/episodios/${id}`),
  podcasts:   ()     => get('/api/podcasts'),
  grade:      (data) => get(`/api/grade${data ? `?data=${data}` : ''}`),
  gradeDatasDisponiveis: () => get('/api/grade/datas-disponiveis'),
}
