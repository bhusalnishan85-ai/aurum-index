import React from 'react';
import { cn } from '../../lib/utils.ts';

interface TabsProps {
  tabs: string[];
  value: string;
  onChange: (value: string) => void;
}

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={value === tab}
          className={cn(
            'rounded-[var(--r-pill)] border px-4 py-2 text-[11px] uppercase tracking-[0.18em]',
            value === tab
              ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--ink-inverse)]'
              : 'border-[var(--border)] text-[var(--ink-muted)]'
          )}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
