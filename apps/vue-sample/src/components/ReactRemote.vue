<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { createRoot, type Root } from 'react-dom/client';
import { createElement } from 'react';
import { loadReactRemote } from '../mf';

const props = defineProps<{
  expose: 'Button' | 'Input' | 'Checkbox';
  componentProps?: Record<string, unknown>;
}>();

const host = ref<HTMLElement | null>(null);
const error = ref<string | null>(null);
let root: Root | null = null;

onMounted(async () => {
  if (!host.value) return;

  try {
    const Component = await loadReactRemote(props.expose);
    root = createRoot(host.value);
    root.render(createElement(Component, props.componentProps ?? {}));
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'Failed to load remote component';
  }
});

onUnmounted(() => {
  root?.unmount();
  root = null;
});
</script>

<template>
  <div
    v-if="error"
    role="alert"
    class="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
  >
    Remote "{{ expose }}" unavailable: {{ error }}
  </div>
  <div v-else ref="host" />
</template>
