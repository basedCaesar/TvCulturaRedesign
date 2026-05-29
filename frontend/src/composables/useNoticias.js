export const categorias = [
  'Todas',
  'Entretenimento',
  'Diversas',
  'Estação Cultura',
  'Esporte',
  'Educação',
  'Jazz Sinfônica',
]

const gradients = [
  'from-blue-900 to-teal',
  'from-purple-900 to-indigo-900',
  'from-amber-900 to-orange-900',
  'from-green-900 to-emerald-800',
  'from-red-900 to-rose-800',
  'from-slate-800 to-zinc-900',
  'from-teal to-cyan-900',
]

const base = [
  {
    categoria: 'Entretenimento',
    titulo: '"Está sendo transformador, absolutamente", afirma Gabriel Leone sobre a paternidade',
    descricao: 'Artista fala sobre a mudança que ser pai trouxe para sua vida',
  },
  {
    categoria: 'Entretenimento',
    titulo: 'Gabriel Chalita recebe Antônio Pitanga, Daniela Lima e Fat Family no Arena dos Saberes',
    descricao: 'Edição inédita vai ao ar na TV Cultura nesta quinta-feira (28), a partir das 20h',
  },
  {
    categoria: 'Entretenimento',
    titulo: 'No Roda Viva, diretor da Cruz Vermelha analisa impacto da violência urbana no Brasil',
    descricao: 'Pierre Krähenbühl discute os desafios humanitários em centros urbanos',
  },
  {
    categoria: 'Entretenimento',
    titulo: 'Marcelo Tas entrevista a escritora Patrícia Melo no Provoca desta terça-feira',
    descricao: 'Conversa percorre a obra e as inquietações da autora premiada',
  },
  {
    categoria: 'Entretenimento',
    titulo: 'Cocoricó celebra 30 anos na TV Cultura com programação especial',
    descricao: 'Personagens clássicos voltam em episódios inéditos para marcar o aniversário',
  },

  {
    categoria: 'Diversas',
    titulo: 'Mulheres na música ativam a atitude roqueira, seja com guitarras, violões ou sonoridades pesadas',
    descricao: 'Rayane Fortes, Sophia Chablau, Carne Doce e ícones como Pitty e Gal Costa são destaques desta edição',
  },
  {
    categoria: 'Diversas',
    titulo: '"A questão da desigualdade social nunca foi resolvida no Brasil", afirma Patrícia Melo',
    descricao: 'Escritora reflete sobre temas recorrentes em sua obra durante o Provoca',
  },
  {
    categoria: 'Diversas',
    titulo: 'Festival reúne jovens líderes de mais de 40 países para debater cooperação global',
    descricao: 'Encontro discute clima, tecnologia e os rumos das próximas gerações',
  },
  {
    categoria: 'Diversas',
    titulo: 'Documentário explora a história das rádios comunitárias no interior do Brasil',
    descricao: 'Produção registra o papel das emissoras locais na cultura regional',
  },

  {
    categoria: 'Estação Cultura',
    titulo: 'Destaque Literário: música e palavras em diálogo',
    descricao: 'Laurent Binet e as dinâmicas de poder de um mundo sob novas lentes',
  },
  {
    categoria: 'Estação Cultura',
    titulo: 'Café Filosófico debate a saúde mental em tempos de Inteligência Artificial',
    descricao: 'Especialistas discutem os efeitos da tecnologia sobre o bem-estar psicológico',
  },
  {
    categoria: 'Estação Cultura',
    titulo: 'Exposição revisita a trajetória do modernismo brasileiro em São Paulo',
    descricao: 'Mostra reúne obras raras e documentos inéditos do período',
  },
  {
    categoria: 'Estação Cultura',
    titulo: 'Poesia marginal ganha nova antologia comentada por pesquisadores',
    descricao: 'Coletânea resgata vozes esquecidas da literatura urbana dos anos 70',
  },

  {
    categoria: 'Esporte',
    titulo: 'Roda Viva entrevista o pentacampeão Cafu na próxima segunda-feira',
    descricao: 'Ex-lateral da Seleção fala sobre carreira, legado e o futuro do futebol nacional',
  },
  {
    categoria: 'Esporte',
    titulo: 'Documentário acompanha a base do vôlei brasileiro rumo às Olimpíadas',
    descricao: 'Câmeras seguem jovens atletas em sua rotina de treinos e sacrifícios',
  },
  {
    categoria: 'Esporte',
    titulo: 'Mesa-redonda discute o futuro do esporte amador no país',
    descricao: 'Gestores e atletas analisam financiamento e políticas públicas',
  },
  {
    categoria: 'Esporte',
    titulo: 'Programa especial relembra os grandes momentos do automobilismo nacional',
    descricao: 'Retrospectiva celebra os ídolos que marcaram época nas pistas',
  },

  {
    categoria: 'Educação',
    titulo: 'Aprender fazendo: educação ambiental ganha espaço no Boas Práticas',
    descricao: 'Projeto leva alunos para fora da sala de aula e transforma a relação com o meio ambiente',
  },
  {
    categoria: 'Educação',
    titulo: 'Boas Práticas Escolares investiga qual o papel da leitura na formação humana',
    descricao: 'Especialistas discutem como o hábito de ler molda o pensamento crítico',
  },
  {
    categoria: 'Educação',
    titulo: 'Univesp TV lança série sobre metodologias ativas de ensino',
    descricao: 'Conteúdo apresenta práticas que colocam o estudante no centro do aprendizado',
  },
  {
    categoria: 'Educação',
    titulo: 'Professores debatem o uso de tecnologia em escolas públicas',
    descricao: 'Mesa analisa avanços, desafios e desigualdades no acesso digital',
  },

  {
    categoria: 'Jazz Sinfônica',
    titulo: 'Brasil Jazz Sinfônica leva Pixinguinha, Tom Jobim e Piazzolla ao evento',
    descricao: 'Concerto especial celebra a obra de três gigantes da música instrumental',
  },
  {
    categoria: 'Jazz Sinfônica',
    titulo: 'Orquestra apresenta releituras de clássicos do jazz brasileiro',
    descricao: 'Concerto reúne arranjos inéditos de standards nacionais e internacionais',
  },
  {
    categoria: 'Jazz Sinfônica',
    titulo: '"Schumann meets Jazz": álbum funde música erudita e improvisação',
    descricao: 'Projeto explora o diálogo entre o repertório romântico e o jazz contemporâneo',
  },
  {
    categoria: 'Jazz Sinfônica',
    titulo: 'Concerto da Orquestra Suíça tem participação de Olga Scheps',
    descricao: 'Regência de Lena-Lisa Wüstendörfer marca apresentação especial da temporada',
  },
  {
    categoria: 'Jazz Sinfônica',
    titulo: 'Programação musical dedica a noite às várias tendências do jazz',
    descricao: 'Do bebop ao jazz fusion, seleção percorre décadas do gênero',
  },
  {
    categoria: 'Jazz Sinfônica',
    titulo: 'Big band convida solistas para homenagear a era de ouro do swing',
    descricao: 'Repertório resgata os arranjos que embalaram os salões nos anos 40',
  },

{
  categoria: 'Entretenimento',
  titulo: 'Documentário inédito explora bastidores do teatro brasileiro contemporâneo',
  descricao: 'Produção acompanha companhias de São Paulo, Rio e Recife durante seis meses',
},
{
  categoria: 'Entretenimento',
  titulo: 'Festival de Inverno de Campos do Jordão tem programação anunciada',
  descricao: 'Evento traz concertos, masterclasses e ópera ao ar livre em julho',
},
{
  categoria: 'Entretenimento',
  titulo: 'Filme brasileiro premiado em Cannes ganha exibição especial na Cultura',
  descricao: 'Longa será apresentado com debate ao vivo com diretor e elenco',
},
{
  categoria: 'Entretenimento',
  titulo: 'Série retrata a história da MPB pelos olhos das compositoras pioneiras',
  descricao: 'Episódios trazem entrevistas com Joyce, Rosinha de Valença e Maria Bethânia',
},
{
  categoria: 'Entretenimento',
  titulo: 'TV Cultura estreia adaptação de clássico da literatura brasileira',
  descricao: 'Minissérie em quatro episódios revisita obra de Machado de Assis',
},
{
  categoria: 'Entretenimento',
  titulo: 'Programa especial homenageia 50 anos do tropicalismo no Brasil',
  descricao: 'Caetano, Gilberto Gil e convidados especiais participam da edição',
},
{
  categoria: 'Entretenimento',
  titulo: 'Diretor Walter Salles é entrevistado em edição especial do Provoca',
  descricao: 'Cineasta fala sobre nova produção e o cenário do cinema nacional',
},
{
  categoria: 'Entretenimento',
  titulo: 'Mostra de cinema independente apresenta 30 filmes inéditos no Brasil',
  descricao: 'Curadoria reúne produções premiadas em festivais internacionais de 2025',
},
{
  categoria: 'Entretenimento',
  titulo: 'Documentário sobre samba paulista ganha versão estendida',
  descricao: 'Nova edição inclui depoimentos de Adoniran Barbosa restaurados em alta definição',
},
{
  categoria: 'Entretenimento',
  titulo: 'Programa de variedades volta à grade com nova apresentadora',
  descricao: 'Atração mistura entrevistas, música ao vivo e quadros de humor',
},

{
  categoria: 'Esporte',
  titulo: '"Rivellino é o maior ídolo que eu tenho no futebol", diz Casagrande em documentário',
  descricao: 'Produção revisitou a carreira do craque, ressaltando o legado dentro e fora de campo',
},
{
  categoria: 'Esporte',
  titulo: 'TV Cultura exibe documentário em homenagem ao craque Roberto Rivellino',
  descricao: 'Produção celebra os 80 anos de um dos maiores nomes do futebol brasileiro',
},
{
  categoria: 'Esporte',
  titulo: 'Santos x Sport: veja horário e onde assistir ao duelo da 36ª rodada do Brasileirão',
  descricao: 'Partida acontece nesta sexta-feira (28), às 21h30, na Vila Belmiro',
},
{
  categoria: 'Esporte',
  titulo: 'Fluminense x São Paulo: veja horário e onde assistir ao duelo da 36ª rodada',
  descricao: 'Partida acontece nesta quinta (19), às 20h30, no Maracanã',
},
{
  categoria: 'Esporte',
  titulo: 'Especial revisita os principais momentos da Seleção nas Copas do Mundo',
  descricao: 'Programa relembra títulos, derrotas históricas e jogadores que marcaram época',
},
{
  categoria: 'Esporte',
  titulo: 'Brasileiros se destacam no Pan-Americano com 18 medalhas no fim de semana',
  descricao: 'Atletas conquistam pódios na ginástica, natação e judô',
},
{
  categoria: 'Esporte',
  titulo: 'Programa especial discute o legado de Pelé para o futebol mundial',
  descricao: 'Mesa-redonda reúne ex-jogadores, jornalistas e historiadores do esporte',
},
{
  categoria: 'Esporte',
  titulo: 'TV Cultura transmite ao vivo final do Campeonato Paulista de Vôlei',
  descricao: 'Decisão acontece neste domingo no ginásio do Ibirapuera',
},
{
  categoria: 'Esporte',
  titulo: 'Documentário acompanha bastidores do automobilismo feminino no Brasil',
  descricao: 'Produção mostra rotina de pilotas que disputam categorias mistas',
},
{
  categoria: 'Esporte',
  titulo: 'Tênis brasileiro vive momento de renovação com nova geração',
  descricao: 'Programa apresenta jovens promessas que despontam no circuito mundial',
},
]

const datas = [
  '26/05/2026', '25/05/2026', '24/05/2026', '23/05/2026',
  '22/05/2026', '21/05/2026', '20/05/2026', '19/05/2026',
]

import { mockDestaques, mockNoticias } from './useNews.js'

export const todasNoticias = (() => {
  const expandida = []
  let i = 0
  while (expandida.length < 48) {
    expandida.push(base[i % base.length])
    i++
  }

  for (let j = expandida.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1))
    ;[expandida[j], expandida[k]] = [expandida[k], expandida[j]]
  }

  return expandida.map((b, idx) => ({
    id: 1000 + idx,
    categoria: b.categoria,
    titulo: b.titulo,
    descricao: b.descricao,
    data: datas[idx % datas.length],
    gradient: gradients[idx % gradients.length],
  }))
})()

export async function fetchNoticias() {
  return todasNoticias
}

export async function fetchNoticiaPorId(id) {
  const todas = [...mockDestaques, ...mockNoticias, ...todasNoticias]
  const noticia = todas.find(n => n.id === Number(id))
  if (!noticia) throw new Error('Notícia não encontrada.')
  return noticia
}