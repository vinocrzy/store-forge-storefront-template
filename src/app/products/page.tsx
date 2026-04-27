/**
 * Products Listing Page — /products
 * Fetches products from API with search, category filter, and sort.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts, getCategories } from '@/services/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import type { Product, Category } from '@/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Load categories once
  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const fetchProducts = useCallback(async (pageNum: number, append = false) => {
    setLoading(true);
    try {
      const res = await getProducts({
        search: search || undefined,
        category_id: categoryId,
        sort_by: sortBy as 'name' | 'price' | 'created_at',
        sort_order: sortOrder,
        page: pageNum,
        per_page: 20,
      });
      if (append) {
        setProducts((prev) => [...prev, ...res.data]);
      } else {
        setProducts(res.data);
      }
      setTotal(res.meta.total);
      setLastPage(res.meta.last_page);
    } catch {
      if (!append) setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, categoryId, sortBy, sortOrder]);

  // Re-fetch when filters change
  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [fetchProducts]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(1);
  };

  const handleSortChange = (value: string) => {
    switch (value) {
      case 'price_asc':
        setSortBy('price');
        setSortOrder('asc');
        break;
      case 'price_desc':
        setSortBy('price');
        setSortOrder('desc');
        break;
      case 'name_asc':
        setSortBy('name');
        setSortOrder('asc');
        break;
      default:
        setSortBy('created_at');
        setSortOrder('desc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          All Products
        </h1>
        <p className="text-muted-foreground">
          {total > 0 ? `${total} products found` : 'Browse our complete collection'}
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          />
          <Button type="submit" variant="outline">Search</Button>
        </form>
        <select
          value={categoryId || ''}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
        </select>
      </div>

      {/* Loading */}
      {loading && products.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      )}

      {/* No Results */}
      {!loading && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Load More */}
      {page < lastPage && (
        <div className="mt-12 text-center">
          <Button variant="outline" onClick={loadMore} disabled={loading} isLoading={loading}>
            Load More Products
          </Button>
        </div>
      )}
    </div>
  );
}
