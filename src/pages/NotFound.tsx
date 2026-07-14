import React from 'react';
import { Button } from '../components/ui/Button.tsx';

export function NotFound() {
  return (
    <section className="section-space pt-32">
      <div className="container-shell text-center">
        <p className="kicker">404</p>
        <h1 className="mt-4 font-display text-6xl">This room is not in the index.</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--ink-muted)]">
          The requested page could not be located within the current exhibition map.
        </p>
        <a href="#/">
          <Button className="mt-8">Return to entrance</Button>
        </a>
      </div>
    </section>
  );
}
