<template>

  <div v-if="loading" class="max-w-4xl mx-auto px-6 py-12 animate-pulse">
    <div class="flex items-center gap-4 mb-8">
      <div class="h-4 bg-gray-200 rounded w-16" />
      <div class="h-5 bg-gray-200 rounded w-24" />
    </div>
    <div class="h-8 bg-gray-200 rounded w-3/4 mb-6" />
    <div class="aspect-video rounded-xl bg-gray-200 mb-8" />
    <div class="h-4 bg-gray-200 rounded w-full mb-2" />
    <div class="h-4 bg-gray-200 rounded w-5/6" />
  </div>

  <div v-else-if="error" class="max-w-3xl mx-auto px-6 py-20 text-center">
    <p class="text-muted text-lg mb-4">{{ error }}</p>
    <RouterLink to="/programas" class="text-teal font-semibold hover:underline">
      Ver todos os programas
    </RouterLink>
  </div>

  <div v-else-if="dados" class="max-w-4xl mx-auto px-6 py-12">

    <div class="flex items-center gap-4 mb-8">
      <button @click="voltar" class="text-teal text-sm font-semibold hover:underline">
        ← Voltar
      </button>
      <span class="text-[10px] font-bold uppercase tracking-widest text-orange bg-orange/10 px-3 py-1 rounded">
        {{ dados.programa.nome }}
      </span>
    </div>

    <h1 class="font-display text-3xl font-bold text-dark mb-6">{{ dados.episodio.titulo }}</h1>

    <div class="aspect-video rounded-xl overflow-hidden mb-8 bg-dark">
      <iframe
        v-if="dados.episodio.youtubeId"
        class="w-full h-full"
        :src="`https://www.youtube.com/embed/${dados.episodio.youtubeId}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <div
        v-else
        :class="`w-full h-full bg-gradient-to-br ${dados.episodio.gradient} flex flex-col items-center justify-center text-center px-6`"
      >
        <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <span class="text-white text-2xl ml-1">▶</span>
        </div>
        <p class="text-white/80 font-semibold">Vídeo em breve</p>
        <p class="text-white/50 text-sm mt-1">{{ dados.episodio.data }}</p>
      </div>
    </div>

    <div class="prose max-w-none">
      <p class="text-mid text-base leading-relaxed whitespace-pre-line">{{ dados.episodio.descricao }}</p>
    </div>

  </div>

</template>

<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchEpisodio } from '@/composables/useProgramas.js'
import { useAsync } from '@/composables/useAsync.js'

const route = useRoute()
const router = useRouter()

const { loading, error, data: dados, execute: load } = useAsync(
  () => fetchEpisodio(route.params.id, route.params.epId)
)

watch([() => route.params.id, () => route.params.epId], () => load(), { immediate: true })

function voltar() {
  if (window.history.state?.back) router.back()
  else router.push(`/programas/${route.params.id}`)
}
</script>
