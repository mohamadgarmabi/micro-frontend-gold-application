<script setup lang="ts">
import FloatingOrbs from './FloatingOrbs.vue';
import SiteNav from './SiteNav.vue';
</script>

<template>
  <div class="relative bg-background min-h-screen text-foreground">
    <FloatingOrbs />
    <SiteNav />
    <main class="z-10 relative">
      <slot />
    </main>
    <footer class="z-10 relative px-6 py-8 border-border border-t text-center">
      <p class="text-foreground-subtle text-sm">
        ✦ عیار — معاملات طلا با دقت ✦
      </p>
    </footer>
  </div>
</template>
