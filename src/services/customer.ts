/**
 * Customer API Service
 * Handles customer authentication and account management
 */

import apiClient, { type ApiResponse, getErrorMessage } from '@/lib/apiClient';
import type { Customer, Order } from '@/types';

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  phone: string; // E.164 format: +12025551234
  email?: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  login: string; // Phone (primary) or email
  password: string;
}

export interface AuthResponse {
  token: string;
  customer: Customer;
}

/**
 * Register new customer account
 * Phone number MUST be in E.164 format (+12025551234)
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/public/customer/register',
      data
    );

    // Store auth token
    if (typeof window !== 'undefined' && response.data.data.token) {
      localStorage.setItem('customer_token', response.data.data.token);
    }

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Login with phone (primary) or email
 * Phone must be in E.164 format (+12025551234)
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/public/customer/login',
      data
    );

    // Store auth token
    if (typeof window !== 'undefined' && response.data.data.token) {
      localStorage.setItem('customer_token', response.data.data.token);
    }

    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Logout current customer
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/public/customer/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customer_token');
    }
  } catch (error) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customer_token');
    }
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get authenticated customer profile
 */
export const getProfile = async (): Promise<Customer> => {
  try {
    const response = await apiClient.get<ApiResponse<Customer>>('/public/customer/profile');
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get customer order history
 */
export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Order[]>>('/public/customer/orders');
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Get single order details
 */
export const getOrderDetail = async (orderId: number): Promise<Order> => {
  try {
    const response = await apiClient.get<ApiResponse<Order>>(`/public/customer/orders/${orderId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Check if customer is authenticated
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('customer_token');
  return !!token;
};

/**
 * Get stored auth token
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('customer_token');
};
