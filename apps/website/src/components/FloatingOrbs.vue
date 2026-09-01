<script setup lang="ts">
import gsap from 'gsap';
import { onMounted, onUnmounted, ref } from 'vue';

const containerRef = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
  if (!containerRef.value) return;

  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-orb]').forEach((orb, index) => {
      gsap.to(orb, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-star]').forEach((star) => {
      gsap.to(star, {
        opacity: `random(0.2, 1)`,
        duration: `random(1.5, 3)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, containerRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div
    ref="containerRef"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div
      data-hero="glow"
      class="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/20 opacity-40 blur-3xl"
    />

    <div
      data-orb
      class="absolute top-[15%] left-[10%] h-3 w-3 rounded-full bg-gold-400/60 blur-[1px]"
    />
    <div
      data-orb
      class="absolute top-[30%] right-[15%] h-5 w-5 rounded-full bg-gold-300/40 blur-[1px]"
    />
    <div
      data-orb
      class="absolute bottom-[25%] left-[20%] h-4 w-4 rounded-full bg-gold-500/50 blur-[1px]"
    />
    <div
      data-orb
      class="absolute top-[60%] right-[25%] h-2 w-2 rounded-full bg-gold-200/70 blur-[1px]"
    />
    <div
      data-orb
      class="absolute bottom-[40%] right-[10%] h-6 w-6 rounded-full bg-gold-400/30 blur-[1px]"
    />
    <div
      data-orb
      class="absolute top-[45%] left-[45%] h-2 w-2 rounded-full bg-gold-300/50 blur-[1px]"
    />

    <div
      data-star
      class="absolute top-[8%] left-[30%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[12%] right-[40%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[22%] left-[60%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[35%] right-[8%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[50%] left-[5%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[70%] right-[35%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[80%] left-[50%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
    <div
      data-star
      class="absolute top-[90%] right-[20%] h-0.5 w-0.5 rounded-full bg-neutral-400"
    />
  </div>
</template>
