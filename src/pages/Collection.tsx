import React, { useMemo, useRef, useState } from 'react';
import { artworks } from '../data/artworks.ts';
import { Modal } from '../components/ui/Modal.tsx';
import { MagneticButton } from '../components/motion/MagneticButton.tsx';
import { formatCurrency, isTouchDevice } from '../lib/utils.ts';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { useGSAP } from '../hooks/useGSAP.ts';
import { gsap, Observer, ScrollTrigger } from '../lib/gsap.ts';

export function Collection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const active = artworks[activeIndex];
  const desktopOrbit = !reducedMotion && !isTouchDevice();

  const names = useMemo(() => artworks.map((item) => item.title), []);

  useGSAP(() => {
    if (!desktopOrbit || !ref.current) {
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>('.orbit-card');
    const total = cards.length;

    const updateOrbit = (progress: number) => {
      const centerX = 0;
      const centerY = 0;
      cards.forEach((card, index) => {
        const angle = ((index / total) * Math.PI * 2) + progress * Math.PI * 2 * -1;
        const x = Math.cos(angle) * 260;
        const y = Math.sin(angle) * 170;
        const front = 1 - Math.abs(Math.sin(angle * 0.5));
        const scale = 0.72 + front * 0.36;
        const blur = 8 - front * 8;
        const opacity = 0.22 + front * 0.78;
        const z = Math.cos(angle) * 180;

        gsap.set(card, {
          x: centerX + x,
          y: centerY + y,
          z,
          rotateZ: `${angle * 18}deg`,
          scale,
          filter: `blur(${Math.max(0, blur)}px)`,
          opacity,
          zIndex: Math.round(front * 100)
        });
      });

      const idx = Math.round(progress * (total - 1)) % total;
      setActiveIndex((idx + total) % total);
    };

    const scene = { progress: 0 };
    gsap.to(scene, {
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.orbit-pin',
        pin: true,
        scrub: true,
        start: 'top top',
        end: '+=3600',
        onUpdate: (self) => updateOrbit(self.progress)
      }
    });

    const observer = Observer.create({
      target: window,
      type: 'wheel,touch,pointer',
      tolerance: 8,
      onDown: () => setActiveIndex((current) => (current + 1) % artworks.length),
      onUp: () => setActiveIndex((current) => (current - 1 + artworks.length) % artworks.length)
    });

    updateOrbit(0);
    ScrollTrigger.refresh();

    return () => {
      observer.kill();
    };
  }, [desktopOrbit], ref);

  return (
    <div ref={ref} className="pt-28">
      <section className="section-space">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="kicker">Orbit Collection Experience</p>
            <h1 className="mt-4 font-display text-5xl lg:text-7xl">An anti-clockwise index of works in suspended rotation.</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--ink-muted)]">
            The collection is organized as a moving room. Works rise forward in depth, then recede again, allowing metadata and image presence to exchange priority over time.
          </p>
        </div>
      </section>

      {desktopOrbit ? (
        <section className="orbit-pin relative h-[100vh] overflow-hidden border-y border-[var(--border)] bg-[var(--brand-900)] text-[var(--brand-50)]">
          <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
            <div className="relative h-[26rem] w-[26rem] [transform-style:preserve-3d]">
              {artworks.map((work) => (
                <button
                  key={work.id}
                  className="orbit-card absolute left-1/2 top-1/2 h-72 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--brand-800)] text-left"
                  onClick={() => {
                    setActiveIndex(artworks.findIndex((item) => item.id === work.id));
                    setOpen(true);
                  }}
                  data-cursor="VIEW"
                  aria-label={`View ${work.title}`}
                >
                  <img className="h-full w-full object-cover" src={work.image} alt={work.title} loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="absolute left-8 top-8 max-w-sm">
            <p className="kicker">Active Work</p>
            <h2 className="mt-4 font-display text-5xl">{active.title}</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--accent)]">{active.artist} / {active.year}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--brand-300)]">{active.description}</p>
            <div className="mt-6 flex gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--brand-400)]">
              <span>{active.room}</span>
              <span>{active.dimensions}</span>
              <span>{formatCurrency(active.price)}</span>
            </div>
            <div className="mt-8">
              <MagneticButton onClick={() => setOpen(true)}>View Detail</MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-10 right-8 w-56">
            <div className="mb-3 flex justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--brand-400)]">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <span>{String(artworks.length).padStart(2, '0')}</span>
            </div>
            <div className="h-px w-full bg-[var(--border)]">
              <div className="h-full bg-[var(--accent)]" style={{ width: `${((activeIndex + 1) / artworks.length) * 100}%` }} />
            </div>
          </div>
        </section>
      ) : (
        <section className="section-space surface-band">
          <div className="container-shell grid gap-6 md:grid-cols-2">
            {artworks.map((work, index) => (
              <article key={work.id} className="museum-card overflow-hidden rounded-[var(--r-xl)]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img className="h-full w-full object-cover" src={work.image} alt={work.title} loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="kicker">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 font-display text-4xl">{work.title}</h2>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">{work.artist} / {work.year}</p>
                  <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{work.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section-space">
        <div className="container-shell border-t border-[var(--border)] pt-10">
          <p className="kicker">Collection Index</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {names.map((name, index) => (
              <button
                key={name}
                className="flex items-center justify-between border-b border-[var(--border)] py-3 text-left text-sm text-[var(--ink-muted)]"
                onClick={() => {
                  setActiveIndex(index);
                  setOpen(true);
                }}
              >
                <span>{name}</span>
                <span className="text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title={active.title}>
        <div className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr]">
          <div className="aspect-[4/5] overflow-hidden rounded-[var(--r-lg)]">
            <img className="h-full w-full object-cover" src={active.image} alt={active.title} loading="lazy" />
          </div>
          <div>
            <p className="kicker">Museum Label</p>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-[var(--accent)]">{active.artist} / {active.year}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">{active.description}</p>
            <dl className="mt-6 space-y-3 text-sm text-[var(--ink-muted)]">
              <div><dt className="inline text-[var(--ink)]">Medium: </dt><dd className="inline">{active.medium}</dd></div>
              <div><dt className="inline text-[var(--ink)]">Dimensions: </dt><dd className="inline">{active.dimensions}</dd></div>
              <div><dt className="inline text-[var(--ink)]">Room: </dt><dd className="inline">{active.room}</dd></div>
              <div><dt className="inline text-[var(--ink)]">Acquisition note: </dt><dd className="inline">Available by inquiry — {formatCurrency(active.price)}</dd></div>
            </dl>
          </div>
        </div>
      </Modal>
    </div>
  );
}
