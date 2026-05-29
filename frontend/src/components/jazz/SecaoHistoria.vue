<template>
  <section id="historia" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 bg-cream">
    <div class="max-w-4xl mx-auto">

      <h2 class="font-display text-4xl font-bold text-dark mb-2">História</h2>
      <div class="h-1 w-16 bg-orange mb-12" />

      <p class="text-lg leading-relaxed text-mid mb-8 first-letter:text-7xl first-letter:font-display first-letter:font-bold first-letter:text-orange first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
        {{ sobre.intro }}
      </p>

      <p v-for="(p, i) in sobre.paragrafos" :key="i" class="text-base leading-relaxed text-mid mb-6">
        {{ p }}
      </p>

      <blockquote class="my-16 py-10 border-y-2 border-orange text-center">
        <p class="font-display text-2xl md:text-3xl italic text-dark leading-relaxed">
          <span class="text-orange text-5xl leading-none align-middle mr-2">"</span>{{ sobre.citacao }}<span class="text-orange text-5xl leading-none align-middle ml-2">"</span>
        </p>
      </blockquote>
    </div>

    <div class="max-w-5xl mx-auto mt-20">
      <h3 class="font-display text-2xl font-bold text-dark text-center mb-2">Trajetória</h3>
      <p class="text-sm text-muted text-center mb-12 uppercase tracking-widest">Mais de três décadas de história</p>

      <div class="relative">
        <!-- Linha conectora -->
        <div class="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-cultborder" />

        <div class="grid md:grid-cols-4 gap-8">
          <div
            v-for="(m, i) in timeline"
            :key="i"
            class="relative text-center"
          >
            <div class="relative z-10 w-12 h-12 mx-auto mb-4 rounded-full bg-orange text-white flex items-center justify-center font-bold text-sm shadow-md">
              {{ i + 1 }}
            </div>
            <p class="font-display text-xl font-bold text-teal mb-1">{{ m.ano }}</p>
            <p class="font-semibold text-sm text-dark mb-2">{{ m.titulo }}</p>
            <p class="text-sm text-muted leading-snug">{{ m.descricao }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto mt-24">
      <h3 class="font-display text-2xl font-bold text-dark text-center mb-2">Primeira formação</h3>
      <p class="text-sm text-muted text-center mb-12 uppercase tracking-widest">Os chefes de naipe fundadores</p>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="m in primeiraFormacao"
          :key="m.naipe"
          class="bg-white border border-cultborder rounded-lg p-4 hover:border-orange transition-colors"
        >
          <p class="text-[10px] font-bold uppercase tracking-widest text-orange mb-2">{{ m.naipe }}</p>
          <p class="font-display text-base text-dark leading-snug">{{ m.nome }}</p>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto mt-24">
      <h3 class="font-display text-2xl font-bold text-dark text-center mb-2">Artistas que passaram pela orquestra</h3>
      <p class="text-sm text-muted text-center mb-12 uppercase tracking-widest">Em 35 anos de história</p>

      <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        <span
          v-for="(artista, i) in artistasConvidados"
          :key="artista"
          :class="[
            'font-display text-dark cursor-default transition-colors hover:text-orange',
            tamanhoArtista(i)
          ]"
        >
          {{ artista }}
        </span>
      </div>
    </div>

    <div class="max-w-3xl mx-auto mt-24">
      <h3 class="font-display text-2xl font-bold text-dark text-center mb-2">Hoje na grade</h3>
      <p class="text-sm text-muted text-center mb-10 uppercase tracking-widest">Onde acompanhar a orquestra</p>

      <div class="bg-dark text-white rounded-xl p-8 grid gap-4">
        <div
          v-for="(p, i) in programacaoAtual"
          :key="i"
          class="flex items-center justify-between border-b border-white/10 last:border-0 pb-4 last:pb-0"
        >
          <div>
            <p class="text-orange text-xs font-semibold uppercase tracking-widest mb-1">{{ p.canal }}</p>
            <p class="text-base">{{ p.dia }}</p>
          </div>
          <p class="font-display text-2xl font-bold">{{ p.horario }}</p>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import {
  sobre,
  timeline,
  primeiraFormacao,
  artistasConvidados,
  programacaoAtual,
} from '@/composables/useJazzSinfonica.js'

function tamanhoArtista(i) {
  const tamanhos = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-lg', 'text-base', 'text-2xl', 'text-xl']
  return tamanhos[i % tamanhos.length]
}
</script>
