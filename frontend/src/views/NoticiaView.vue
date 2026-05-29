<template>
  <div class="max-w-3xl mx-auto px-6 py-12">

    <div v-if="loading" class="animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-24 mb-6" />
      <div class="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div class="h-3 bg-gray-200 rounded w-1/4 mb-8" />
      <div class="aspect-video rounded-xl bg-gray-200 mb-8" />
      <div class="h-4 bg-gray-200 rounded w-full mb-2" />
      <div class="h-4 bg-gray-200 rounded w-5/6 mb-2" />
      <div class="h-4 bg-gray-200 rounded w-4/5" />
    </div>

    <div v-else-if="error" class="py-20 text-center">
      <p class="text-muted text-lg mb-4">{{ error }}</p>
      <RouterLink to="/noticias" class="text-teal font-semibold hover:underline">
        Ver todas as notícias
      </RouterLink>
    </div>

    <div v-else-if="noticia">
      <div class="flex items-center gap-4 mb-6">
        <button @click="voltar" class="text-teal text-sm font-semibold hover:underline">
          ← Voltar
        </button>
        <span class="tag">{{ noticia.categoria }}</span>
      </div>
      <h1 class="font-display text-4xl font-bold text-dark leading-tight mb-4">{{ noticia.titulo }}</h1>
      <p class="text-muted text-sm mb-8">{{ noticia.tempo }}</p>
      <div :class="`w-full aspect-video rounded-xl mb-8 bg-gradient-to-br ${noticia.gradient}`" />
      <p class="text-mid text-lg leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>

  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchNoticiaPorId } from '@/composables/useNoticias.js'
import { useAsync } from '@/composables/useAsync.js'

const route = useRoute()
const router = useRouter()

const { loading, error, data: noticia, execute: load } = useAsync(() => fetchNoticiaPorId(route.params.id))

watch(() => route.params.id, () => load(), { immediate: true })

function voltar() {
  if (window.history.state?.back) router.back()
  else router.push('/')
}
</script>
