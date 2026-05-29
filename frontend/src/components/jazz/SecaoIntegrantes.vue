<template>
  <section id="integrantes" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-10 bg-white">
    <div class="max-w-4xl mx-auto">

      <h2 class="font-display text-4xl font-bold text-dark mb-2">Integrantes</h2>
      <div class="h-1 w-16 bg-orange mb-12" />

      <div class="mb-20">
        <h3 class="font-display text-xl font-bold text-teal mb-2">Ficha técnica</h3>
        <p class="text-xs text-muted uppercase tracking-widest mb-8">Brasil Jazz Sinfônica · 2026</p>

        <div class="grid md:grid-cols-2 gap-x-8 gap-y-5">
          <div
            v-for="item in fichaTecnica"
            :key="item.nome"
            class="border-b border-cultborder pb-3"
          >
            <p class="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">{{ item.cargo }}</p>
            <p class="font-display text-lg text-dark">{{ item.nome }}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-display text-xl font-bold text-teal mb-2">Músicos</h3>
        <p class="text-xs text-muted uppercase tracking-widest mb-10">Organizados por naipe</p>

        <div class="space-y-12">
          <div
            v-for="naipe in musicos"
            :key="naipe.naipe"
          >

            <h4 class="font-display text-2xl font-bold text-dark mb-2">{{ naipe.naipe }}</h4>
            <div class="h-px bg-cultborder mb-6" />

            <div class="grid md:grid-cols-2 gap-x-8 gap-y-6">
              <div
                v-for="grupo in naipe.grupos"
                :key="grupo.instrumento"
              >
                <p class="text-[10px] font-bold uppercase tracking-widest text-orange mb-3">{{ grupo.instrumento }}</p>
                <ul class="space-y-1.5">
                  <li
                    v-for="integrante in grupo.integrantes"
                    :key="integrante"
                    class="text-base text-mid"
                    :class="{ 'font-semibold text-dark': integrante.includes('spalla') }"
                  >
                    {{ integrante }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { fichaTecnica, musicos } from '@/composables/useJazzSinfonica.js'
</script>
