<template>
  <article
    class="group cursor-pointer"
    @click="$router.push(`/programas/${programaId}/${episodio.id}`)"
  >
    <div class="aspect-video rounded-md overflow-hidden mb-3 relative">
      <div :class="`w-full h-full bg-gradient-to-br ${episodio.gradient} flex items-center justify-center`">
        <span class="font-display text-white/30 text-xs font-bold tracking-widest text-center px-3">
          {{ episodio.data }}
        </span>
      </div>
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
        <div class="opacity-0 group-hover:opacity-100 w-12 h-12 rounded-full bg-white/95 flex items-center justify-center transition-opacity">
          <span class="text-orange text-lg ml-0.5">▶</span>
        </div>
      </div>
    </div>
    <h4 class="text-sm font-semibold text-dark leading-snug group-hover:text-teal transition-colors">
      {{ episodio.titulo }}
    </h4>
  </article>
</template>

<script setup>
defineProps({
  episodio: { type: Object, required: true },
  programaId: { type: [Number, String], required: true },
})
</script>
