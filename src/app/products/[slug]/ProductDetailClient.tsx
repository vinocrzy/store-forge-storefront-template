/**
 * ProductDetailClient — Interactive section of the product detail page
 * Handles add-to-cart, quantity selection, and wishlist toggle.
 */

'use client';

import { useState } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { RatingStars } from '@/components/ui/RatingStars';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const inStock = product.stock_quantity > 0;

  const handleAddToCart = async () => {
    try {
      await addToCart({ product_id: product.id, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // Error handled by CartContext
    }
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {product.name}
      </h1>

      {/* Rating */}
      {product.avg_rating != null && product.avg_rating > 0 && (
        <div className="mb-4">
          <RatingStars rating={product.avg_rating} size="md" showValue reviewCount={product.review_count} />
        </div>
      )}

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-primary">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-xl text-muted-foreground line-through">
              ${Number(product.compare_at_price).toFixed(2)}
            </span>
          )}
        </div>
        {product.compare_at_price && product.compare_at_price > product.price && (
          <p className="text-[var(--color-success)] text-sm mt-1">
            Save ${(product.compare_at_price - product.price).toFixed(2)} (
            {Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% off)
          </p>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        {inStock ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)] text-sm font-medium">
            ✓ In Stock
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-error)]/10 text-[var(--color-error)] text-sm font-medium">
            Out of Stock
          </span>
        )}
        <span className="ml-4 text-sm text-muted-foreground">
          SKU: {product.sku}
        </span>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-medium">Quantity:</label>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={product.stock_quantity > 0 ? product.stock_quantity : undefined}
          />
        </div>

        <div className="flex gap-4">
          <Button
            size="lg"
            fullWidth
            disabled={!inStock || isLoading}
            isLoading={isLoading}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart' : inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <WishlistButton productId={product.id} size="md" className="border border-border rounded-lg px-4 hover:bg-muted transition-colors" />
        </div>
      </div>
    </div>
  );
}
