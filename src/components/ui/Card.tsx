import React from 'react';
import { cn } from '../../lib/utils.ts';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('museum-card rounded-[var(--r-lg)]', className)}>
      {children}
    </div>
  );
}
