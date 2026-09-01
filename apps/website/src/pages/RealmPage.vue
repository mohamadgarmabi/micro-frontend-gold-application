<script setup lang="ts">
import { ref } from 'vue';
import SiteLayout from '../components/SiteLayout.vue';
import { useScrollReveal } from '../composables/useScrollReveal';
import { appUrl } from '../config/app';

const pageRef = ref<HTMLElement | null>(null);

useScrollReveal(pageRef);

const chapters = [
  {
    era: 'عصر اول — تولد ستاره',
    title: 'زمانی که طلا زنده بود',
    content:
      'در ابتدا، تنها تاریکی و سکوت بود. سپس اولین ستاره طلایی در آسمان درخشید و از نور آن، قلمرو عیار متولد شد. هر ذره طلا در این سرزمین نفس می‌کشد و با نبض بازارها می‌تپد.',
    side: 'left',
  },
  {
    era: 'عصر دوم — کیمیاگران',
    title: 'افسانه معامله‌گران',
    content:
      'کیمیاگران بزرگ از سراسر کهکشان به عیار آمدند. آن‌ها یاد گرفتند طلا را نه فقط بخرند و بفروشند، بلکه با آن سخن بگویند. نمودارها برایشان طومار بود و هر کندل، یک فصل از داستان.',
    side: 'right',
  },
  {
    era: 'عصر سوم — دروازه دیجیتال',
    title: 'ورود به دنیای جدید',
    content:
      'اکنون دروازه عیار به روی همه باز است. با یک لمس، وارد دنیایی می‌شوید که در آن طلا فقط فلز نیست — یک تجربه است. نمودارهای زنده، معاملات لحظه‌ای، و امنیت سطح قلعه در انتظار شماست.',
    side: 'left',
  },
];
</script>

<template>
  <SiteLayout>
    <article ref="pageRef" class="mx-auto max-w-4xl px-6 py-16">
      <header data-reveal class="mb-20 text-center">
        <p class="mb-3 text-xs uppercase tracking-[0.3em] text-foreground-muted">
          ✦ طومار عیار ✦
        </p>
        <h1 class="mb-4 text-4xl font-bold text-foreground md:text-5xl">
          افسانه قلمرو طلایی
        </h1>
        <p class="mx-auto max-w-xl text-foreground-subtle">
          داستان سرزمینی که در آن طلا جادوست و هر معامله‌گر، یک کیمیاگر
        </p>
      </header>

      <div class="space-y-24">
        <section
          v-for="chapter in chapters"
          :key="chapter.era"
          :data-reveal="chapter.side"
          class="rounded-2xl border border-gold-500/20 bg-surface-elevated p-8 shadow-sm md:p-10"
        >
          <p class="mb-2 text-xs uppercase tracking-[0.2em] text-foreground-muted">
            {{ chapter.era }}
          </p>
          <h2 class="mb-4 text-2xl font-bold text-foreground">
            {{ chapter.title }}
          </h2>
          <p class="leading-relaxed text-foreground-subtle">
            {{ chapter.content }}
          </p>
        </section>
      </div>

      <div data-reveal class="my-20 h-px bg-border" />

      <section data-reveal class="text-center">
        <div class="mb-6 text-5xl">🏰</div>
        <h2 class="mb-4 text-3xl font-bold text-foreground">
          دروازه منتظر شماست
        </h2>
        <p class="mx-auto mb-8 max-w-md text-foreground-subtle">
          افسانه را خواندید. حالا وقت آن است که خودتان بخشی از داستان شوید.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            :href="appUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-button px-8 py-4 text-base font-bold text-button-foreground transition-colors hover:bg-button-hover"
          >
            ⚡ ورود به درگاه
          </a>
          <RouterLink
            to="/"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-surface-muted"
          >
            ← بازگشت به خانه
          </RouterLink>
        </div>
      </section>
    </article>
  </SiteLayout>
</template>
