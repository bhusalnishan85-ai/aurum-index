import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button.tsx';
import { useTheme } from '../../hooks/useTheme.ts';
import { cn } from '../../lib/utils.ts';

const navItems = [
  { href: '#/', label: 'Index' },
  { href: '#/exhibitions', label: 'Exhibitions' },
  { href: '#/collection', label: 'Collection' },
  { href: '#/journal', label: 'Journal' },
  { href: '#/visit', label: 'Visit' }
];

interface HeaderProps {
  path: string;
}

export function Header({ path }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!open || !drawerRef.current) {
      return;
    }

    const root = drawerRef.current;
    const focusables = root.querySelectorAll<HTMLElement>('a, button');
    focusables[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell mt-4">
        <div className="flex items-center justify-between rounded-[var(--r-pill)] border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_72%,transparent)] px-4 py-3 backdrop-blur-md">
          <a href="#/" className="text-sm uppercase tracking-[0.22em] text-[var(--ink)]">AURUM Index</a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={cn('relative text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)]', path === item.href.replace('#', '') && 'text-[var(--ink)]')}>
                {item.label}
                {path === item.href.replace('#', '') ? <span className="absolute -bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--accent)]" /> : null}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="icon" aria-label="Toggle theme" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button variant="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={16} />
            </Button>
          </div>
        </div>
      </div>
      {open ? (
        <div ref={drawerRef} className="fixed inset-0 z-50 bg-[var(--bg)] p-6 lg:hidden">
          <div className="mb-10 flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.22em]">Index Menu</span>
            <Button variant="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={18} />
            </Button>
          </div>
          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="font-display text-5xl" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
