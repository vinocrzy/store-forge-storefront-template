import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ProductsPage() {
  // In a real app, this would fetch from API
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 99.99 + i * 10,
    description: 'High-quality product with excellent features',
    image: null,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          All Products
        </h1>
        <p className="text-muted-foreground">
          Browse our complete collection of products
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="search"
          placeholder="Search products..."
          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Garden</option>
          <option>Sports</option>
        </select>
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <div className="aspect-square bg-muted flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                <span className="text-muted-foreground">Product Image</span>
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button variant="outline" className="bg-primary text-white">1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">
          Next
        </Button>
      </div>
    </div>
  );
}
