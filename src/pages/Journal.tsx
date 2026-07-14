import React, { useEffect, useState } from 'react';
import { articles } from '../data/articles.ts';
import { Skeleton } from '../components/ui/Skeleton.tsx';
import { Marquee } from '../components/motion/Marquee.tsx';
import { Card } from '../components/ui/Card.tsx';
import { wait } from '../lib/utils.ts';

export function Journal() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    wait(220).then(() => {
      if (mounted) {
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="pt-28">
      <section className="section-space bg-[var(--brand-50)] text-[var(--brand-900)]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.48fr_0.52fr]">
          <div>
            <p className="kicker">Editorial Notes</p>
            <h1 className="mt-4 font-display text-5xl lg:text-7xl">Essays, room notes, and archival observations.</h1>
          </div>
          <div className="border-l border-[var(--border)] pl-0 lg:pl-8">
            <p className="text-lg leading-8 text-[var(--brand-700)]">
              “A museum website should not merely contain art. It should inherit the pacing, authority, and silence of the rooms it describes.”
            </p>
          </div>
        </div>
      </section>

      <Marquee items={['Mara Veldt', 'Elias Nohr', 'Signe Arlo', 'Jonah Rhee', 'Camille Osei', 'Anton Mirek', 'Noa Kessler', 'Theo Ansel']} />

      <section className="section-space">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          {(loading ? Array.from({ length: 6 }) : articles.slice(0, 6)).map((item, index) => (
            <Card key={loading ? index : item.id} className="overflow-hidden">
              {loading ? (
                <>
                  <Skeleton className="aspect-[16/10] w-full" />
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </>
              ) : (
                <>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img className="h-full w-full object-cover" src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="p-5">
                    <p className="kicker">{item.category}</p>
                    <h2 className="mt-3 font-display text-4xl">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{item.excerpt}</p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">{item.author} / {item.date}</p>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
