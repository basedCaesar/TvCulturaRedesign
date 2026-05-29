<template>
  <header class="bg-white border-b border-cultborder sticky top-0 z-50">
    <div class="px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between gap-4">

      <RouterLink to="/" class="flex items-center gap-3 flex-shrink-0" aria-label="TV Cultura — página inicial">
        <img
          src="@/assets/cultura_logo.jpg"
          alt="TV Cultura"
          class="h-12 w-auto"
          @error="onLogoError"
        />
        <div class="flex flex-col leading-none gap-0.5">
          <span class="font-body text-[11px] font-bold uppercase tracking-widest text-muted">TV</span>
          <span class="font-display text-xl font-bold text-orange leading-none">Cultura</span>
        </div>
      </RouterLink>

      <nav class="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label="Menu principal">
        <template v-for="item in navItems" :key="item.label">
          <a
            v-if="item.href"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link px-3 py-2"
          >{{ item.label }}</a>
          <RouterLink
            v-else
            :to="item.to"
            class="nav-link px-3 py-2"
            :class="{ active: $route.path === item.to }"
          >{{ item.label }}</RouterLink>
        </template>
      </nav>

      <div class="hidden lg:flex items-center gap-3 flex-shrink-0">
        <a href="https://cultura.uol.com.br/aovivo/" target="_blank" rel="noopener noreferrer">
          <button
            class="flex items-center gap-2 bg-orange text-white text-xs font-semibold px-4 py-2.5 rounded-md uppercase tracking-widest hover:bg-orange-hover transition-colors"
            aria-label="Assistir ao vivo"
          >
            <span class="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true" />
            Ao Vivo
          </button>
        </a>
        <button
          class="w-10 h-10 border border-cultborder rounded-lg flex items-center justify-center text-muted hover:border-teal hover:text-teal transition-colors text-lg"
          aria-label="Buscar"
        >
          ⌕
        </button>
      </div>

      <div class="flex lg:hidden items-center gap-2 flex-shrink-0">
        <a href="https://cultura.uol.com.br/aovivo/" target="_blank" rel="noopener noreferrer">
          <button
            class="flex items-center gap-1.5 bg-orange text-white text-[11px] font-semibold px-3 py-2 rounded-md uppercase tracking-widest hover:bg-orange-hover transition-colors"
            aria-label="Assistir ao vivo"
          >
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse" aria-hidden="true" />
            Ao Vivo
          </button>
        </a>
        <button
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          class="w-10 h-10 border border-cultborder rounded-lg flex items-center justify-center text-mid hover:border-teal hover:text-teal transition-colors"
        >
          <svg v-if="!menuOpen" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>

    <div
      v-show="menuOpen"
      id="mobile-menu"
      class="lg:hidden bg-white border-t border-cultborder"
    >
      <nav class="px-4 py-2 flex flex-col" aria-label="Menu principal">
        <template v-for="item in navItems" :key="item.label">
          <a
            v-if="item.href"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="py-3 text-sm font-semibold text-mid uppercase tracking-wide border-b border-cultborder last:border-0 hover:text-orange transition-colors"
          >{{ item.label }}</a>
          <RouterLink
            v-else
            :to="item.to"
            class="py-3 text-sm font-semibold uppercase tracking-wide border-b border-cultborder last:border-0 transition-colors"
            :class="$route.path === item.to ? 'text-teal' : 'text-mid hover:text-orange'"
          >{{ item.label }}</RouterLink>
        </template>
      </nav>
    </div>

  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()
const menuOpen = ref(false)

watch(() => $route.path, () => {
  menuOpen.value = false
})

const navItems = [
  { label: 'Notícias', to: '/noticias' },
  { label: 'Esporte', to: '/categoria/esporte' },
  { label: 'Entretenimento', to: '/categoria/entretenimento' },
  { label: 'Jazz Sinfônica', to: '/jazz-sinfonica' },
  { label: 'Programas', to: '/programas' },
  { label: 'Grade', to: '/grade' },
  { label: 'Rádio', href: 'https://cultura.uol.com.br/radio/' },
  { label: 'Podcasts', to: '/podcasts' },
]

function onLogoError(e) {
  e.target.style.display = 'none'
}
</script>
