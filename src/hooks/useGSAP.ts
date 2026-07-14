import { useEffect } from 'react';
import { gsap } from '../lib/gsap.ts';

export function useGSAP(effect: () => void | (() => void), deps: Array<unknown>, scope?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = effect();
    }, scope?.current || undefined);

    return () => {
      if (cleanup) {
        cleanup();
      }
      ctx.revert();
    };
  }, deps);
}
