import React from 'react';
import { cn } from '../../lib/utils.ts';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex rounded-[var(--r-pill)] border border-[var(--border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]', className)}>
      {children}
    </span>
  );
}
