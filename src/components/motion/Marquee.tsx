import React, { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !trackRef.current) {
      return;
    }

    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1
    });

    const node = trackRef.current;
    const onEnter = () => tween.timeScale(0.35);
    const onLeave = () => tween.timeScale(1);
    node.addEventListener('mouseenter', onEnter);
    node.addEventListener('mouseleave', onLeave);

    return () => {
      tween.kill();
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[var(--border)] py-4">
      <div ref={trackRef} className="flex min-w-max gap-8 whitespace-nowrap">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`} className="text-sm uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
