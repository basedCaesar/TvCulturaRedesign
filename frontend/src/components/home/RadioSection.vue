<template>
  <section class="bg-dark px-4 sm:px-6 lg:px-10 py-12">
    <div class="flex items-baseline justify-between mb-7 pb-4 border-b border-white/15">
      <h2 class="font-display text-2xl font-bold text-white">Últimas da Rádio</h2>
      <a href="https://cultura.uol.com.br/radio/" target="_blank" rel="noopener noreferrer" class="text-white/50 text-xs font-semibold uppercase tracking-widest hover:text-white transition-colors">Ver todas →</a>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        v-for="item in radio"
        :key="item.id"
        href="https://cultura.uol.com.br/radio/"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-white/[0.06] border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:bg-white/10 transition-colors group"
      >
        <div :class="`aspect-square flex items-center justify-center text-4xl text-white/30 bg-gradient-to-br ${item.gradient}`">
          {{ item.icon }}
        </div>
        <div class="p-4">
          <p class="text-white text-sm font-medium leading-snug mb-1 group-hover:text-orange transition-colors">{{ item.titulo }}</p>
          <p class="text-white/40 text-xs">{{ item.subtitulo }}</p>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import { mockRadio } from '@/composables/useNews.js'
const radio = mockRadio
</script>
