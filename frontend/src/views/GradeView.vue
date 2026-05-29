<template>
  <div class="max-w-6xl mx-auto px-6 py-12">

    <div class="mb-8 pb-4 border-b-2 border-teal">
      <h1 class="font-display text-3xl font-bold text-teal uppercase tracking-tight">Grade de Programação</h1>
    </div>

    <div class="flex items-center justify-center gap-2 mb-10 flex-wrap">
      <button
        :class="[
          'flex-shrink-0 w-8 h-8 flex items-center justify-center border rounded-full transition-colors',
          podeAnterior
            ? 'text-muted border-cultborder hover:border-teal hover:text-teal'
            : 'text-cultborder border-cultborder cursor-not-allowed opacity-40',
        ]"
        :disabled="!podeAnterior"
        aria-label="Dia anterior"
        @click="navDia(-1)"
      >
        ‹
      </button>

      <button
        v-for="dia in diasVisiveis"
        :key="dia.key"
        @click="selecionarDia(dia)"
        :class="[
          'flex flex-col items-center gap-0.5 px-4 py-2 rounded-lg border text-sm font-semibold transition-colors',
          diaSelecionado?.key === dia.key
            ? 'bg-teal text-white border-teal'
            : dia.isToday
              ? 'border-teal text-teal hover:bg-teal/5'
              : 'border-cultborder text-mid hover:border-teal hover:text-teal',
        ]"
      >
        <span class="text-[10px] font-bold uppercase tracking-widest opacity-70">{{ dia.diaSemana }}</span>
        <span class="text-base leading-none">{{ dia.dia }}</span>
      </button>

      <button
        :class="[
          'flex-shrink-0 w-8 h-8 flex items-center justify-center border rounded-full transition-colors',
          podePróximo
            ? 'text-muted border-cultborder hover:border-teal hover:text-teal'
            : 'text-cultborder border-cultborder cursor-not-allowed opacity-40',
        ]"
        :disabled="!podePróximo"
        aria-label="Próximo dia"
        @click="navDia(1)"
      >
        ›
      </button>
    </div>

    <div class="flex flex-col gap-5">
      <GradeCard
        v-for="item in gradeExibida"
        :key="item.horario + item.nome"
        :item="item"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getGradeParaDia, getDiasNav } from '@/composables/useGrade.js'
import GradeCard from '@/components/grade/GradeCard.vue'

const diasNav = getDiasNav()
const todayIndex = diasNav.findIndex(d => d.isToday)

const hoje = diasNav[todayIndex]
const diaSelecionado = ref(hoje)

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const diasVisiveis = computed(() => {
  const janela = isMobile.value ? 3 : 9
  const half = Math.floor(janela / 2)
  const idx = diasNav.findIndex(d => d.key === diaSelecionado.value?.key)
  const center = idx >= 0 ? idx : todayIndex
  const start = Math.max(0, Math.min(center - half, diasNav.length - janela))
  return diasNav.slice(start, start + janela)
})

const podeAnterior = computed(() => {
  const idx = diasNav.findIndex(d => d.key === diaSelecionado.value?.key)
  return idx > 0
})

const podePróximo = computed(() => {
  const idx = diasNav.findIndex(d => d.key === diaSelecionado.value?.key)
  return idx < diasNav.length - 1
})

function selecionarDia(dia) {
  diaSelecionado.value = dia
}

function navDia(dir) {
  const idx = diasNav.findIndex(d => d.key === diaSelecionado.value?.key)
  const novoIdx = Math.max(0, Math.min(idx + dir, diasNav.length - 1))
  diaSelecionado.value = diasNav[novoIdx]
}

const gradeExibida = computed(() => {
  const grade = getGradeParaDia(diaSelecionado.value?.date ?? new Date())
  const isToday = diaSelecionado.value?.isToday ?? false

  if (!isToday) return grade

  const now = new Date()
  const calMin = now.getHours() * 60 + now.getMinutes()
  const broadcastNow = calMin < 300 ? calMin + 1440 - 300 : calMin - 300

  let currentBMin = -1
  for (const item of grade) {
    if (item.broadcastMin <= broadcastNow && item.broadcastMin > currentBMin) {
      currentBMin = item.broadcastMin
    }
  }

  return grade.map(item => ({ ...item, now: item.broadcastMin === currentBMin }))
})
</script>
