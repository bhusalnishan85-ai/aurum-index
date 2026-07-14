import clsx from 'clsx';

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatDateRange(start: string, end: string) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `${formatter.format(new Date(start))} — ${formatter.format(new Date(end))}`;
}

export function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function parseHash() {
  const raw = window.location.hash || '#/';
  const cleaned = raw.replace(/^#/, '') || '/';
  const [path, queryString] = cleaned.split('?');
  const params = new URLSearchParams(queryString || '');

  return {
    path: path || '/',
    params
  };
}

export function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}
