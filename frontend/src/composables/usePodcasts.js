export const podcasts = [
  {
    id: 1,
    nome: 'Pergunte ao Mestre',
    autor: 'Rádio Cultura FM',
    descricao: 'O maestro João Mauricio Galindo responde às dúvidas sobre o universo da música clássica.',
    spotify: 'https://open.spotify.com/show/7vHLPpnIHKIilPJoXFCgwq',
    gradient: 'from-slate-900 to-slate-700',
  },
  {
    id: 2,
    nome: 'Melhor da Vida',
    autor: 'TV Cultura',
    descricao: 'Fabi Buzatto aborda temas que ajudam pessoas a viverem com mais leveza, saúde e propósito.',
    spotify: 'https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk',
    gradient: 'from-rose-900 to-pink-800',
  },
  {
    id: 3,
    nome: 'Opinião',
    autor: 'TV Cultura',
    descricao: 'Debate semanal sobre os assuntos que estão movimentando a política, a economia e a sociedade.',
    spotify: 'https://open.spotify.com/show/5EqqB52m2bsr4k1Ii7sStS',
    gradient: 'from-amber-900 to-orange-800',
  },
  {
    id: 4,
    nome: 'Provocast',
    autor: 'TV Cultura',
    descricao: 'Versão podcast do Provoca, com Marcelo Tas e convidados que provocam reflexões sobre arte e cultura.',
    spotify: 'https://open.spotify.com/show/3qG0aXTVFVjrpgFhiE4jFq',
    gradient: 'from-emerald-900 to-green-800',
  },
  {
    id: 5,
    nome: 'Café Filosófico',
    autor: 'TV Cultura',
    descricao: 'Programa de filosofia e psicanálise com as ideias de grandes pensadores sobre o mundo contemporâneo.',
    spotify: 'https://open.spotify.com/show/0qJW0nVmFDiIynLXBFcHzN',
    gradient: 'from-blue-900 to-indigo-800',
  },
  {
    id: 6,
    nome: 'Roda Viva',
    autor: 'TV Cultura',
    descricao: 'Os melhores momentos e entrevistas completas do programa mais longevo da televisão brasileira.',
    spotify: 'https://open.spotify.com/show/2mFNFGcIaqrpTfbfHwzCHH',
    gradient: 'from-teal to-cyan-900',
  },
]

export async function fetchPodcasts() {
  return podcasts
}
