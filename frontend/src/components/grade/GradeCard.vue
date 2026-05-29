<template>
  <component
    :is="item.programaId ? 'RouterLink' : 'div'"
    :to="item.programaId ? `/programas/${item.programaId}` : undefined"
    :class="[
      'group grid gap-0 bg-white border rounded-lg overflow-hidden transition-shadow grid-cols-1 sm:grid-cols-[200px_1fr]',
      item.now
        ? 'border-orange shadow-sm shadow-orange/20'
        : 'border-cultborder hover:shadow-md',
      item.programaId ? 'cursor-pointer' : '',
    ]"
  >
    <div class="relative overflow-hidden">
      <div
        :class="`w-full h-full min-h-[140px] bg-gradient-to-br ${item.gradient} transition-transform duration-500 group-hover:scale-105`"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <span
        :class="[
          'absolute bottom-3 left-3 text-sm font-bold tabular-nums',
          item.now ? 'text-orange' : 'text-white',
        ]"
      >
        {{ item.horarioFmt }}
      </span>
      <span
        v-if="item.now"
        class="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-orange px-2 py-0.5 rounded"
      >
        Ao vivo
      </span>
    </div>

    <div class="p-6 flex flex-col justify-center">
      <p class="text-[11px] font-bold uppercase tracking-widest text-muted mb-1">
        {{ item.categoria }}
      </p>
      <h3
        :class="[
          'font-display text-lg font-bold leading-snug mb-2 transition-colors',
          item.now ? 'text-orange' : 'text-dark group-hover:text-teal',
        ]"
      >
        {{ item.nome }}
      </h3>
      <p v-if="item.descricao" class="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
        {{ item.descricao }}
      </p>
      <span
        v-if="item.programaId"
        class="self-start text-xs font-semibold uppercase tracking-widest text-teal border border-cultborder rounded px-4 py-2 group-hover:border-teal group-hover:bg-teal group-hover:text-white transition-colors"
      >
        Conheça o Programa
      </span>
    </div>
  </component>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
