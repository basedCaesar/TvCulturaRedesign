<template>
  <nav
    class="sticky top-20 z-40 bg-white border-b border-cultborder shadow-sm"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-center gap-2 md:gap-8">
      <button
        v-for="item in items"
        :key="item.id"
        @click="scrollTo(item.id)"
        :class="[
          'py-5 text-xs md:text-sm font-semibold uppercase tracking-widest transition-colors border-b-2',
          ativo === item.id
            ? 'text-teal border-teal'
            : 'text-mid border-transparent hover:text-orange'
        ]"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const items = [
  { id: 'historia', label: 'História' },
  { id: 'integrantes', label: 'Integrantes' },
  { id: 'agenda', label: 'Agenda' },
]

const ativo = ref('historia')

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const offset = 140 
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ativo.value = entry.target.id
        }
      })
    },
    { rootMargin: '-30% 0px -60% 0px' }
  )

  items.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
