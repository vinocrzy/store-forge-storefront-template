/**
 * Checkout API Service
 * Handles order placement for guest and authenticated customers
 */

import apiClient, { type ApiResponse, getErrorMessage } from '@/lib/apiClient';
import type { Order } from '@/types';

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  company?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string; // E.164 format
}

export interface GuestCheckoutRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string; // E.164 format: +12025551234
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  notes?: string;
  cart_token: string;
}

export interface AuthenticatedCheckoutRequest {
  shipping_address: ShippingAddress;
  billing_address?: ShippingAddress;
  notes?: string;
}

export interface CheckoutResponse {
  order: Order;
  message?: string;
}

/**
 * Guest checkout (no account required)
 * Phone must be in E.164 format (+12025551234)
 */
export const guestCheckout = async (data: GuestCheckoutRequest): Promise<CheckoutResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<CheckoutResponse>>(
      '/public/checkout',
      {
        cart_token: data.cart_token,
        payment_method: 'pending', // Manual payment
        email: data.customer_email,
        first_name: data.shipping_address.first_name,
        last_name: data.shipping_address.last_name,
        phone: data.customer_phone,
        note: data.notes,
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Authenticated checkout (logged in customer)
 */
export const authenticatedCheckout = async (
  data: AuthenticatedCheckoutRequest
): Promise<CheckoutResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<CheckoutResponse>>(
      '/public/checkout',
      data
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Validate phone number format (E.164)
 * Returns true if valid, false otherwise
 */
export const isValidE164Phone = (phone: string): boolean => {
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
};

/**
 * Format phone number to E.164
 * If already E.164, returns as-is
 */
export const formatPhoneToE164 = (phone: string, countryCode: string = '1'): string => {
  const digits = phone.replace(/\D/g, '');

  if (phone.startsWith('+')) {
    return phone;
  }

  if (digits.length === 10) {
    return `+${countryCode}${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return `+${digits}`;
};
