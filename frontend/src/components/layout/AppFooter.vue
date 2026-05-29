<template>
  <footer class="bg-white border-t-4 border-orange pt-12 pb-8 px-4 sm:px-6 lg:px-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">

      <div>
        <div class="flex items-center gap-3 mb-4">
          <img
            src="@/assets/cultura_logo.jpg"            alt="TV Cultura"
            class="h-10 w-auto"
          />
          <div class="flex flex-col leading-none gap-0.5">
            <span class="font-body text-[10px] font-bold uppercase tracking-widest text-muted">TV</span>
            <span class="font-display text-lg font-bold text-orange leading-none">Cultura</span>
          </div>
        </div>
        <p class="text-sm text-muted leading-relaxed max-w-[260px]">
          Uma emissora pública dedicada à cultura, educação, jornalismo de qualidade e ao serviço da sociedade brasileira desde 1960.
        </p>
      </div>

      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-widest text-dark mb-4">Fundação Padre Anchieta</h4>
        <ul class="flex flex-col gap-3">
          <li v-for="link in fundacaoLinks" :key="link">
            <a href="#" class="text-sm text-muted hover:text-teal transition-colors">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-widest text-dark mb-4">Televisão</h4>
        <ul class="flex flex-col gap-3 mb-6">
          <li v-for="link in tvLinks" :key="link">
            <a href="#" class="text-sm text-muted hover:text-teal transition-colors">{{ link }}</a>
          </li>
        </ul>
        <h4 class="text-[11px] font-bold uppercase tracking-widest text-dark mb-4">Rádio</h4>
        <ul class="flex flex-col gap-3">
          <li v-for="link in radioLinks" :key="link.label">
            <a :href="link.href" target="_blank" rel="noopener noreferrer" class="text-sm text-muted hover:text-teal transition-colors">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-[11px] font-bold uppercase tracking-widest text-dark mb-4">Programas</h4>
        <ul class="flex flex-col gap-3">
          <li v-for="link in programasLinks" :key="link">
            <a href="#" class="text-sm text-muted hover:text-teal transition-colors">{{ link }}</a>
          </li>
        </ul>
      </div>

    </div>

    <div class="border-t border-cultborder pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-xs text-muted">© 2026 Fundação Padre Anchieta — TV Cultura. Todos os direitos reservados.</p>
      <div class="flex gap-2">
        <a v-for="s in socials" :key="s" href="#"
          class="w-8 h-8 rounded-full border border-cultborder flex items-center justify-center text-muted text-xs font-semibold hover:border-teal hover:text-teal transition-colors">
          {{ s }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const fundacaoLinks = ['Central de Relacionamento', 'Conselho Curador', 'Portal da Transparência', 'Canal de Ética', 'Trabalhe Conosco']
const tvLinks = ['TV Cultura', 'TV Rá-Tim-Bum', 'Univesp TV']
const radioLinks = [
  { label: 'Cultura FM', href: 'https://cultura.uol.com.br/radio/' },
  { label: 'Cultura Brasil', href: 'https://cultura.uol.com.br/radio/' },
]
const programasLinks = ['Roda Viva', 'Provoca', 'Café Filosófico', 'Jazz Sinfônica', 'Jornal da Cultura', 'Podcasts']
const socials = ['f', '𝕏', 'in', '▶']
</script>
