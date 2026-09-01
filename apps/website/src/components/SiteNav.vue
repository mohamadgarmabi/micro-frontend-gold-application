<script setup lang="ts">
import { appUrl } from '../config/app';
</script>

<template>
  <header class="z-10 relative px-6 py-4 border-border border-b">
    <nav class="flex justify-between items-center mx-auto max-w-5xl">
      <RouterLink to="/" class="group flex items-center gap-2">
        <span class="text-brand text-2xl">✦</span>
        <span
          class="font-bold text-foreground group-hover:text-foreground-muted text-lg tracking-wider"
        >
          AURUM
        </span>
      </RouterLink>

      <div class="flex items-center gap-6">
        <RouterLink
          to="/"
          class="font-medium text-foreground-subtle hover:text-foreground-muted text-sm transition-colors"
          active-class="!text-foreground-muted"
        >
          خانه
        </RouterLink>
        <RouterLink
          to="/realm"
          class="font-medium text-foreground-subtle hover:text-foreground-muted text-sm transition-colors"
          active-class="!text-foreground-muted"
        >
          افسانه
        </RouterLink>
        <a
          :href="appUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-button hover:bg-button-hover px-5 py-2 rounded-full font-semibold text-button-foreground text-sm transition-colors"
        >
          ورود به درگاه
        </a>
      </div>
    </nav>
  </header>
</template>
