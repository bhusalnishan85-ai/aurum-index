import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border-t border-[var(--border)]">
      {items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div key={item.question} className="border-b border-[var(--border)]">
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className="text-base text-[var(--ink)]">{item.question}</span>
              <ChevronDown size={18} className={open ? 'rotate-180' : ''} />
            </button>
            {open ? <p className="pb-5 pr-8 text-sm text-[var(--ink-muted)]">{item.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
