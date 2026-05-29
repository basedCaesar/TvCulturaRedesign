<template>

  <div v-if="loading" class="max-w-6xl mx-auto px-6 py-12 animate-pulse">
    <div class="h-4 bg-gray-200 rounded w-16 mb-8" />
    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <div class="flex flex-col gap-4">
        <div class="h-10 bg-gray-200 rounded w-2/3" />
        <div class="h-5 bg-gray-200 rounded w-1/4" />
        <div class="h-4 bg-gray-200 rounded w-full" />
        <div class="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div class="aspect-video rounded-xl bg-gray-200" />
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <SkeletonCard v-for="i in 8" :key="i" />
    </div>
  </div>

  <div v-else-if="error" class="max-w-3xl mx-auto px-6 py-20 text-center">
    <p class="text-muted text-lg mb-4">{{ error }}</p>
    <RouterLink to="/programas" class="text-teal font-semibold hover:underline">
      Ver todos os programas
    </RouterLink>
  </div>

  <div v-else-if="programa" class="max-w-6xl mx-auto px-6 py-12">

    <!-- Voltar -->
    <button @click="voltar" class="text-teal text-sm font-semibold hover:underline mb-8 inline-block">
      ← Voltar
    </button>

    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <!-- Info -->
      <div class="flex flex-col justify-center">
        <h1 class="font-display text-4xl font-bold text-teal uppercase mb-4">{{ programa.nome }}</h1>
        <span class="inline-block self-start text-[10px] font-bold uppercase tracking-widest text-orange bg-orange/10 px-3 py-1 rounded mb-6">
          {{ programa.categoria }}
        </span>
        <p class="text-mid text-base leading-relaxed">{{ programa.descricaoLonga }}</p>
      </div>

      <div :class="`aspect-video rounded-xl bg-gradient-to-br ${programa.gradient} flex items-center justify-center`">
        <span class="font-display text-white/40 text-2xl font-bold tracking-widest text-center px-6">
          {{ programa.nome.toUpperCase() }}
        </span>
      </div>
    </div>

    <div class="flex items-baseline justify-between mb-8 pb-4 border-b-2 border-dark">
      <h2 class="font-display text-2xl font-bold text-dark uppercase">Histórico de programas</h2>
      <span class="text-sm text-muted">{{ programa.episodios.length }} episódios</span>
    </div>

    <div v-if="programa.episodios.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <EpisodioCard
        v-for="ep in episodiosPaginados"
        :key="ep.id"
        :episodio="ep"
        :programa-id="programa.id"
      />
    </div>

    <div v-else class="text-center py-16">
      <p class="text-muted text-base">Nenhum episódio disponível no momento.</p>
    </div>

    <div v-if="totalPages > 1" class="mt-12">
      <PaginationNav
        :current="page"
        :total-pages="totalPages"
        @update:page="irParaPagina"
      />
    </div>

  </div>

</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchProgramaPorId } from '@/composables/useProgramas.js'
import { useAsync } from '@/composables/useAsync.js'
import EpisodioCard from '@/components/programas/EpisodioCard.vue'
import PaginationNav from '@/components/ui/PaginationNav.vue'
import SkeletonCard from '@/components/ui/SkeletonCard.vue'

const POR_PAGINA = 8
const route = useRoute()
const router = useRouter()

const page = ref(1)
const { loading, error, data: programa, execute: load } = useAsync(() => fetchProgramaPorId(route.params.id))

watch(() => route.params.id, () => { load(); page.value = 1 }, { immediate: true })

const totalPages = computed(() =>
  programa.value ? Math.ceil(programa.value.episodios.length / POR_PAGINA) : 0
)

const episodiosPaginados = computed(() => {
  if (!programa.value) return []
  const inicio = (page.value - 1) * POR_PAGINA
  return programa.value.episodios.slice(inicio, inicio + POR_PAGINA)
})

function irParaPagina(p) {
  page.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function voltar() {
  if (window.history.state?.back) router.back()
  else router.push('/programas')
}
</script>
