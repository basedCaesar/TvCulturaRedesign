<template>
  <nav class="flex items-center justify-center gap-2 flex-wrap" aria-label="Paginação">

    <button
      v-if="current > 1"
      @click="$emit('update:page', current - 1)"
      class="w-9 h-9 rounded-full text-sm font-semibold text-mid hover:bg-cultborder/50 transition-colors flex items-center justify-center"
      aria-label="Página anterior"
    >
      ‹
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('update:page', page)"
      :class="[
        'w-9 h-9 rounded-full text-sm font-semibold transition-colors flex items-center justify-center',
        page === current
          ? 'bg-orange text-white'
          : 'text-mid hover:bg-cultborder/50'
      ]"
    >
      {{ page }}
    </button>

    <button
      v-if="current < totalPages"
      @click="$emit('update:page', current + 1)"
      class="w-9 h-9 rounded-full text-sm font-semibold text-mid hover:bg-cultborder/50 transition-colors flex items-center justify-center"
      aria-label="Próxima página"
    >
      ›
    </button>
  </nav>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})
defineEmits(['update:page'])
</script>