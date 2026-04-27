/**
 * Search Results Page — /search?q=query
 * Fetches products from API based on query string.
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { searchProducts } from '@/services/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setPage(1);
    searchProducts(query, 1, 20)
      .then((res) => {
        setProducts(res.data);
        setTotal(res.meta.total);
        setLastPage(res.meta.last_page);
      })
      .catch(() => {
        setProducts([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [query]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const res = await searchProducts(query, nextPage, 20);
      setProducts((prev) => [...prev, ...res.data]);
      setPage(nextPage);
      setLastPage(res.meta.last_page);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search Results
        </h1>
        {query ? (
          <p className="text-muted-foreground">
            {total} result{total !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
        ) : (
          <p className="text-muted-foreground">Enter a search term to find products.</p>
        )}
      </div>

      {loading && products.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}

      {!loading && query && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No products found matching your search.</p>
          <Link href="/products">
            <Button variant="outline">Browse All Products</Button>
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {page < lastPage && (
            <div className="mt-12 text-center">
              <Button variant="outline" onClick={loadMore} disabled={loading} isLoading={loading}>
                Load More Results
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
