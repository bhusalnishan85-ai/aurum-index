import React, { useMemo, useRef, useState } from 'react';
import { exhibitions } from '../data/exhibitions.ts';
import { Tabs } from '../components/ui/Tabs.tsx';
import { EmptyState } from '../components/ui/EmptyState.tsx';
import { ErrorState } from '../components/ui/ErrorState.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { formatDateRange } from '../lib/utils.ts';
import { useGSAP } from '../hooks/useGSAP.ts';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';
import { Flip, gsap } from '../lib/gsap.ts';

export function Exhibitions() {
  const [filter, setFilter] = useState('All');
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === 'All') {
      return exhibitions;
    }
    return exhibitions.filter((item) => item.status === filter);
  }, [filter]);

  useGSAP(() => {
    if (reducedMotion || !ref.current) {
      return;
    }

    gsap.fromTo('.ex-hero', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
  }, [reducedMotion], ref);

  const onFilter = (next: string) => {
    if (!ref.current) {
      setFilter(next);
      return;
    }

    const state = Flip.getState(ref.current.querySelectorAll('.flip-item'));
    setFilter(next);
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: 'power3.inOut',
        absolute: true,
        stagger: 0.04
      });
    });
  };

  if (broken) {
    return (
      <section className="section-space pt-32">
        <div className="container-shell">
          <ErrorState
            title="The archive failed to open."
            description="A display register could not be resolved. Please try again."
            onRetry={() => setBroken(false)}
          />
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="pt-28">
      <section className="section-space ex-hero">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="kicker">Current Exhibitions</p>
            <p className="mt-6 text-5xl font-display lg:text-7xl">2025</p>
          </div>
          <div>
            <h1 className="font-display text-5xl lg:text-7xl">Date ranges, rooms, and spatial notes.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--ink-muted)]">
              Each exhibition is presented as an editorial object: measured in rooms, years, and curatorial intent rather than commercial inventory.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space surface-band">
        <div className="container-shell space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs tabs={['All', 'Current', 'Upcoming', 'Archive']} value={filter} onChange={onFilter} />
            <button className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]" onClick={() => setBroken(true)}>
              Simulate archive error
            </button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No works match this index."
              description="Reset the filter to return to the full collection."
              actionLabel="Reset filter"
              onAction={() => setFilter('All')}
            />
          ) : (
            <div className="space-y-5">
              {filtered.map((item) => (
                <Card key={item.id} className="flip-item overflow-hidden">
                  <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
                    <div className="aspect-[4/5] overflow-hidden lg:aspect-auto">
                      <img className="h-full w-full object-cover" src={item.image} alt={item.title} loading="lazy" />
                    </div>
                    <div className="flex flex-col justify-between p-6 lg:p-8">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge>{item.status}</Badge>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">{item.room}</span>
                        </div>
                        <h2 className="mt-4 font-display text-4xl lg:text-5xl">{item.title}</h2>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-muted)]">{item.note}</p>
                      </div>
                      <div className="mt-8 grid gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)] md:grid-cols-4">
                        <span>{formatDateRange(item.start, item.end)}</span>
                        <span>{item.artists} artists</span>
                        <span>{item.works} works</span>
                        <span>{item.curator}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
