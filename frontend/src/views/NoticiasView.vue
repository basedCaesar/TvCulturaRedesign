<template>
  <div class="max-w-6xl mx-auto px-6 py-12">

    <div class="flex items-baseline justify-between mb-2 pb-4 border-b-2 border-teal">
      <h1 class="font-display text-3xl font-bold text-teal uppercase tracking-tight">Notícias</h1>
      <span class="text-sm text-muted">{{ filtradas.length }} resultados</span>
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 mb-8">
      <!-- Chips de categoria -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categorias"
          :key="cat"
          @click="selecionarCategoria(cat)"
          :class="[
            'text-xs font-semibold uppercase tracking-wide px-4 py-2 rounded-full border transition-colors',
            categoriaAtiva === cat
              ? 'bg-teal text-white border-teal'
              : 'text-mid border-cultborder hover:border-teal hover:text-teal'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <div class="relative flex-shrink-0 md:w-64">
        <label for="busca-noticias" class="sr-only">Buscar notícias</label>
        <input
          id="busca-noticias"
          v-model="busca"
          @input="page = 1"
          type="search"
          placeholder="Buscar notícias..."
          class="w-full text-sm border border-cultborder rounded-lg pl-10 pr-4 py-2.5 focus:border-teal focus:outline-none transition-colors"
        />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg" aria-hidden="true">⌕</span>
      </div>
    </div>

    <div v-if="loading" class="flex flex-col gap-5">
      <SkeletonRow v-for="i in 5" :key="i" />
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-muted text-lg mb-4">{{ error }}</p>
      <button @click="execute" class="text-teal text-sm font-semibold hover:underline">
        Tentar novamente
      </button>
    </div>

    <div v-else-if="paginadas.length" class="flex flex-col gap-5">
      <NoticiaCard
        v-for="noticia in paginadas"
        :key="noticia.id"
        :noticia="noticia"
      />
    </div>

    <div v-else class="text-center py-20">
      <p class="text-muted text-lg">Nenhuma notícia encontrada.</p>
      <button @click="limparFiltros" class="mt-4 text-teal text-sm font-semibold hover:underline">
        Limpar filtros
      </button>
    </div>

    <div v-if="!loading && !error && totalPages > 1" class="mt-12">
      <PaginationNav
        :current="page"
        :total-pages="totalPages"
        @update:page="irParaPagina"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { categorias, fetchNoticias } from '@/composables/useNoticias.js'
import { useAsync } from '@/composables/useAsync.js'
import NoticiaCard from '@/components/noticias/NoticiaCard.vue'
import PaginationNav from '@/components/ui/PaginationNav.vue'
import SkeletonRow from '@/components/ui/SkeletonRow.vue'

const POR_PAGINA = 11

const categoriaAtiva = ref('Todas')
const busca = ref('')
const page = ref(1)

const { loading, error, data: noticias, execute } = useAsync(fetchNoticias)
onMounted(() => execute())

const filtradas = computed(() => {
  if (!noticias.value) return []
  return noticias.value.filter(n => {
    const matchCategoria = categoriaAtiva.value === 'Todas' || n.categoria === categoriaAtiva.value
    const termo = busca.value.trim().toLowerCase()
    const matchBusca = !termo
      || n.titulo.toLowerCase().includes(termo)
      || n.descricao.toLowerCase().includes(termo)
    return matchCategoria && matchBusca
  })
})

const totalPages = computed(() => Math.ceil(filtradas.value.length / POR_PAGINA))

const paginadas = computed(() => {
  const inicio = (page.value - 1) * POR_PAGINA
  return filtradas.value.slice(inicio, inicio + POR_PAGINA)
})

function selecionarCategoria(cat) {
  categoriaAtiva.value = cat
  page.value = 1
}

function irParaPagina(p) {
  page.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function limparFiltros() {
  categoriaAtiva.value = 'Todas'
  busca.value = ''
  page.value = 1
}
</script>
