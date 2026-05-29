<template>
  <div class="hidden sm:flex bg-dark py-2 px-4 sm:px-6 lg:px-10 items-center justify-between">
    <span class="text-white font-bold text-sm font-body">
      <span class="text-orange">30</span>uol
    </span>
    <nav class="flex gap-6">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.href"
        class="text-muted text-[11px] uppercase tracking-wider font-medium hover:text-white transition-colors duration-200"
      >
        {{ link.label }}
      </a>
    </nav>
  </div>
</template>

<script setup>
const links = [
  { label: 'Ingresso.com', href: '#' },
  { label: 'UOL Host', href: '#' },
  { label: 'PagBank', href: '#' },
  { label: 'UOL Play', href: '#' },
]
</script>
