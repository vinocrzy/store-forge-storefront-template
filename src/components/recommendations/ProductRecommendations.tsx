'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductRecommendations, getCartRecommendations } from '@/services/commerce';
import type { Product } from '@/types';

interface ProductRecommendationsProps {
  productId?: number;
  cartProductIds?: number[];
  title?: string;
  subtitle?: string;
}

export function ProductRecommendations({
  productId,
  cartProductIds,
  title = 'You May Also Like',
  subtitle,
}: ProductRecommendationsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let results: Product[] = [];
        if (productId) {
          results = await getProductRecommendations(productId, 'similar');
        } else if (cartProductIds && cartProductIds.length > 0) {
          results = await getCartRecommendations(cartProductIds);
        }
        setProducts(results.slice(0, 4));
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [productId, cartProductIds?.join(',')]);

  if (loading || products.length === 0) return null;

  return (
    <section className="px-6 md:px-20 py-16 bg-background">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">Recommendations</p>
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-foreground/70 text-sm mt-2">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group bg-surface rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="aspect-[4/5] overflow-hidden bg-surface-container">
              <Image
                src={product.primary_image?.url || '/placeholder.png'}
                alt={product.primary_image?.alt_text || product.name}
                width={400}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-foreground font-medium text-sm line-clamp-2 mb-1">{product.name}</p>
              <p className="text-[var(--color-primary)] font-semibold text-sm">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
