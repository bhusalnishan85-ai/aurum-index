import React from 'react';

interface SplitTextProps {
  text: string;
  by?: 'word' | 'char';
  className?: string;
}

export function SplitText({ text, by = 'word', className }: SplitTextProps) {
  const parts = by === 'char' ? text.split('') : text.split(' ');

  return (
    <span className={className} aria-label={text}>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} className="split-part inline-block overflow-hidden align-top">
          <span className="split-inner inline-block will-change-transform">
            {part === ' ' ? '\u00A0' : part}
            {by === 'word' ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  );
}
