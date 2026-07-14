import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap.ts';
import { isTouchDevice } from '../../lib/utils.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

export function CursorFollower() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState('VIEW');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isTouchDevice() || reducedMotion || !ref.current) {
      return;
    }

    const node = ref.current;
    const move = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const cursorText = target?.closest('[data-cursor]')?.getAttribute('data-cursor') || 'VIEW';
      setLabel(cursorText);
      gsap.to(node, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.25,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [reducedMotion]);

  if (isTouchDevice() || reducedMotion) {
    return null;
  }

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[120] -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--accent)] bg-[color:color-mix(in_oklab,var(--brand-900)_78%,transparent)] text-[10px] uppercase tracking-[0.22em] text-[var(--brand-50)]">
        {label}
      </div>
    </div>
  );
}
