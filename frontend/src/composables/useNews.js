export const mockDestaques = [
  {
    id: 1,
    categoria: 'Roda Viva',
    titulo: 'Roda Viva entrevista o pentacampeão Cafu na próxima segunda-feira',
    descricao: 'Ao longo de uma hora, o ex-lateral da Seleção Brasileira fala sobre carreira, legado e o futuro do futebol nacional.',
    tempo: 'Há 1 hora',
    gradient: 'from-teal to-blue-900',
    hero: true,
  },
  {
    id: 2,
    categoria: 'Provoca',
    titulo: '"A violência verbal abre a porta para a violência física", alerta Patrícia Melo',
    tempo: 'Há 2 horas',
    gradient: 'from-amber-900 to-orange-900',
  },
  {
    id: 3,
    categoria: 'Virada Cultural 2026',
    titulo: 'Brasil Jazz Sinfônica leva Pixinguinha, Tom Jobim e Piazzolla ao evento',
    tempo: 'Há 4 horas',
    gradient: 'from-green-900 to-emerald-800',
  },
  {
    id: 4,
    categoria: 'Café Filosófico',
    titulo: 'Programa aborda a saúde mental em tempos de Inteligência Artificial',
    tempo: 'Há 6 horas',
    gradient: 'from-purple-900 to-indigo-900',
  },
]

export const mockNoticias = [
  { id: 5, categoria: 'Roda Viva', titulo: 'Marcelo Tas entrevista a escritora Patrícia Melo no Provoca desta terça-feira', gradient: 'from-blue-900 to-teal' },
  { id: 6, categoria: 'Roda Viva', titulo: 'No Roda Viva, diretor da Cruz Vermelha analisa impacto da violência urbana no Brasil', gradient: 'from-red-900 to-rose-800' },
  { id: 7, categoria: 'Educação', titulo: 'Aprender fazendo: educação ambiental ganha espaço no Boas Práticas', gradient: 'from-teal to-cyan-800' },
  { id: 8, categoria: 'Comemoração', titulo: 'Cocoricó celebra 30 anos na TV Cultura com programação especial', gradient: 'from-green-900 to-lime-800' },
]

export const mockRadio = [
  { id: 1, titulo: 'Cultura Livre por AJULIACOSTA', subtitulo: 'Cultura FM', icon: '♪', gradient: 'from-teal to-cyan-900' },
  { id: 2, titulo: 'Cultura Jazz — várias tendências do jazz', subtitulo: 'Cultura Brasil', icon: '♫', gradient: 'from-purple-900 to-indigo-900' },
  { id: 3, titulo: 'Schumann meets Jazz, álbum', subtitulo: 'Cultura FM', icon: '♩', gradient: 'from-blue-900 to-sky-900' },
  { id: 4, titulo: 'Concerto da Orquestra Suíça com Olga Scheps', subtitulo: 'Cultura Brasil', icon: '♬', gradient: 'from-amber-900 to-yellow-900' },
]

export const mockSchedule = [
  { time: '18h40', name: 'Shaun, o Carneiro', now: true },
  { time: '19h00', name: 'Antimatéria', now: false },
  { time: '20h00', name: 'Arena dos Saberes', now: false },
  { time: '21h00', name: 'Jornal da Cultura', now: false },
  { time: '22h30', name: 'Café Filosófico', now: false },
  { time: '23h45', name: 'Provoca', now: false },
]

export async function fetchDestaques() {
  return mockDestaques
}

export async function fetchNoticiasHome() {
  return mockNoticias
}
