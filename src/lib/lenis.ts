import Lenis from 'lenis';
import { ScrollTrigger } from './gsap.ts';

let lenisInstance: Lenis | null = null;
let rafId = 0;

export function getLenis() {
  if (!lenisInstance) {
    lenisInstance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      infinite: false,
      lerp: 0.08
    });

    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    const raf = (time: number) => {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
  }

  return lenisInstance;
}

export function destroyLenis() {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  lenisInstance?.destroy();
  lenisInstance = null;
}
