/**
 * Cart API Service
 * Handles shopping cart operations for guest and authenticated customers
 */

import apiClient, { type ApiResponse, getErrorMessage } from '@/lib/apiClient';

// Cart API Types (matches backend responses)
export interface ApiCart {
  id: number;
  token: string;
  customer_id: number | null;
  store_id: number;
  items: ApiCartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiCartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id: number | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  // Product snapshot data
  product_name: string;
  product_slug: string;
  product_image: string | null;
  product_sku: string;
}

export interface AddToCartRequest {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

/**
 * Create a new guest cart
 * Returns cart token for persistence
 */
export const createCart = async (): Promise<{ token: string; cart: ApiCart }> => {
  try {
    const response = await apiClient.post<ApiResponse<{ token: string; cart: ApiCart }>>('/public/cart');
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get cart by token (for guest carts)
 */
export const getCart = async (token: string): Promise<ApiCart> => {
  try {
    const response = await apiClient.get<ApiResponse<ApiCart>>(`/public/cart/${token}`);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get authenticated customer's cart
 */
export const getCustomerCart = async (): Promise<ApiCart> => {
  try {
    const response = await apiClient.get<ApiResponse<ApiCart>>('/public/cart');
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Add item to cart
 * Creates cart if token not provided (guest)
 */
export const addItem = async (
  data: AddToCartRequest,
  token?: string
): Promise<ApiCart> => {
  try {
    const url = token ? `/public/cart/${token}/items` : '/public/cart/items';
    const response = await apiClient.post<ApiResponse<ApiCart>>(url, data);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Update cart item quantity
 */
export const updateItem = async (
  token: string,
  itemId: number,
  data: UpdateCartItemRequest
): Promise<ApiCart> => {
  try {
    const response = await apiClient.patch<ApiResponse<ApiCart>>(
      `/public/cart/${token}/items/${itemId}`,
      data
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Remove item from cart
 */
export const removeItem = async (token: string, itemId: number): Promise<ApiCart> => {
  try {
    const response = await apiClient.delete<ApiResponse<ApiCart>>(
      `/public/cart/${token}/items/${itemId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Clear entire cart
 */
export const clearCart = async (token: string): Promise<void> => {
  try {
    await apiClient.delete(`/public/cart/${token}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
