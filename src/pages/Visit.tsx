import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Accordion } from '../components/ui/Accordion.tsx';
import { faqs } from '../data/faqs.ts';

const formSchema = z.object({
  name: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Please include a short message or visit request.')
});

export function Visit() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        next[String(issue.path[0])] = issue.message;
      });
      setErrors(next);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-28">
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="kicker">Visit AURUM Index</p>
            <h1 className="mt-4 font-display text-5xl lg:text-7xl">Hours, entry, and quiet correspondence.</h1>
          </div>
          <div className="grid gap-6 text-sm text-[var(--ink-muted)] md:grid-cols-2">
            <div>
              <p className="kicker">Location</p>
              <p className="mt-3 leading-7">19 Mercer Passage<br />New York, NY 10013</p>
            </div>
            <div>
              <p className="kicker">Hours</p>
              <p className="mt-3 leading-7">Wednesday–Sunday<br />11:00–18:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space surface-band">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.44fr_0.56fr]">
          <div className="space-y-8">
            <div className="aspect-[4/5] overflow-hidden rounded-[var(--r-xl)] border border-[var(--border)]">
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&auto=format&fit=crop&q=80"
                alt="Gallery interior"
                loading="lazy"
              />
            </div>
            <div className="museum-card rounded-[var(--r-xl)] p-6">
              <p className="kicker">Tickets</p>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-muted)]">
                General entry is complimentary. Guided walk-throughs and collection appointments are arranged by request.
              </p>
            </div>
          </div>
          <div>
            <form className="museum-card rounded-[var(--r-xl)] p-6" onSubmit={onSubmit} noValidate>
              <p className="kicker">Contact Form</p>
              <h2 className="mt-4 font-display text-4xl">Request a visit, note, or acquisition conversation.</h2>
              <div className="mt-6 grid gap-4">
                <Input
                  label="Name"
                  value={values.name}
                  error={errors.name}
                  onChange={(event) => setValues({ ...values, name: event.target.value })}
                />
                <Input
                  label="Email"
                  value={values.email}
                  error={errors.email}
                  onChange={(event) => setValues({ ...values, email: event.target.value })}
                />
                <label className="flex flex-col gap-2 text-sm">
                  <span className="uppercase tracking-[0.18em] text-[11px] text-[var(--ink-muted)]">Message</span>
                  <textarea
                    className="min-h-40 rounded-[var(--r)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] outline-none"
                    value={values.message}
                    onChange={(event) => setValues({ ...values, message: event.target.value })}
                  />
                  {errors.message ? <span className="text-[12px] text-[var(--danger)]">{errors.message}</span> : null}
                </label>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button type="submit">Send request</Button>
                <Button type="button" variant="ghost" onClick={() => { setValues({ name: '', email: '', message: '' }); setErrors({}); setSubmitted(false); }}>
                  Clear form
                </Button>
              </div>
              {submitted ? (
                <p className="mt-4 text-sm text-[var(--success)]">Your note has entered the AURUM Index. The gallery desk will respond shortly.</p>
              ) : null}
            </form>

            <div className="mt-8 museum-card rounded-[var(--r-xl)] p-6">
              <p className="kicker">Map Placeholder</p>
              <div className="mt-4 aspect-[16/9] rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--surface-2)] p-6">
                <div className="flex h-full items-end justify-between">
                  <div>
                    <p className="font-display text-4xl">SoHo</p>
                    <p className="mt-2 text-sm text-[var(--ink-muted)]">Accessible entrance via Mercer Passage.</p>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">No external map API</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <p className="kicker">Visitor Questions</p>
            <h2 className="mt-4 font-display text-5xl">Practical notes, kept quiet.</h2>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
