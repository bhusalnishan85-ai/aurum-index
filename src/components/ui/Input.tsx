import React from 'react';
import { cn } from '../../lib/utils.ts';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
  error?: string;
}

export function Input({ label, helper, error, className, id, ...rest }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="flex flex-col gap-2 text-sm" htmlFor={inputId}>
      <span className="uppercase tracking-[0.18em] text-[11px] text-[var(--ink-muted)]">{label}</span>
      <input
        id={inputId}
        className={cn(
          'w-full rounded-[var(--r)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none',
          error && 'border-[var(--danger)]',
          className
        )}
        {...rest}
      />
      {error ? (
        <span className="text-[12px] text-[var(--danger)]">{error}</span>
      ) : helper ? (
        <span className="text-[12px] text-[var(--ink-muted)]">{helper}</span>
      ) : null}
    </label>
  );
}
