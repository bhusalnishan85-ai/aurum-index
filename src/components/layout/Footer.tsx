import React, { useState } from 'react';
import { Instagram, ArrowUpRight, Mail } from 'lucide-react';
import { Input } from '../ui/Input.tsx';
import { Button } from '../ui/Button.tsx';
import { useToast } from '../ui/Toast.tsx';

export function Footer() {
  const [email, setEmail] = useState('');
  const { push } = useToast();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-4">
        <div>
          <p className="kicker">AURUM Index</p>
          <p className="mt-4 max-w-xs text-sm text-[var(--ink-muted)]">
            A fictional contemporary art gallery presented as a quiet digital museum index.
          </p>
        </div>
        <div>
          <p className="kicker">Visit</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ink-muted)]">
            <li>19 Mercer Passage</li>
            <li>New York, NY 10013</li>
            <li>Wed–Sun / 11:00–18:00</li>
          </ul>
        </div>
        <div>
          <p className="kicker">Index</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--ink-muted)]">
            <li><a href="#/exhibitions">Exhibitions</a></li>
            <li><a href="#/collection">Collection</a></li>
            <li><a href="#/journal">Journal</a></li>
          </ul>
        </div>
        <div>
          <p className="kicker">Newsletter</p>
          <div className="mt-4 space-y-3">
            <Input
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
            <Button
              onClick={() => {
                if (!email) {
                  push('Please enter an email to receive exhibition notes.');
                  return;
                }
                setEmail('');
                push('You are now subscribed to AURUM Index notes.');
              }}
            >
              Subscribe
            </Button>
          </div>
          <div className="mt-5 flex gap-3 text-[var(--ink-muted)]">
            <a href="#/visit" aria-label="Email the gallery"><Mail size={16} /></a>
            <a href="#/journal" aria-label="Instagram archive"><Instagram size={16} /></a>
            <a href="#/collection" aria-label="Open collection"><ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
