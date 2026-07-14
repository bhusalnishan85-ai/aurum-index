import React from 'react';
import { cn } from '../../lib/utils.ts';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...rest
  } = props;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] border font-sans uppercase tracking-[0.18em] transition-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        variant === 'primary' && 'border-[var(--accent)] bg-[var(--accent)] text-[var(--ink-inverse)]',
        variant === 'secondary' && 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)]',
        variant === 'ghost' && 'border-transparent bg-transparent text-[var(--ink)]',
        variant === 'destructive' && 'border-[var(--danger)] bg-[var(--danger)] text-[var(--danger-ink)]',
        variant === 'icon' && 'h-11 w-11 border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)]',
        size === 'sm' && 'px-4 py-2 text-[11px]',
        size === 'md' && 'px-5 py-3 text-[11px]',
        size === 'lg' && 'px-6 py-4 text-[12px]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
