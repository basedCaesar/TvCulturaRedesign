<template>
  <div class="max-w-6xl mx-auto px-6 py-12">

    <div class="mb-2 pb-4 border-b-2 border-teal">
      <h1 class="font-display text-3xl font-bold text-teal uppercase tracking-tight">Programas</h1>
    </div>

    <nav class="flex items-center justify-center gap-2 md:gap-10 my-10 flex-wrap">
      <button
        v-for="cat in categoriasProgramas"
        :key="cat"
        @click="selecionar(cat)"
        :class="[
          'text-sm md:text-base font-semibold uppercase tracking-widest pb-2 border-b-2 transition-colors',
          categoriaAtiva === cat
            ? 'text-teal border-teal'
            : 'text-mid border-transparent hover:text-orange'
        ]"
      >
        {{ cat }}
      </button>
    </nav>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <SkeletonCard v-for="i in 8" :key="i" />
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-muted text-lg mb-4">{{ error }}</p>
      <button @click="execute" class="text-teal text-sm font-semibold hover:underline">
        Tentar novamente
      </button>
    </div>

    <div v-else-if="filtrados.length" ref="gridRef" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <ProgramaCard
        v-for="p in filtrados"
        :key="p.id"
        :programa="p"
      />
    </div>

    <div v-else class="text-center py-20">
      <p class="text-muted text-lg">Nenhum programa nesta categoria.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { categoriasProgramas, fetchProgramas } from '@/composables/useProgramas.js'
import { useAsync } from '@/composables/useAsync.js'
import ProgramaCard from '@/components/programas/ProgramaCard.vue'
import SkeletonCard from '@/components/ui/SkeletonCard.vue'

const categoriaAtiva = ref('Todos')
const gridRef = ref(null)

const { loading, error, data: programas, execute } = useAsync(fetchProgramas)
onMounted(() => execute())

const filtrados = computed(() => {
  if (!programas.value) return []
  if (categoriaAtiva.value === 'Todos') return programas.value
  return programas.value.filter(p => p.categoria === categoriaAtiva.value)
})

function selecionar(cat) {
  categoriaAtiva.value = cat
  if (gridRef.value) {
    const top = gridRef.value.getBoundingClientRect().top + window.scrollY - 200
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>
