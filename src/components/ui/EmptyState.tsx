import React from 'react';
import { Button } from './Button.tsx';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="museum-card rounded-[var(--r-xl)] p-8 text-center">
      <p className="kicker">No Results</p>
      <h3 className="mt-3 font-display text-4xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--ink-muted)]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
