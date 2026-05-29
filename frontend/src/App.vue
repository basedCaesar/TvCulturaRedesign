<template>
  <div class="min-h-screen flex flex-col">
    <a href="#main-content" class="skip-to-main">Ir para o conteúdo principal</a>
    <AppTopbar />
    <AppHeader />
    <main id="main-content" class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppTopbar from '@/components/layout/AppTopbar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
