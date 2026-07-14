import React from 'react';
import { Button } from './Button.tsx';

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <div className="museum-card rounded-[var(--r-xl)] p-8 text-center">
      <p className="kicker">Archive Error</p>
      <h3 className="mt-3 font-display text-4xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--ink-muted)]">{description}</p>
      <Button className="mt-6" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
