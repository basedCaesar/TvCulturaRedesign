export const categoriasProgramas = [
  'Todos',
  'Notícias',
  'Arte e Cultura',
  'Infantil',
  'Educação',
]

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

const programasBase = [
  { nome: 'Roda Viva', categoria: 'Notícias', descricao: 'Um espaço plural para a apresentação de ideias, conceitos e análises sobre temas de interesse da população.' },
  { nome: 'Jornal da Cultura', categoria: 'Notícias', descricao: 'Telejornal noturno que apresenta os principais fatos do Brasil e do mundo com análises aprofundadas.' },
  { nome: 'Jornal da Tarde', categoria: 'Notícias', descricao: 'No ar de segunda a sexta, traz um olhar mais atento para temas de interesse para toda a família.' },
  { nome: 'Opinião', categoria: 'Notícias', descricao: 'Debate semanal sobre os assuntos que estão movimentando a política, a economia e a sociedade.' },

  { nome: 'Metrópolis', categoria: 'Arte e Cultura', descricao: 'A arte e a cultura do mundo em todas as suas manifestações são a matéria-prima do Metrópolis, no ar desde 1988.' },
  { nome: 'Provoca', categoria: 'Arte e Cultura', descricao: 'Marcelo Tas conversa com personalidades que provocam reflexões sobre arte, cultura e comportamento.' },
  { nome: 'Encontros em Brasil', categoria: 'Arte e Cultura', descricao: 'O músico Paulinho Moska recebe cantores na atração, e, juntos, eles visitam diversas cidades do Brasil.' },
  { nome: 'O Novo Sempre Vem', categoria: 'Arte e Cultura', descricao: 'Abre espaço para descobertas musicais da nova cena nacional e oferece visibilidade a diferentes recortes da produção atual.' },
  { nome: 'Brasil Jazz Sinfônica', categoria: 'Arte e Cultura', descricao: 'Concertos da Orquestra Brasil Jazz Sinfônica, preservando o repertório sinfônico popular brasileiro.' },

  { nome: 'Quintal da Cultura', categoria: 'Infantil', descricao: 'Une entretenimento e conhecimento, despertando curiosidade nas crianças pelo mundo ao seu redor.' },
  { nome: 'Bluey', categoria: 'Infantil', descricao: 'O desenho traz uma cachorrinha da raça Blue Heeler, que adora brincar e transforma a vida familiar cotidiana em aventuras extraordinárias.' },
  { nome: 'Paramigos Imparáveis', categoria: 'Infantil', descricao: 'Mostra como um grupo de amigos, unidos pelo esporte e pelo amor à natureza, transformam o mundo.' },
  { nome: 'Mistérios Animais', categoria: 'Infantil', descricao: 'Acompanha as aventuras de Sam Snow e Kit Casey, dois agentes que viajam pelo mundo resolvendo mistérios.' },
  { nome: 'Morgana e Celeste', categoria: 'Infantil', descricao: 'Em Morgana & Celeste, a poderosa feiticeira volta ao porão do castelo para colocar o lugar em ordem.' },
  { nome: 'As Aventuras de Tintim', categoria: 'Infantil', descricao: 'Tintim é um jovem repórter que viaja o mundo em busca de aventuras enfrentando perigos e desvendando mistérios.' },
  { nome: 'Cocoricó', categoria: 'Infantil', descricao: 'Programa clássico da TV Cultura que apresenta as aventuras dos personagens do sítio com música e brincadeiras.' },
  { nome: 'Mundo da Lua', categoria: 'Infantil', descricao: 'Mais do que nostalgia, é um convite para que pais e filhos vivam juntos a imaginação e a magia de sonhar acordados.' },

  { nome: 'Arena dos Saberes', categoria: 'Educação', descricao: 'Em cada entrevista promove um aprendizado, uma troca de experiências e de conhecimento enriquecedora para o público.' },
  { nome: 'Viola e Tambor', categoria: 'Educação', descricao: 'Direcionada a crianças de três a seis anos, é uma produção infantil que celebra a diversidade cultural brasileira.' },
  { nome: 'Café Filosófico', categoria: 'Educação', descricao: 'Programa de filosofia e psicanálise com as ideias de grandes pensadores sobre o mundo contemporâneo.' },
  { nome: 'Repórter Eco', categoria: 'Educação', descricao: 'Programa de prestígio, nasceu como o primeiro telejornal especializado em meio ambiente da TV brasileira.' },
  { nome: 'Boas Práticas Escolares', categoria: 'Educação', descricao: 'Investiga experiências pedagógicas inovadoras em escolas públicas e privadas pelo Brasil.' },
  { nome: 'Antimatéria', categoria: 'Educação', descricao: 'Programa de divulgação científica que aborda os grandes temas da física, química, biologia e tecnologia.' },
]

function slugify(txt) {
  return txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function gerarEpisodios(programa, gradient) {
  const episodios = []
  const hoje = new Date('2026-05-20')
  const slug = slugify(programa.nome)

  for (let i = 0; i < 24; i++) {
    const data = new Date(hoje)
    data.setDate(hoje.getDate() - i)
    const dd = String(data.getDate()).padStart(2, '0')
    const mm = String(data.getMonth() + 1).padStart(2, '0')
    const yyyy = data.getFullYear()
    const dataFmt = `${dd}/${mm}/${yyyy}`

    episodios.push({
      id: `${slug}-${yyyy}${mm}${dd}`,
      titulo: `${programa.nome} | ${dataFmt}`,
      data: dataFmt,
      youtubeId: '', 
      descricao: `Confira a edição de ${dataFmt} de ${programa.nome}. Conteúdo completo disponível em breve.`,
      gradient,
    })
  }
  return episodios
}



export const programas = programasBase.map((p, i) => {
  const gradient = gradients[i % gradients.length]
  return {
    id: i + 1,
    ...p,
    gradient,
    descricaoLonga: p.descricao,
    episodios: gerarEpisodios(p, gradient),
  }
})



export function getProgramaPorId(id) {
  return programas.find(p => p.id === Number(id))
}

export function getEpisodio(programaId, epId) {
  const programa = getProgramaPorId(programaId)
  if (!programa) return { programa: null, episodio: null }
  const episodio = programa.episodios.find(e => e.id === epId)
  return { programa, episodio }
}

export async function fetchProgramas() {
  return programas
}

export async function fetchProgramaPorId(id) {
  const p = getProgramaPorId(id)
  if (!p) throw new Error('Programa não encontrado.')
  return p
}

export async function fetchEpisodio(programaId, epId) {
  const result = getEpisodio(programaId, epId)
  if (!result.programa || !result.episodio) throw new Error('Episódio não encontrado.')
  return result
}
