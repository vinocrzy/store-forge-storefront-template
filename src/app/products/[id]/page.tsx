import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate static paths for product pages
export async function generateStaticParams() {
  // In a real app, this would fetch all product IDs from API
  // For now, generate a few sample pages
  return Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  // In a real app, this would fetch from API
  const product = {
    id: parseInt(id),
    name: `Product ${id}`,
    price: 99.99,
    compareAtPrice: 129.99,
    description: 'This is a high-quality product with excellent features and outstanding performance. Perfect for everyday use.',
    features: [
      'Premium quality materials',
      'Durable construction',
      'Easy to clean',
      'One year warranty',
      'Free shipping',
    ],
    inStock: true,
    sku: `SKU-${id}`,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center gap-2 text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-primary">Products</Link></li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
            <span className="text-muted-foreground text-2xl">Product Image</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary">
                <span className="text-muted-foreground text-xs">Thumb {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.compareAtPrice && (
              <p className="text-success text-sm mt-1">
                Save ${(product.compareAtPrice - product.price).toFixed(2)} (
                {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% off)
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                ✓ In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-error/10 text-error text-sm font-medium">
                Out of Stock
              </span>
            )}
            <span className="ml-4 text-sm text-muted-foreground">
              SKU: {product.sku}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-3">Features</h2>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border border-border rounded-lg">
                <button className="px-4 py-2 hover:bg-muted transition-colors">-</button>
                <input
                  type="number"
                  value="1"
                  min="1"
                  className="w-16 text-center border-x border-border focus:outline-none"
                  readOnly
                />
                <button className="px-4 py-2 hover:bg-muted transition-colors">+</button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" fullWidth disabled={!product.inStock}>
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button variant="outline" size="lg">
                ♡
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
