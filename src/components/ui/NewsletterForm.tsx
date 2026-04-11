'use client';

import { useState, type FormEvent } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to email marketing API
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto bg-white/60 rounded-lg px-6 py-5">
        <svg className="h-5 w-5 text-primary flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <p className="text-sm text-foreground font-medium">
          You&apos;re on the list. Thanks for subscribing!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-background border border-border rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none px-5 py-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="brand-gradient text-white label-caps px-8 py-4 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:opacity-90 transition-opacity flex-shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
