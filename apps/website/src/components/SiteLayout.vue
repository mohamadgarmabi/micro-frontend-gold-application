<script setup lang="ts">
import FloatingOrbs from './FloatingOrbs.vue';
import SiteNav from './SiteNav.vue';
</script>

<template>
  <div
    class="relative min-h-screen bg-gradient-to-br from-gold-50 via-surface to-gold-100 text-foreground"
  >
    <FloatingOrbs />
    <SiteNav />
    <main class="relative z-10">
      <slot />
    </main>
    <footer class="relative z-10 border-t border-border px-6 py-8 text-center">
      <p class="text-sm text-foreground-subtle">
        ✦ قلمرو طلایی آوروم — جایی که طلا زنده است ✦
      </p>
    </footer>
  </div>
</template>
