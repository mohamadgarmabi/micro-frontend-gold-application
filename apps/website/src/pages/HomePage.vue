<script setup lang="ts">
import { ref } from 'vue';
import SiteLayout from '../components/SiteLayout.vue';
import { useHeroAnimation } from '../composables/useHeroAnimation';
import { appUrl } from '../config/app';

const heroRef = ref<HTMLElement | null>(null);

useHeroAnimation(heroRef);

const features = [
  {
    icon: '⚗️',
    title: 'کیمیاگری دیجیتال',
    description: 'طلای خود را با قدرت جادوی بازارها تبدیل کنید',
  },
  {
    icon: '📜',
    title: 'طومار قیمت‌ها',
    description: 'نمودارهای زنده که داستان طلا را روایت می‌کنند',
  },
  {
    icon: '🛡️',
    title: 'سپر محافظ',
    description: 'امنیت سطح قلعه برای دارایی‌های شما',
  },
];
</script>

<template>
  <SiteLayout>
    <section ref="heroRef" class="mx-auto max-w-5xl px-6 py-20 text-center">
      <p
        data-hero="eyebrow"
        class="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted"
      >
        ✦ به قلمرو خوش آمدید ✦
      </p>

      <h1
        data-hero="title"
        class="mb-6 text-5xl font-bold leading-tight text-foreground md:text-7xl"
      >
        قلمرو طلایی
        <span class="block text-brand">آوروم</span>
      </h1>

      <p
        data-hero="subtitle"
        class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-foreground-subtle"
      >
        در اعماق کهکشان، جایی که ستاره‌ها از طلا ساخته شده‌اند،
        دروازه‌ای پنهان به سوی دنیایی از ثروت و جادو وجود دارد.
        آیا آماده‌اید وارد شوید؟
      </p>

      <div
        data-hero="cta"
        class="mb-20 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          :href="appUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-button px-8 py-4 text-base font-bold text-button-foreground transition-colors hover:bg-button-hover"
        >
          <span>⚡</span>
          ورود به درگاه طلا
        </a>
        <RouterLink
          to="/realm"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-surface-muted"
        >
          <span>📖</span>
          خواندن افسانه
        </RouterLink>
      </div>

      <div class="mx-auto mb-16 h-px max-w-md bg-border" />

      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          data-hero="feature"
          class="rounded-2xl border border-gold-500/20 bg-surface-elevated p-6 text-right shadow-sm"
        >
          <span class="mb-3 block text-3xl">{{ feature.icon }}</span>
          <h3 class="mb-2 text-lg font-semibold text-foreground">
            {{ feature.title }}
          </h3>
          <p class="text-sm leading-relaxed text-foreground-subtle">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-6 py-16 text-center">
      <div
        class="rounded-3xl border border-gold-500/20 bg-surface-elevated p-10 shadow-sm md:p-16"
      >
        <p class="mb-2 text-xs uppercase tracking-[0.2em] text-foreground-muted">
          دعوتنامه
        </p>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          دروازه باز است
        </h2>
        <p class="mx-auto mb-8 max-w-lg text-foreground-subtle">
          هزاران کیمیاگر قبل از شما وارد شده‌اند.
          نوبت شماست که طلای خود را کشف کنید.
        </p>
        <a
          :href="appUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-button px-10 py-4 text-base font-bold text-button-foreground transition-colors hover:bg-button-hover"
        >
          شروع سفر ✦
        </a>
      </div>
    </section>
  </SiteLayout>
</template>
