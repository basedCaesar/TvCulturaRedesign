import { api } from '@/api/cultura.js'

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

const DIAS_SEMANA      = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const DIAS_SEMANA_FULL = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const MESES            = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
const MESES_ABREV      = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export function getDataFormatada(date = getBroadcastDate()) {
  return `${DIAS_SEMANA_FULL[date.getDay()]}, ${date.getDate()} de ${MESES[date.getMonth()]}`
}

export function getDiasNav() {
  const hoje = getBroadcastDate()
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

const gradienteCategoria = {
  'Notícias':       'from-blue-900 to-indigo-800',
  'Cultura':        'from-pink-900 to-rose-700',
  'Infantil':       'from-emerald-900 to-green-800',
  'Educação':       'from-purple-900 to-violet-800',
  'Arte e Cultura': 'from-amber-900 to-orange-800',
}
const gradienteFallback = 'from-slate-800 to-slate-600'

function extractSlug(link) {
  if (!link) return null
  return link.split('/').filter(Boolean).pop() || null
}

function normalizeItem(item) {
  return {
    horario:     item.horario,
    horarioFmt:  formatHorario(item.horario),
    nome:        item.programa_titulo,
    categoria:   item.categoria,
    gradient:    gradienteCategoria[item.categoria] ?? gradienteFallback,
    imagem:      item.programa_imagem_local || null,
    programaId:  extractSlug(item.link_programa),
    descricao:   item.episodio_titulo || item.descricao || null,
    broadcastMin: toBroadcastMin(item.horario),
    now:         false,
  }
}

export async function fetchGradeParaDia(dateStr) {
  const res = await api.grade(dateStr)
  return res.items
    .map(normalizeItem)
    .sort((a, b) => a.broadcastMin - b.broadcastMin)
}

function currentBroadcastMin() {
  const now = new Date()
  const cal = now.getHours() * 60 + now.getMinutes()
  return cal < 300 ? cal + 1440 - 300 : cal - 300
}

function getBroadcastDate() {
  const now = new Date()
  if (now.getHours() < 5) {
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
  }
  return now
}

function localDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function fetchAgendaProxima() {
  const todayStr = localDateStr(getBroadcastDate())
  const items = await fetchGradeParaDia(todayStr)
  const curMin = currentBroadcastMin()
  let nowIdx = 0
  for (let i = 0; i < items.length; i++) {
    if (items[i].broadcastMin <= curMin) nowIdx = i
  }
  return items.map((item, i) => ({ ...item, now: i === nowIdx }))
}
