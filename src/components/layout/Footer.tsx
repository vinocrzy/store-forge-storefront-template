/**
 * Storefront Template — Footer
 * Generic 4-column footer using CSS custom properties.
 * Structural mirror of Honey Bee footer — brand-neutral.
 * Override CSS vars in globals.css / ThemeProvider for each client.
 *
 * Layout: Brand col | Shop links | Customer Service | Newsletter signup
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { StoreName } from '@/components/StoreLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup handled by form service
    setEmail('');
  };

  return (
    <footer className="mt-auto">
      {/* Main footer area */}
      <div className="bg-[var(--color-surface)] px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span className="font-headline text-xl text-[var(--color-foreground)]">
              <StoreName />
            </span>
            <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
              Quality products curated with care. Discover our collections and find something you love.
            </p>
            {/* Social icons — rendered as generic SVG placeholders */}
            <div className="flex gap-3 mt-1">
              {[
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map(({ label, path }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="label-caps text-[var(--color-foreground)] mb-5">Shop</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/products?sort=new', label: 'New Arrivals' },
                { href: '/products?sort=popular', label: 'Best Sellers' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service links */}
          <div>
            <h4 className="label-caps text-[var(--color-foreground)] mb-5">Help</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/account', label: 'My Account' },
                { href: '/orders', label: 'Order Tracking' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns' },
                { href: '/contact', label: 'Contact Us' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="label-caps text-[var(--color-foreground)] mb-5">Stay in the loop</h4>
            <p className="text-sm text-[var(--color-muted-foreground)] mb-4 leading-relaxed">
              Get updates on new arrivals and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-transparent border-0 border-b border-[var(--color-border)] pb-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="brand-gradient text-white text-xs font-label tracking-widest uppercase px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity self-start"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar — tonal shift, no border */}
      <div className="bg-[var(--color-surface-high)] px-6 md:px-20 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
        <p>© {currentYear} <StoreName />. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[var(--color-primary)] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--color-primary)] transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
