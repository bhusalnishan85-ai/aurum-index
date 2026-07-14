import React, { useRef } from 'react';
import { Hero } from '../components/sections/Hero.tsx';
import { artworks } from '../data/artworks.ts';
import { exhibitions } from '../data/exhibitions.ts';
import { Marquee } from '../components/motion/Marquee.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { formatCurrency } from '../lib/utils.ts';
import { useGSAP } from '../hooks/useGSAP.ts';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { gsap, ScrollTrigger } from '../lib/gsap.ts';

export function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !ref.current) {
      return;
    }

    gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((item) => {
      gsap.fromTo(item, { y: 40, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 82%'
        }
      });
    });

    const strip = ref.current.querySelector('.journey-strip');
    if (strip) {
      const width = strip.scrollWidth - window.innerWidth;
      gsap.to(strip, {
        x: -width,
        ease: 'none',
        scrollTrigger: {
          trigger: '.journey-pin',
          pin: true,
          scrub: true,
          start: 'top top',
          end: () => `+=${width}`
        }
      });
    }

    const stats = ref.current.querySelectorAll('[data-count]');
    stats.forEach((node) => {
      const value = Number(node.getAttribute('data-count'));
      const state = { value: 0 };
      gsap.to(state, {
        value,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%'
        },
        onUpdate: () => {
          node.textContent = `${Math.round(state.value)}`;
        }
      });
    });

    ScrollTrigger.refresh();
  }, [reducedMotion], ref);

  return (
    <div ref={ref}>
      <Hero />

      <section className="section-space surface-band">
        <div className="container-shell reveal-block grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker">Featured Exhibition</p>
            <h2 className="mt-4 font-display text-5xl">{exhibitions[0].title}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--ink-muted)]">
            {exhibitions[0].note} Across rooms of calibrated shadow and paper-toned restraint, the exhibition treats display residue as a primary image system rather than a secondary trace.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell reveal-block grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {artworks.slice(0, 3).map((work) => (
            <Card key={work.id} className="group overflow-hidden" >
              <div className="relative aspect-[4/5] overflow-hidden" data-cursor="VIEW">
                <img className="h-full w-full object-cover" src={work.image} alt={work.title} loading="lazy" />
                <div className="noise-overlay opacity-0 group-hover:opacity-100" />
              </div>
              <div className="space-y-3 p-5">
                <Badge>{work.artist}</Badge>
                <div>
                  <h3 className="font-display text-3xl">{work.title}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-muted)]">{work.medium}</p>
                </div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                  <span>{work.year}</span>
                  <span>{formatCurrency(work.price)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="journey-pin section-space surface-band-2 overflow-hidden">
        <div className="container-shell mb-8 reveal-block">
          <p className="kicker">Horizontal Journey</p>
          <h2 className="mt-4 font-display text-5xl">Rooms read left to right.</h2>
        </div>
        <div className="journey-strip flex gap-6 px-4 md:px-8">
          {artworks.slice(3, 8).map((work, index) => (
            <article key={work.id} className="relative w-[85vw] shrink-0 overflow-hidden rounded-[var(--r-xl)] border border-[var(--border)] bg-[var(--surface)] lg:w-[56vw]">
              <div className="grid lg:grid-cols-[0.68fr_0.32fr]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img className="h-full w-full object-cover" src={work.image} alt={work.title} loading="lazy" />
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <p className="kicker">0{index + 1}</p>
                    <h3 className="mt-3 font-display text-4xl">{work.title}</h3>
                    <p className="mt-3 text-sm text-[var(--ink-muted)]">{work.description}</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">{work.artist} / {work.year}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell reveal-block grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker">About AURUM Index</p>
            <h2 className="mt-4 font-display text-5xl">A digital catalogue with the pace of a silent room.</h2>
          </div>
          <div className="space-y-6 text-sm leading-7 text-[var(--ink-muted)]">
            <p>
              AURUM Index presents contemporary art through the language of museum labels, printed catalogues, and spatial motion. Instead of a commercial gallery grid, visitors move through a digital index of rooms, notes, and carefully withheld details.
            </p>
            <p>
              The interface privileges duration over speed: long pauses, thin rules, deep blacks, paper-toned surfaces, and image movement that feels architectural rather than decorative.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space surface-band">
        <div className="container-shell reveal-block grid gap-6 md:grid-cols-4">
          {[
            ['12', 'Works'],
            ['4', 'Rooms'],
            ['9', 'Artists'],
            ['2020', 'Earliest Year']
          ].map(([count, label]) => (
            <div key={label} className="border-t border-[var(--border)] pt-6">
              <div className="font-display text-6xl" data-count={count}>0</div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Marquee items={artworks.map((item) => `${item.artist} — ${item.title}`)} />
    </div>
  );
}
