/**
 * ProductCard — Generic product card for grid layouts
 * Image, name, price, compare-at price, wishlist button, rating stars.
 * Uses template CSS variable design system.
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { RatingStars } from '@/components/ui/RatingStars';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.primary_image || product.images?.[0];
  const imageUrl = primaryImage?.url;
  const altText = primaryImage?.alt_text || product.name;

  return (
    <div className="group relative border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Wishlist button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton
          productId={product.id}
          className="bg-background/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm"
        />
      </div>

      <Link href={`/products/${product.slug}`}>
        {/* Product Image */}
        <div className="aspect-square bg-muted relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={altText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
          {product.stock_quantity <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${Number(product.compare_at_price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          {product.avg_rating != null && product.avg_rating > 0 && (
            <div className="mt-2">
              <RatingStars
                rating={product.avg_rating}
                size="sm"
                reviewCount={product.review_count}
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
