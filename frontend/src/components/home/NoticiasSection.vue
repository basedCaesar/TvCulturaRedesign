<template>
  <section class="bg-white border-y border-cultborder px-4 sm:px-6 lg:px-10 py-12">
    <div class="flex items-baseline justify-between mb-7 pb-4 border-b-2 border-dark">
      <h2 class="section-title">Últimas Notícias</h2>
      <RouterLink to="/noticias" class="section-link">Ver todas →</RouterLink>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
      <SkeletonCard v-for="i in 4" :key="i" />
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-muted text-sm">Não foi possível carregar as notícias.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
      <article
        v-for="item in noticias"
        :key="item.id"
        class="group cursor-pointer"
        @click="$router.push(`/noticias/${item.id}`)"
        role="button"
        tabindex="0"
        @keydown.enter="$router.push(`/noticias/${item.id}`)"
        :aria-label="item.titulo"
      >
        <div :class="`aspect-[3/2] rounded-md mb-3.5 bg-gradient-to-br ${item.gradient}`" />
        <p class="text-[11px] font-semibold uppercase tracking-widest text-orange mb-1.5">{{ item.categoria }}</p>
        <h3 class="text-[15px] font-medium text-dark leading-snug group-hover:text-teal transition-colors">{{ item.titulo }}</h3>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchNoticiasHome } from '@/composables/useNews.js'
import { useAsync } from '@/composables/useAsync.js'
import SkeletonCard from '@/components/ui/SkeletonCard.vue'

const { loading, error, data: noticias, execute } = useAsync(fetchNoticiasHome)
onMounted(() => execute())
</script>
