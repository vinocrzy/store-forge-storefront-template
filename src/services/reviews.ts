/**
 * Product Reviews API Service
 * Handles fetching and submitting product reviews
 */

import apiClient from '@/lib/apiClient';

export interface Review {
  id: number;
  rating: number;
  title: string | null;
  body: string;
  is_verified_purchase: boolean;
  customer_name: string;
  admin_response: string | null;
  admin_responded_at: string | null;
  created_at: string;
}

export interface ReviewSummary {
  avg_rating: number | null;
  review_count: number;
  distribution: Record<number, number>;
}

export interface ReviewsResponse {
  data: Review[];
  summary: ReviewSummary;
  meta: { current_page: number; per_page: number; total: number; last_page: number };
}

/**
 * Fetch paginated reviews for a product by slug
 */
export const getProductReviews = async (slug: string, page = 1): Promise<ReviewsResponse> => {
  const response = await apiClient.get(`/public/products/${slug}/reviews?page=${page}&per_page=5`);
  return response.data;
};

/**
 * Submit a review for a product (requires authentication)
 */
export const submitReview = async (slug: string, data: { rating: number; title?: string; body: string }): Promise<any> => {
  const response = await apiClient.post(`/public/products/${slug}/reviews`, data);
  return response.data;
};
