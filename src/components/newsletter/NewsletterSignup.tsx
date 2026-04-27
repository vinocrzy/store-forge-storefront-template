'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/services/commerce';

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await subscribeToNewsletter(email.trim(), name.trim() || undefined);
      setStatus('success');
      setMessage(res.message || "You're subscribed!");
      setEmail('');
      setName('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={`py-20 px-6 md:px-20 bg-foreground text-background ${className}`}>
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-background/60 mb-3">Stay Connected</p>
        <h2 className="text-3xl font-bold text-background mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-background/70 text-sm leading-relaxed mb-8">
          Get updates on new products, promotions, and exclusive offers.
        </p>

        {status === 'success' ? (
          <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6 text-primary">
            <p className="text-sm font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-background placeholder-background/50 focus:border-primary/60 focus:outline-none text-sm"
            />
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-background placeholder-background/50 focus:border-primary/60 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email.trim()}
                className="rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white uppercase tracking-wider disabled:opacity-60 whitespace-nowrap"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' && (
              <p className="text-red-400 text-xs">{message}</p>
            )}
            <p className="text-background/50 text-xs">Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
