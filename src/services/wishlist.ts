/**
 * Wishlist API Service
 * Handles wishlist CRUD operations for authenticated customers
 */

import apiClient from '@/lib/apiClient';
import type { Product } from '@/types';

export const getWishlist = async (page = 1): Promise<{ data: Product[]; meta: any }> => {
  const response = await apiClient.get(`/public/wishlist?page=${page}`);
  return response.data;
};

export const toggleWishlist = async (productId: number): Promise<{ wishlisted: boolean; message: string }> => {
  const response = await apiClient.post('/public/wishlist', { product_id: productId });
  return response.data;
};

export const removeFromWishlist = async (productId: number): Promise<void> => {
  await apiClient.delete(`/public/wishlist/${productId}`);
};

export const checkWishlistStatus = async (productIds: number[]): Promise<Record<number, boolean>> => {
  const response = await apiClient.post('/public/wishlist/check', { product_ids: productIds });
  return response.data;
};

export const checkSingleWishlist = async (productId: number): Promise<{ wishlisted: boolean }> => {
  const response = await apiClient.get(`/public/wishlist/check/${productId}`);
  return response.data;
};
