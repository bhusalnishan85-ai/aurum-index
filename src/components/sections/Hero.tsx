import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from '../../lib/gsap.ts';
import { useGSAP } from '../../hooks/useGSAP.ts';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';
import { MagneticButton } from '../motion/MagneticButton.tsx';
import { SplitText } from '../motion/SplitText.tsx';

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !ref.current) {
      return;
    }

    const words = ref.current.querySelectorAll('.split-inner');
    const image = ref.current.querySelector('.hero-image');
    const navFade = ref.current.querySelectorAll('.hero-fade');
    const curtain = ref.current.querySelector('.hero-curtain');

    const tl = gsap.timeline();
    tl.fromTo(curtain, { scaleY: 1, transformOrigin: 'top center' }, { scaleY: 0, duration: 1.2, ease: 'expo.inOut' })
      .fromTo(words, { yPercent: 110, opacity: 0, filter: 'blur(12px)' }, { yPercent: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 1.1, ease: 'expo.out' }, '-=0.75')
      .fromTo(image, { clipPath: 'inset(0 48% 0 48%)', scale: 1.18 }, { clipPath: 'inset(0 0% 0 0%)', scale: 1, duration: 1.4, ease: 'expo.out' }, '-=1')
      .fromTo(navFade, { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, '-=0.55');

    gsap.to('.hero-parallax', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        scrub: true,
        start: 'top top',
        end: 'bottom top'
      }
    });
  }, [reducedMotion], ref);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[var(--brand-900)] pt-28 text-[var(--brand-50)]">
      <div className="hero-curtain absolute inset-0 z-30 bg-[var(--brand-900)]" />
      <div className="container-shell relative z-10 grid min-h-[calc(100vh-7rem)] items-end gap-12 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="hero-fade kicker mb-6">Digital Museum Entrance</p>
          <h1 className="display-title max-w-4xl">
            <SplitText text="AURUM / INDEX" by="word" />
          </h1>
          <p className="hero-fade mt-6 max-w-xl text-sm leading-7 text-[var(--brand-200)]">
            A contemporary gallery translated into a spatial editorial index—silent rooms, measured motion, and archival detail rendered as a cinematic interface.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-4">
            <a href="#/collection">
              <MagneticButton size="lg">
                Enter Collection
                <ArrowRight size={16} />
              </MagneticButton>
            </a>
            <a href="#/exhibitions">
              <MagneticButton variant="ghost" size="lg">
                Current Exhibitions
              </MagneticButton>
            </a>
          </div>
        </div>
        <div className="hero-fade hero-parallax relative ml-auto w-full max-w-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--brand-800)]">
            <img
              className="hero-image h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=80"
              alt="Monochrome gallery artwork detail"
              loading="eager"
            />
            <div className="noise-overlay" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--brand-400)]">
            <span>Featured opening / March 2025</span>
            <span className="text-right text-[var(--accent)]">Room 01</span>
          </div>
        </div>
      </div>
    </section>
  );
}
