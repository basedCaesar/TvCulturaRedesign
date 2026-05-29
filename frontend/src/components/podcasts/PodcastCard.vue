<template>
  <a
    :href="podcast.spotify"
    target="_blank"
    rel="noopener noreferrer"
    class="group grid gap-0 bg-white border border-cultborder rounded-lg overflow-hidden hover:shadow-md transition-shadow grid-cols-1 sm:grid-cols-[220px_1fr]"
  >
    <div class="relative overflow-hidden">
      <div
        :class="`w-full h-full min-h-[160px] bg-gradient-to-br ${podcast.gradient} transition-transform duration-500 group-hover:scale-105 flex items-center justify-center`"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3zm0 2a7 7 0 1 1 0 14A7 7 0 0 1 12 5zm-1 4v6l5-3-5-3z"/>
        </svg>
      </div>
    </div>

    <div class="p-7 flex flex-col justify-center">
      <p class="text-[11px] font-bold uppercase tracking-widest text-muted mb-1.5">
        {{ podcast.autor }}
      </p>
      <h3 class="font-display text-xl font-bold text-dark leading-snug mb-2 group-hover:text-teal transition-colors">
        {{ podcast.nome }}
      </h3>
      <p class="text-sm text-muted leading-relaxed mb-4">{{ podcast.descricao }}</p>
      <span class="self-start text-xs font-semibold uppercase tracking-widest text-teal border border-cultborder rounded px-4 py-2 group-hover:border-teal group-hover:bg-teal group-hover:text-white transition-colors">
        Ouvir no Spotify
      </span>
    </div>
  </a>
</template>

<script setup>
defineProps({
  podcast: {
    type: Object,
    required: true,
  },
})
</script>
