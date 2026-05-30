<template>
  <section class="grid bg-white border-b border-cultborder grid-cols-1 lg:grid-cols-[1fr_400px]">

    <div
      class="relative min-h-[460px] overflow-hidden cursor-pointer group"
      @click="hero && $router.push(`/noticias/${hero.slug}`)"
    >
      <img
        v-if="hero?.imagem"
        :src="hero.imagem"
        :alt="hero.titulo"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        v-else
        :class="`absolute inset-0 bg-gradient-to-br ${hero?.gradient ?? 'from-slate-800 to-slate-600'}`"
      />
      <div class="absolute inset-0 bg-black/40" />
      <div class="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-black/90 to-transparent" />
      <div v-if="hero" class="absolute bottom-0 left-0 right-0 p-10">
        <span class="tag mb-4 inline-block">{{ hero.categoria }}</span>
        <h1 class="font-display text-3xl font-bold text-white leading-tight mb-3 group-hover:underline">
          {{ hero.titulo }}
        </h1>
        <p class="text-white/70 text-[15px] leading-relaxed">{{ hero.descricao }}</p>
      </div>
      <div v-else class="absolute bottom-0 left-0 right-0 p-10 animate-pulse">
        <div class="h-4 bg-white/20 rounded w-24 mb-4" />
        <div class="h-8 bg-white/20 rounded w-3/4 mb-3" />
        <div class="h-4 bg-white/20 rounded w-2/3" />
      </div>
    </div>

    <div class="border-t lg:border-t-0 lg:border-l border-cultborder flex flex-col">
      <div class="px-7 py-6 border-b border-cultborder">
        <p class="text-[11px] font-semibold uppercase tracking-widest text-teal mb-1">Agora na Cultura</p>
        <p class="text-sm text-muted">{{ dataHoje }}</p>
      </div>

      <div class="flex-1 overflow-y-auto max-h-[380px]" ref="scrollEl">
        <div v-if="loadingAgenda" class="animate-pulse px-7 py-4 flex flex-col gap-4">
          <div v-for="i in 5" :key="i" class="h-8 bg-gray-100 rounded" />
        </div>

        <component
          v-else
          :is="item.programaId ? 'RouterLink' : 'div'"
          :to="item.programaId ? `/programas/${item.programaId}` : undefined"
          v-for="item in agenda"
          :key="item.horario + item.nome"
          :ref="el => { if (item.now) nowEl = el }"
          :class="[
            'flex gap-4 px-7 py-3.5 border-b border-cultborder transition-colors',
            item.now ? 'bg-orange/5' : 'hover:bg-cream',
            item.programaId ? 'cursor-pointer group/row' : '',
          ]"
        >
          <span :class="['text-sm font-semibold min-w-[50px] tabular-nums flex-shrink-0', item.now ? 'text-orange' : 'text-dark']">
            {{ item.horarioFmt }}
          </span>
          <div class="flex-1 flex items-start justify-between gap-2">
            <p :class="['text-sm leading-snug', item.now ? 'text-dark font-semibold' : item.programaId ? 'text-mid group-hover/row:text-teal transition-colors' : 'text-mid']">
              {{ item.nome }}
            </p>
            <span v-if="item.now" class="flex-shrink-0 text-[9px] font-bold uppercase tracking-widest bg-orange text-white px-2 py-0.5 rounded">
              Ao vivo
            </span>
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
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { fetchHeroNoticia } from '@/composables/useNews.js'
import { fetchAgendaProxima, getDataFormatada } from '@/composables/useGrade.js'
import { useAsync } from '@/composables/useAsync.js'

const dataHoje = getDataFormatada()

const scrollEl = ref(null)
const nowEl = ref(null)

const { data: heroData, execute: loadHero } = useAsync(fetchHeroNoticia)
const { loading: loadingAgenda, data: agendaData, execute: loadAgenda } = useAsync(fetchAgendaProxima)

onMounted(() => {
  loadHero()
  loadAgenda()
})

const hero = computed(() => heroData.value ?? null)
const agenda = computed(() => agendaData.value ?? [])

watch(agenda, async () => {
  await nextTick()
  const el = nowEl.value?.$el ?? nowEl.value
  if (el && scrollEl.value) {
    scrollEl.value.scrollTop = el.offsetTop - scrollEl.value.offsetTop - 60
  }
})
</script>
