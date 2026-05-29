<template>
  <section class="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${orquestraImg})` }"
    />

    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

    <div class="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 lg:px-10 pb-10 sm:pb-16 max-w-5xl">
      <span class="text-orange text-xs font-semibold uppercase tracking-[0.3em] mb-4">
        TV Cultura apresenta
      </span>
      <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
        Orquestra Brasil<br />Jazz Sinfônica
      </h1>
      <p class="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
        Há mais de 35 anos preservando e renovando a música sinfônica popular brasileira.
      </p>
    </div>
  </section>
</template>

<script setup>
import orquestraImg from '@/assets/images/orquestra-jazz-sinfonica.jpg'
</script>
