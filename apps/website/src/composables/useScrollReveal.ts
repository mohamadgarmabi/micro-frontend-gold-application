import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted, type Ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (rootRef: Ref<HTMLElement | null>) => {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    if (!rootRef.value) return;

    ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="left"]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          x: -60,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal="right"]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          x: 60,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, rootRef.value);
  });

  onUnmounted(() => {
    ctx?.revert();
  });
};

export { useScrollReveal };
