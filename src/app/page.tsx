import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Welcome to Our Store
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Discover amazing products at great prices. Shop now and enjoy fast, reliable delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Check out our handpicked selection of popular items
            </p>
          </div>

          {/* Product Grid - Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Product Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Product {i}</h3>
                  <p className="text-muted-foreground text-sm mb-3">Product description goes here</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Electronics', 'Fashion', 'Home & Garden', 'Sports'].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase().replace(/ /g, '-')}`}
                className="group"
              >
                <div className="border border-border rounded-lg p-8 text-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <div className="mb-4 text-4xl">📦</div>
                  <h3 className="font-semibold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers. Free shipping on orders over $50!
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
