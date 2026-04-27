/**
 * WishlistButton — Heart icon toggle for wishlisting products
 * Uses inline SVG heart icon. Animated scale bounce on toggle.
 */

'use client';

import { useState } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';

interface WishlistButtonProps {
  productId: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function WishlistButton({ productId, size = 'sm', className = '' }: WishlistButtonProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [animating, setAnimating] = useState(false);

  const wishlisted = isWishlisted(productId);
  const iconSize = size === 'sm' ? 20 : 24;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    await toggleWishlist(productId);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`inline-flex items-center justify-center transition-transform duration-300 ${
        animating ? 'scale-125' : 'scale-100'
      } ${className}`}
    >
      {wishlisted ? (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary transition-colors duration-200"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
}
