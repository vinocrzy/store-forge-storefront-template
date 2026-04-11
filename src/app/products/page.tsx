'use client';

import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '@/services/products';
import type { Product, Category, ProductFilters } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { SortSelect } from '@/components/ui/SortSelect';
import { FilterSidebar } from '@/components/ui/FilterSidebar';
import { LoadMoreButton } from '@/components/ui/LoadMoreButton';
import { PageHero } from '@/components/ui/PageHero';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');

  // Map UI sort value to API params
  function getSortParams(s: string): Pick<ProductFilters, 'sort_by' | 'sort_order'> {
    switch (s) {
      case 'price-asc': return { sort_by: 'price', sort_order: 'asc' };
      case 'price-desc': return { sort_by: 'price', sort_order: 'desc' };
      case 'newest': return { sort_by: 'created_at', sort_order: 'desc' };
      default: return { sort_by: 'name', sort_order: 'asc' };
    }
  }

  const selectedCategoryObj = categories.find((c) => c.name === selectedCategory);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const filters: ProductFilters = {
      page: 1,
      per_page: 12,
      search: search || undefined,
      category_id: selectedCategoryObj?.id,
      ...getSortParams(sort),
    };
    getProducts(filters)
      .then((res) => {
        setProducts(res.data);
        setCurrentPage(1);
        setHasMore(res.current_page < res.last_page);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [sort, selectedCategory, search, selectedCategoryObj?.id]);

  function loadMore() {
    const nextPage = currentPage + 1;
    const filters: ProductFilters = {
      page: nextPage,
      per_page: 12,
      search: search || undefined,
      category_id: selectedCategoryObj?.id,
      ...getSortParams(sort),
    };
    getProducts(filters).then((res) => {
      setProducts((prev) => [...prev, ...res.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < res.last_page);
    }).catch(console.error);
  }

  const categoryNames = ['', ...categories.map((c) => c.name)];

  return (
    <div className="max-w-[1920px] mx-auto px-6 md:px-20 py-16">
      <PageHero
        eyebrow="Our Collection"
        title="All Products"
        description="Browse our complete collection"
      />

      {/* Search */}
      <div className="mb-8">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <FilterSidebar
          categories={categoryNames}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => setSelectedCategory(cat === selectedCategory ? '' : cat)}
        />

        {/* Main */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Loading…' : `${products.length} products`}
            </p>
            <SortSelect value={sort} onChange={setSort} />
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.primary_image?.url ?? '/images/placeholder.webp'}
                  badge={product.is_featured ? 'Featured' : undefined}
                />
              ))}
            </div>
          )}

          <LoadMoreButton onClick={loadMore} hasMore={hasMore} />
        </div>
      </div>
    </div>
  );
}


