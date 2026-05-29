import { programas } from './useProgramas.js'

function toCalMin(horario) {
  const [h, m] = horario.split(':').map(Number)
  return h * 60 + m
}


function toBroadcastMin(horario) {
  const cal = toCalMin(horario)
  return cal < 300 ? cal + 1440 - 300 : cal - 300
}

export function formatHorario(horario) {
  return horario.replace(':', 'h')
}

function findPrograma(nome) {
  return programas.find(p => p.nome.toLowerCase() === nome.toLowerCase()) ?? null
}

const gradienteFallback = 'from-slate-800 to-slate-600'

const gradeBase = [
  { horario: '05:00', nome: 'Jornal da Cultura',       categoria: 'Notícias'      },
  { horario: '05:55', nome: 'Abertura da Emissora',    categoria: 'Cultura',       gradient: 'from-orange-900 to-orange-700' },
  { horario: '06:00', nome: 'Energia',                 categoria: 'Cultura',       gradient: 'from-pink-900 to-rose-700' },
  { horario: '06:30', nome: 'Quintal da Cultura',      categoria: 'Infantil'      },
  { horario: '07:00', nome: 'Bluey',                   categoria: 'Infantil'      },
  { horario: '07:30', nome: 'Cocoricó',                categoria: 'Infantil'      },
  { horario: '08:00', nome: 'Paramigos Imparáveis',    categoria: 'Infantil'      },
  { horario: '08:30', nome: 'Morgana e Celeste',       categoria: 'Infantil'      },
  { horario: '09:00', nome: 'Viola e Tambor',          categoria: 'Educação'      },
  { horario: '09:30', nome: 'Boas Práticas Escolares', categoria: 'Educação'      },
  { horario: '10:00', nome: 'Repórter Eco',            categoria: 'Educação'      },
  { horario: '10:30', nome: 'Antimatéria',             categoria: 'Educação'      },
  { horario: '11:30', nome: 'Café Filosófico',         categoria: 'Educação'      },
  { horario: '12:30', nome: 'Jornal da Tarde',         categoria: 'Notícias'      },
  { horario: '13:30', nome: 'Arena dos Saberes',       categoria: 'Educação'      },
  { horario: '14:30', nome: 'Metrópolis',              categoria: 'Arte e Cultura'},
  { horario: '15:30', nome: 'O Novo Sempre Vem',       categoria: 'Arte e Cultura'},
  { horario: '16:00', nome: 'Encontros em Brasil',     categoria: 'Arte e Cultura'},
  { horario: '17:00', nome: 'As Aventuras de Tintim',  categoria: 'Infantil'      },
  { horario: '17:30', nome: 'Mistérios Animais',       categoria: 'Infantil'      },
  { horario: '18:00', nome: 'Mundo da Lua',            categoria: 'Infantil'      },
  { horario: '18:30', nome: 'Roda Viva',               categoria: 'Notícias'      },
  { horario: '20:00', nome: 'Jornal da Cultura',       categoria: 'Notícias'      },
  { horario: '21:00', nome: 'Opinião',                 categoria: 'Notícias'      },
  { horario: '22:00', nome: 'Provoca',                 categoria: 'Arte e Cultura'},
  { horario: '23:00', nome: 'Café Filosófico',         categoria: 'Educação'      },
  { horario: '00:00', nome: 'Metrópolis',              categoria: 'Arte e Cultura'},
  { horario: '01:30', nome: 'Arena dos Saberes',       categoria: 'Educação'      },
  { horario: '02:30', nome: 'Antimatéria',             categoria: 'Educação'      },
  { horario: '03:30', nome: 'Encontros em Brasil',     categoria: 'Arte e Cultura'},
]

export const gradeCompleta = gradeBase
  .map(item => {
    const programa = findPrograma(item.nome)
    return {
      ...item,
      horarioFmt: formatHorario(item.horario),
      broadcastMin: toBroadcastMin(item.horario),
      gradient: programa?.gradient ?? item.gradient ?? gradienteFallback,
      programaId: programa?.id ?? null,
      descricao: programa?.descricao ?? null,
    }
  })
  .sort((a, b) => a.broadcastMin - b.broadcastMin)

export const gradeDisplay = [
  ...gradeCompleta.filter(i => i.horario !== '05:00'),
  ...gradeCompleta.filter(i => i.horario === '05:00'),
]

const MORNING_END    = 390  
const AFTERNOON_START = 450  
const PRIME_START     = 810  

function rotateBlock(block, shift) {
  const s = ((shift % block.length) + block.length) % block.length
  const rotated = [...block.slice(s), ...block.slice(0, s)]
  return block.map((slot, i) => ({
    ...rotated[i],
    horario: slot.horario,
    horarioFmt: slot.horarioFmt,
    broadcastMin: slot.broadcastMin,
    now: false,
  }))
}

export function getGradeParaDia(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const dayDiff = Math.round((d.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

  if (dayDiff === 0) return gradeDisplay

  const morning   = gradeDisplay.filter(i => i.broadcastMin <= MORNING_END)
  const afternoon = gradeDisplay.filter(i => i.broadcastMin >= AFTERNOON_START && i.broadcastMin < PRIME_START)
  const prime     = gradeDisplay.filter(i => i.broadcastMin >= PRIME_START && i.horario !== '05:00')
  const last      = gradeDisplay.find(i => i.horario === '05:00')

  return [
    ...morning.map(i => ({ ...i, now: false })),
    ...rotateBlock(afternoon, dayDiff),
    ...rotateBlock(prime, dayDiff * 2),
    ...(last ? [{ ...last, now: false }] : []),
  ]
}

function getCurrentIndex() {
  const now = new Date()
  const calMin = now.getHours() * 60 + now.getMinutes()
  const broadcastNow = calMin < 300 ? calMin + 1440 - 300 : calMin - 300

  let idx = 0
  for (let i = 0; i < gradeCompleta.length; i++) {
    if (gradeCompleta[i].broadcastMin <= broadcastNow) idx = i
  }
  return idx
}

export function getAgendaProxima(count = 6) {
  const currentIdx = getCurrentIndex()
  return Array.from({ length: count }, (_, i) => ({
    ...gradeCompleta[(currentIdx + i) % gradeCompleta.length],
    now: i === 0,
  }))
}


const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const DIAS_SEMANA_FULL = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
const MESES_ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export function getDataFormatada(date = new Date()) {
  return `${DIAS_SEMANA_FULL[date.getDay()]}, ${date.getDate()} de ${MESES[date.getMonth()]}`
}

export function getDiasNav() {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  return Array.from({ length: 21 }, (_, i) => {
    const d = new Date(hoje)
    d.setDate(hoje.getDate() + i - 10)
    return {
      date: d,
      diaSemana: DIAS_SEMANA[d.getDay()],
      dia: d.getDate(),
      mes: MESES_ABREV[d.getMonth()],
      isToday: d.getTime() === hoje.getTime(),
      key: d.toISOString().slice(0, 10),
    }
  })
}
