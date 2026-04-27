/**
 * Phase 9C: Recommendations, Newsletter, Loyalty, Currency Services
 */

import apiClient, { type ApiResponse } from '@/lib/apiClient';
import type { Product } from '@/types';

// ─────────────────────────────────────────────
// Recommendations
// ─────────────────────────────────────────────

export type RecommendationType = 'similar' | 'bought_together';

export const getProductRecommendations = async (
  productId: number,
  type: RecommendationType = 'similar'
): Promise<Product[]> => {
  const response = await apiClient.get<ApiResponse<Product[]>>(
    `/public/products/${productId}/recommendations?type=${type}`
  );
  return response.data.data ?? [];
};

export const getCartRecommendations = async (productIds: number[]): Promise<Product[]> => {
  if (productIds.length === 0) return [];
  const response = await apiClient.post<ApiResponse<Product[]>>('/public/recommendations/cart', {
    product_ids: productIds,
  });
  return response.data.data ?? [];
};

// ─────────────────────────────────────────────
// Newsletter
// ─────────────────────────────────────────────

export const subscribeToNewsletter = async (email: string, name?: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/public/newsletter/subscribe', { email, name });
  return response.data;
};

export const unsubscribeFromNewsletter = async (email: string): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/public/newsletter/unsubscribe', { email });
  return response.data;
};

// ─────────────────────────────────────────────
// Loyalty
// ─────────────────────────────────────────────

export interface LoyaltyBalance {
  balance: number;
  program: {
    enabled: boolean;
    program_name: string;
    redemption_threshold: number;
    points_to_dollar_rate: number;
    min_discount: number;
  };
}

export interface LoyaltyValidationResult {
  valid: boolean;
  discount_amount?: number;
  new_balance?: number;
  message?: string;
}

export const getLoyaltyBalance = async (): Promise<LoyaltyBalance> => {
  const response = await apiClient.get<ApiResponse<LoyaltyBalance>>('/public/loyalty/balance');
  return response.data.data;
};

export const validateLoyaltyRedemption = async (points: number): Promise<LoyaltyValidationResult> => {
  const response = await apiClient.post<ApiResponse<LoyaltyValidationResult>>(
    '/public/loyalty/validate-redemption',
    { points }
  );
  return response.data.data;
};
