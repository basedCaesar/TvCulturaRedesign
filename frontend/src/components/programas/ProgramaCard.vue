<template>
  <article
    class="group cursor-pointer"
    @click="$router.push(`/programas/${programa.id}`)"
  >
    <div class="aspect-video rounded-lg overflow-hidden mb-4">
      <div
        :class="`w-full h-full bg-gradient-to-br ${programa.gradient} flex items-center justify-center`"
      >
        <span class="font-display text-white/40 text-lg font-bold tracking-widest text-center px-4">
          {{ programa.nome.toUpperCase() }}
        </span>
      </div>
    </div>

    <h3 class="font-display text-base font-bold text-teal uppercase tracking-wide mb-2 group-hover:text-orange transition-colors">
      {{ programa.nome }}
    </h3>
    <p class="text-sm text-muted leading-relaxed">{{ programa.descricao }}</p>
    <div class="mt-4 h-px bg-cultborder" />
  </article>
</template>

<script setup>
defineProps({
  programa: {
    type: Object,
    required: true,
  },
})
</script>
