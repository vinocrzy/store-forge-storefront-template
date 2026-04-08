/**
 * Storefront Template — Navigation Header
 * Generic glass-header sticky nav using CSS custom properties.
 * Brand colors, logo, and nav links are all configurable via
 * CSS variables or environment config.
 *
 * Layout mirrors Honey Bee: Brand mark (left) | links (centre) | icons (right)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { StoreLogo } from '@/components/StoreLogo';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="glass-header sticky top-0 z-50 w-full">
      {/* Main nav row */}
      <div className="flex justify-between items-center px-6 md:px-20 py-5">
        {/* Brand logo / store name */}
        <div className="flex-shrink-0">
          <StoreLogo width={120} height={40} priority />
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`label-caps text-[var(--color-label)] hover:text-[var(--color-primary)] transition-colors pb-0.5 ${
                pathname === link.href
                  ? 'border-b border-[var(--color-primary)] text-[var(--color-primary)]'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search + Account + Cart + mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Search — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 px-4 py-2 pr-8 border border-[var(--color-border)] rounded-full text-sm bg-[var(--color-input)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:w-64 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Account */}
          <Link
            href="/account"
            aria-label="Account"
            className="hidden md:flex items-center gap-1.5 text-sm text-[var(--color-label)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-[var(--color-label)] hover:text-[var(--color-primary)] transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 brand-gradient text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-label">
              0
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[var(--color-label)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--color-background)] px-6 pb-8">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-4 pt-2">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-[var(--color-border)] rounded-full text-sm bg-[var(--color-input)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <ul className="space-y-0">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-[var(--color-border)] last:border-0">
                <Link
                  href={link.href}
                  className={`block py-4 label-caps hover:text-[var(--color-primary)] transition-colors ${
                    pathname === link.href ? 'text-[var(--color-primary)]' : 'text-[var(--color-label)]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-[var(--color-border)]">
              <Link
                href="/account"
                className="block py-4 label-caps text-[var(--color-label)] hover:text-[var(--color-primary)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
