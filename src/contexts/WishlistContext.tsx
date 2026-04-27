/**
 * WishlistContext — Global wishlist state for authenticated customers
 * Optimistic toggle with API sync; redirects to login if unauthenticated.
 */

'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import * as WishlistService from '@/services/wishlist';

interface WishlistContextValue {
  wishlistedIds: Set<number>;
  toggleWishlist: (productId: number) => Promise<void>;
  isWishlisted: (productId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set());

  // On mount / auth change: fetch all wishlisted product IDs
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      setWishlistedIds(new Set());
      return;
    }

    let cancelled = false;

    const fetchAll = async () => {
      try {
        // Fetch first page to get all wishlisted items
        const res = await WishlistService.getWishlist(1);
        if (cancelled) return;
        const ids = new Set(res.data.map((p) => p.id));
        // If there are more pages, fetch them
        if (res.meta?.last_page > 1) {
          for (let page = 2; page <= res.meta.last_page; page++) {
            const nextRes = await WishlistService.getWishlist(page);
            if (cancelled) return;
            nextRes.data.forEach((p) => ids.add(p.id));
          }
        }
        setWishlistedIds(ids);
      } catch {
        // Silently fail — wishlist is non-critical
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  }, [isAuthenticated, authLoading]);

  const isWishlisted = useCallback(
    (productId: number) => wishlistedIds.has(productId),
    [wishlistedIds]
  );

  const toggleWishlist = useCallback(
    async (productId: number) => {
      if (!isAuthenticated) {
        router.push('/login?message=Please sign in to save items to your wishlist');
        return;
      }

      const wasWishlisted = wishlistedIds.has(productId);

      // Optimistic update
      setWishlistedIds((prev) => {
        const next = new Set(prev);
        if (wasWishlisted) {
          next.delete(productId);
        } else {
          next.add(productId);
        }
        return next;
      });

      try {
        await WishlistService.toggleWishlist(productId);
      } catch {
        // Revert on failure
        setWishlistedIds((prev) => {
          const next = new Set(prev);
          if (wasWishlisted) {
            next.add(productId);
          } else {
            next.delete(productId);
          }
          return next;
        });
      }
    },
    [isAuthenticated, wishlistedIds, router]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistedIds,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlistedIds.size,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
}
