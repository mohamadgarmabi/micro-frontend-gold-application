import gsap from 'gsap';
import { onMounted, onUnmounted, type Ref } from 'vue';

const useHeroAnimation = (rootRef: Ref<HTMLElement | null>) => {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    if (!rootRef.value) return;

    ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('[data-hero="eyebrow"]', { opacity: 0, y: 20, duration: 0.6 })
        .from(
          '[data-hero="title"]',
          { opacity: 0, y: 40, duration: 0.9 },
          '-=0.3',
        )
        .from(
          '[data-hero="subtitle"]',
          { opacity: 0, y: 30, duration: 0.7 },
          '-=0.5',
        )
        .from(
          '[data-hero="cta"]',
          { opacity: 0, scale: 0.85, duration: 0.6 },
          '-=0.3',
        )
        .from(
          '[data-hero="feature"]',
          { opacity: 0, y: 30, stagger: 0.15, duration: 0.6 },
          '-=0.2',
        );

      gsap.to('[data-hero="glow"]', {
        opacity: 0.6,
        scale: 1.15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, rootRef.value);
  });

  onUnmounted(() => {
    ctx?.revert();
  });
};

export { useHeroAnimation };
