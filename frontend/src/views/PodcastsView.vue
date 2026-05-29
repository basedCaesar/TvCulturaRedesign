<template>
  <div class="max-w-6xl mx-auto px-6 py-12">

    <div class="mb-10 pb-4 border-b-2 border-teal">
      <h1 class="font-display text-3xl font-bold text-teal uppercase tracking-tight">Podcasts</h1>
    </div>

    <div v-if="loading" class="flex flex-col gap-6">
      <SkeletonRow v-for="i in 4" :key="i" />
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-muted text-lg mb-4">{{ error }}</p>
      <button @click="execute" class="text-teal text-sm font-semibold hover:underline">
        Tentar novamente
      </button>
    </div>

    <div v-else-if="podcasts?.length" class="flex flex-col gap-6">
      <PodcastCard
        v-for="podcast in podcasts"
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>

    <div v-else class="text-center py-20">
      <p class="text-muted text-lg">Nenhum podcast disponível.</p>
    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { fetchPodcasts } from '@/composables/usePodcasts.js'
import { useAsync } from '@/composables/useAsync.js'
import PodcastCard from '@/components/podcasts/PodcastCard.vue'
import SkeletonRow from '@/components/ui/SkeletonRow.vue'

const { loading, error, data: podcasts, execute } = useAsync(fetchPodcasts)
onMounted(() => execute())
</script>
