'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  productId: number | string;
  productName: string;
  price: number;
}

export function AddToCartButton({ productId, productName, price }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Suppress unused variable warnings — available for wiring to cart context
  void productId;
  void productName;
  void price;

  const handleAddToCart = async () => {
    setLoading(true);
    // TODO: wire to CartContext.addToCart
    await new Promise<void>((r) => setTimeout(r, 600));
    setAdded(true);
    setLoading(false);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="brand-gradient text-white w-full py-4 rounded-lg label-caps shadow-sm transition-all active:scale-95 disabled:opacity-70"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Adding...
        </span>
      ) : added ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Added to Cart
        </span>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
}
