/**
 * Cart Context Provider
 * Global cart state management for guest and authenticated users
 */

'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import * as cartApi from '@/services/cart';
import type { ApiCart, AddToCartRequest } from '@/services/cart';
import { isAuthenticated } from '@/services/customer';

interface CartContextValue {
  cart: ApiCart | null;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_TOKEN_KEY = 'cart_token';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ApiCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCartToken = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(CART_TOKEN_KEY);
  }, []);

  const setCartToken = useCallback((token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_TOKEN_KEY, token);
    }
  }, []);

  const refreshCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isAuthenticated()) {
        const customerCart = await cartApi.getCustomerCart();
        setCart(customerCart);
      } else {
        const token = getCartToken();
        if (token) {
          try {
            const guestCart = await cartApi.getCart(token);
            setCart(guestCart);
          } catch {
            // Token expired or invalid — clear it and show user-friendly message
            localStorage.removeItem(CART_TOKEN_KEY);
            setCart(null);
            setError('Your cart has expired. Please add items again.');
          }
        } else {
          setCart(null);
        }
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [getCartToken]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (data: AddToCartRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      let token = getCartToken();

      if (!token && !isAuthenticated()) {
        const newCartResponse = await cartApi.createCart();
        token = newCartResponse.token;
        setCartToken(token);
        setCart(newCartResponse.cart);
      }

      const updatedCart = await cartApi.addItem(data, token || undefined);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [getCartToken, setCartToken]);

  const updateQuantity = useCallback(async (itemId: number, quantity: number) => {
    if (!cart || !cart.token) {
      setError('No active cart');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await cartApi.updateItem(cart.token, itemId, { quantity });
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (itemId: number) => {
    if (!cart || !cart.token) {
      setError('No active cart');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await cartApi.removeItem(cart.token, itemId);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const clearCart = useCallback(async () => {
    if (!cart || !cart.token) return;

    setIsLoading(true);
    setError(null);

    try {
      await cartApi.clearCart(cart.token);
      setCart(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_TOKEN_KEY);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const value: CartContextValue = {
    cart,
    itemCount,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
