/**
 * Coupon API Service
 * Handles coupon code validation against the backend
 */

import apiClient from '@/lib/apiClient';

export interface CouponValidationResult {
  valid: boolean;
  discount: number;
  message: string;
  coupon?: {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
  };
}

/**
 * Validate a coupon code against the current cart subtotal
 */
export const validateCoupon = async (code: string, cartSubtotal: number): Promise<CouponValidationResult> => {
  const response = await apiClient.post<CouponValidationResult>('/public/coupons/validate', {
    code,
    cart_subtotal: cartSubtotal,
  });
  return response.data;
};
