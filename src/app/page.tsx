/**
 * Storefront Template — Homepage
 * 6-section structure matching Honey Bee layout pattern.
 * All brand values driven by CSS custom properties — no hardcoded colours.
 * Override vars in globals.css or via ThemeProvider for each client.
 *
 * Sections:
 *   1. Hero           — full-bleed image, hero-overlay-var, left-aligned headline + dual CTAs
 *   2. Features Row   — 4-icon grid on surface bg
 *   3. Collections    — editorial 3-col grid
 *   4. Featured Items — 3-col product cards
 *   5. Story Teaser   — 2-col layout with pull-quote
 *   6. CTA Band       — dark primary-bg, italic headline, white CTA
 */

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>

      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
          Full-bleed with overlay gradient, left-aligned copy.
      ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[850px] flex items-end pb-24 overflow-hidden">
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-[var(--color-surface-high)]" />
        {/* Overlay */}
        <div className="hero-overlay-var absolute inset-0" />

        <div className="relative z-10 px-6 md:px-20 max-w-2xl">
          <p className="label-caps text-[var(--color-primary)] mb-4">New Arrivals</p>
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--color-foreground)] leading-[1.05] mb-6">
            Discover our latest&nbsp;collection
          </h1>
          <p className="text-lg text-[var(--color-muted-foreground)] mb-10 leading-relaxed max-w-md">
            Curated with care. Crafted for quality. Explore everything we have to offer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="brand-gradient text-white px-10 py-3.5 rounded-full font-label tracking-wider hover:opacity-90 transition-opacity"
            >
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="text-[var(--color-foreground)] underline underline-offset-4 px-4 py-3.5 font-label tracking-wider hover:text-[var(--color-primary)] transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. FEATURES ROW
          4 icon + label tiles on surface background.
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-surface)] px-6 md:px-20 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: '🚚', title: 'Fast Delivery', desc: 'Ships within 2–5 business days' },
            { icon: '✓', title: 'Quality Assured', desc: 'Every product hand-selected' },
            { icon: '↩', title: 'Easy Returns', desc: '30-day no-questions-asked policy' },
            { icon: '🔒', title: 'Secure Checkout', desc: 'Encrypted & PCI-compliant' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3">
              <span className="text-3xl">{icon}</span>
              <span className="font-headline text-sm text-[var(--color-foreground)]">{title}</span>
              <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. COLLECTIONS GRID
          3-column editorial tiles with dark-scrim text overlay.
      ═══════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-20 py-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-headline text-3xl md:text-4xl text-[var(--color-foreground)]">
            Shop by Collection
          </h2>
          <Link
            href="/categories"
            className="label-caps text-[var(--color-primary)] hidden md:inline-block"
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'New Arrivals', href: '/products?sort=new' },
            { label: 'Best Sellers', href: '/products?sort=popular' },
            { label: 'Sale', href: '/products?sale=true' },
          ].map(({ label, href }, i) => (
            <Link key={label} href={href} className="group relative overflow-hidden rounded-[var(--radius-xl)] aspect-[4/5] block">
              {/* Placeholder bg — client replaces with real images */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: `hsl(${210 + i * 30}deg 15% ${88 - i * 5}%)` }}
              />
              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="label-caps text-white/80 block mb-1">Collection</span>
                <h3 className="font-headline text-2xl text-white">{label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. FEATURED PRODUCTS
          3-col artisan-style cards with card-shadow.
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-surface)] px-6 md:px-20 py-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-headline text-3xl md:text-4xl text-[var(--color-foreground)]">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="label-caps text-[var(--color-primary)] hidden md:inline-block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--color-background)] rounded-[var(--radius-xl)] overflow-hidden card-shadow group">
              {/* Product image placeholder */}
              <div className="aspect-[4/5] bg-[var(--color-surface-high)] flex items-center justify-center overflow-hidden">
                <span className="text-sm text-[var(--color-muted-foreground)] font-label tracking-wider">
                  Product Image
                </span>
              </div>
              <div className="p-5">
                <p className="label-caps text-[var(--color-muted-foreground)] mb-1">Category</p>
                <h3 className="font-headline text-lg text-[var(--color-foreground)] mb-1">Product Name {i}</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-4">Short product description goes here.</p>
                <div className="flex items-center justify-between">
                  <span className="font-headline text-xl text-[var(--color-foreground)]">$99.00</span>
                  <button className="brand-gradient text-white text-xs font-label tracking-wider px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block border border-[var(--color-border)] text-[var(--color-foreground)] font-label label-caps px-10 py-3 rounded-full hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            View all products
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          5. STORY / ABOUT TEASER
          2-col layout: image placeholder (left) + text (right).
      ═══════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-[var(--radius-xl)] bg-[var(--color-surface)] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-[var(--color-muted-foreground)] font-label tracking-wider">Brand Photo</span>
              </div>
            </div>
            {/* Pull-quote card */}
            <div className="absolute -bottom-6 -right-6 bg-[var(--color-background)] rounded-2xl p-5 card-shadow max-w-[200px] hidden md:block">
              <p className="font-headline text-sm italic text-[var(--color-foreground)] leading-relaxed">
                &ldquo;Handcrafted with intention.&rdquo;
              </p>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-5">
            <p className="label-caps text-[var(--color-primary)]">Our Story</p>
            <h2 className="font-headline text-3xl md:text-4xl text-[var(--color-foreground)] leading-snug">
              Made with care, built to last
            </h2>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              We believe in creating products that bring genuine value to everyday life. Every item in our store is thoughtfully selected to meet our standards for quality, sustainability, and beauty.
            </p>
            <p className="text-[var(--color-muted-foreground)] leading-relaxed">
              From our team to your home — with gratitude.
            </p>
            <Link
              href="/about"
              className="self-start label-caps text-[var(--color-primary)] border-b border-[var(--color-primary)] pb-0.5 hover:opacity-80 transition-opacity mt-2"
            >
              Learn more about us
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. DARK CTA BAND
          Full-width primary-bg, italic headline, white CTA button.
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-[var(--color-primary)] px-6 md:px-20 py-20 text-center">
        <p className="label-caps text-white/60 mb-4">Limited Time</p>
        <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl italic text-white mb-5 max-w-xl mx-auto leading-snug">
          &ldquo;Quality that speaks for itself.&rdquo;
        </h2>
        <p className="text-white/80 mb-10 max-w-sm mx-auto text-sm leading-relaxed">
          Free shipping on all orders over $50. New arrivals every week.
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-[var(--color-primary)] font-label label-caps px-10 py-3.5 rounded-full hover:bg-white/90 transition-colors"
        >
          Shop All Products
        </Link>
      </section>

    </div>
  );
}
