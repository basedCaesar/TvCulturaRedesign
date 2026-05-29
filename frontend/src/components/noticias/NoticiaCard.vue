<template>
  <article
    class="group grid gap-0 bg-white border border-cultborder rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow grid-cols-1 sm:grid-cols-[340px_1fr]"
    @click="$router.push(`/noticias/${noticia.id}`)"
    role="button"
    tabindex="0"
    @keydown.enter="$router.push(`/noticias/${noticia.id}`)"
    :aria-label="noticia.titulo"
  >

    <div class="relative overflow-hidden">
      <div
        :class="`w-full h-full min-h-[200px] bg-gradient-to-br ${noticia.gradient} transition-transform duration-500 group-hover:scale-105`"
      />
    </div>

    <div class="p-7 flex flex-col justify-center">
      <p class="text-[11px] font-bold uppercase tracking-widest text-muted mb-1.5">
        {{ noticia.categoria }}
      </p>
      <p class="text-xs font-semibold text-dark mb-2">{{ noticia.data }}</p>
      <h3 class="font-display text-xl font-bold text-dark leading-snug mb-2 group-hover:text-teal transition-colors">
        {{ noticia.titulo }}
      </h3>
      <p class="text-sm text-muted leading-relaxed mb-4">{{ noticia.descricao }}</p>
      <span class="self-start text-xs font-semibold uppercase tracking-widest text-teal border border-cultborder rounded px-4 py-2 group-hover:border-teal group-hover:bg-teal group-hover:text-white transition-colors">
        Leia mais
      </span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  noticia: {
    type: Object,
    required: true,
  },
})
</script>