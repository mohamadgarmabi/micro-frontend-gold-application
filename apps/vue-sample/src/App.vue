<script setup lang="ts">
import ReactRemote from './components/ReactRemote.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gold-50 via-surface to-gold-100">
    <main class="mx-auto flex min-h-screen max-w-lg flex-col gap-6 p-8">
      <header>
        <p class="text-xs font-semibold uppercase tracking-wide text-gold-700">
          Vue Sample
        </p>
        <h1 class="mt-2 text-3xl font-bold text-foreground">
          Design System + Shared Components
        </h1>
        <p class="mt-2 text-foreground-muted">
          Vue host loading React federated
          <code class="rounded bg-gold-100 px-1.5 py-0.5 text-sm">Button</code>
          and
          <code class="rounded bg-gold-100 px-1.5 py-0.5 text-sm">Input</code>
          from
          <code class="rounded bg-gold-100 px-1.5 py-0.5 text-sm">
            @gold/shared-components
          </code>
          .
        </p>
      </header>

      <section class="flex flex-col gap-4 rounded-2xl border border-gold-500/20 bg-white p-6 shadow-sm">
        <ReactRemote expose="Input" :component-props="{ placeholder: 'you@example.com' }" />

        <div class="flex gap-3">
          <ReactRemote expose="Button" :component-props="{ children: 'Submit' }" />
          <ReactRemote
            expose="Button"
            :component-props="{
              children: 'Cancel',
              className:
                'border border-gold-500/40 bg-white text-gold-700 hover:bg-gold-50',
            }"
          />
        </div>
      </section>
    </main>
  </div>
</template>
