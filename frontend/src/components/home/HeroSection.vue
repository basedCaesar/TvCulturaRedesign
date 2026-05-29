<template>
  <section class="grid bg-white border-b border-cultborder grid-cols-1 lg:grid-cols-[1fr_400px]">

    <div class="relative min-h-[460px] overflow-hidden cursor-pointer group" @click="$router.push(`/noticias/${hero.id}`)">
      <div :class="`absolute inset-0 bg-gradient-to-br ${hero.gradient}`" />
      <div class="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/90 to-transparent" />
      <div class="absolute bottom-0 left-0 right-0 p-10">
        <span class="tag mb-4 inline-block">{{ hero.categoria }}</span>
        <h1 class="font-display text-3xl font-bold text-white leading-tight mb-3 group-hover:underline">
          {{ hero.titulo }}
        </h1>
        <p class="text-white/70 text-[15px] leading-relaxed">{{ hero.descricao }}</p>
      </div>
    </div>

    <div class="border-t lg:border-t-0 lg:border-l border-cultborder flex flex-col">
      <div class="px-7 py-6 border-b border-cultborder">
        <p class="text-[11px] font-semibold uppercase tracking-widest text-teal mb-1">Agora na Cultura</p>
        <p class="text-sm text-muted">{{ dataHoje }}</p>
      </div>

      <div class="flex-1">
        <component
          :is="item.programaId ? 'RouterLink' : 'div'"
          :to="item.programaId ? `/programas/${item.programaId}` : undefined"
          v-for="item in agenda"
          :key="item.horario + item.nome"
          :class="[
            'flex gap-4 px-7 py-3.5 border-b border-cultborder transition-colors hover:bg-cream',
            item.now ? 'bg-orange/5' : '',
            item.programaId ? 'cursor-pointer group/row' : '',
          ]"
        >
          <span :class="['text-sm font-semibold min-w-[50px] tabular-nums flex-shrink-0', item.now ? 'text-orange' : 'text-dark']">
            {{ item.horarioFmt }}
          </span>
          <div>
            <span v-if="item.now" class="inline-block text-[10px] font-semibold uppercase tracking-wider text-orange bg-orange/10 px-2 py-0.5 rounded mb-1">
              Ao vivo
            </span>
            <p :class="['text-sm leading-snug', item.programaId ? 'text-mid group-hover/row:text-teal transition-colors' : 'text-mid']">
              {{ item.nome }}
            </p>
          </div>
        </component>
      </div>

      <div class="px-7 py-4 border-t border-cultborder text-center">
        <RouterLink to="/grade" class="text-teal text-xs font-semibold uppercase tracking-widest hover:underline">
          Ver grade completa →
        </RouterLink>
      </div>
    </div>

  </section>
</template>

<script setup>
import { mockDestaques } from '@/composables/useNews.js'
import { getAgendaProxima, getDataFormatada } from '@/composables/useGrade.js'

const hero = mockDestaques.find(n => n.hero)
const agenda = getAgendaProxima(6)
const dataHoje = getDataFormatada()
</script>
