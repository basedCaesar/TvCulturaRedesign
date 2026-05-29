<template>
  <section class="bg-white px-4 sm:px-6 lg:px-10 py-12">
    <div class="flex items-baseline justify-between mb-7 pb-4 border-b-2 border-dark">
      <h2 class="section-title">Destaques</h2>
      <RouterLink to="/noticias" class="section-link">Ver todos →</RouterLink>
    </div>

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <SkeletonCard v-for="i in 3" :key="i" />
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-muted text-sm">Não foi possível carregar os destaques.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <article
        v-for="item in destaques"
        :key="item.id"
        class="group cursor-pointer"
        @click="$router.push(`/noticias/${item.id}`)"
        role="button"
        tabindex="0"
        @keydown.enter="$router.push(`/noticias/${item.id}`)"
        :aria-label="item.titulo"
      >
        <div :class="`aspect-video rounded-lg overflow-hidden mb-4 relative bg-gradient-to-br ${item.gradient}`" />
        <p class="card-category">{{ item.categoria }}</p>
        <h3 class="card-title mb-2 group-hover:text-teal transition-colors">{{ item.titulo }}</h3>
        <span class="text-xs text-muted">{{ item.tempo }}</span>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { fetchDestaques } from '@/composables/useNews.js'
import { useAsync } from '@/composables/useAsync.js'
import SkeletonCard from '@/components/ui/SkeletonCard.vue'

const { loading, error, data, execute } = useAsync(fetchDestaques)
onMounted(() => execute())

const destaques = computed(() => data.value?.filter(n => !n.hero) ?? [])
</script>
