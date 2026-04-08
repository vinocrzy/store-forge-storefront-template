/**
 * Products API Service
 * Handles product-related API calls
 */

import apiClient, { type ApiResponse, type PaginatedResponse } from '@/lib/apiClient';
import type { Product, ProductFilters, Category } from '@/types';

/**
 * Get list of products with filters and pagination
 */
export const getProducts = async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
  const params = new URLSearchParams();
  
  if (filters?.category_id) params.append('category_id', filters.category_id.toString());
  if (filters?.search) params.append('search', filters.search);
  if (filters?.min_price) params.append('min_price', filters.min_price.toString());
  if (filters?.max_price) params.append('max_price', filters.max_price.toString());
  if (filters?.is_featured !== undefined) params.append('is_featured', filters.is_featured ? '1' : '0');
  if (filters?.sort_by) params.append('sort_by', filters.sort_by);
  if (filters?.sort_order) params.append('sort_order', filters.sort_order);
  if (filters?.page) params.append('page', filters.page.toString());
  if (filters?.per_page) params.append('per_page', filters.per_page.toString());
  
  const response = await apiClient.get<PaginatedResponse<Product>>(`/products?${params.toString()}`);
  return response.data;
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limit: number = 10): Promise<Product[]> => {
  const response = await getProducts({
    is_featured: true,
    per_page: limit,
    sort_by: 'created_at',
    sort_order: 'desc',
  });
  return response.data;
};

/**
 * Get single product by slug
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await apiClient.get<ApiResponse<Product>>(`/products/${slug}`);
  return response.data.data;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
  return response.data.data;
};

/**
 * Get related products (products in same category)
 */
export const getRelatedProducts = async (productId: number, limit: number = 4): Promise<Product[]> => {
  const response = await apiClient.get<PaginatedResponse<Product>>(`/products/${productId}/related?per_page=${limit}`);
  return response.data.data;
};

/**
 * Search products
 */
export const searchProducts = async (query: string, page: number = 1, perPage: number = 20): Promise<PaginatedResponse<Product>> => {
  return getProducts({
    search: query,
    page,
    per_page: perPage,
  });
};

/**
 * Get all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
  return response.data.data;
};

/**
 * Get category by slug with products
 */
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
  return response.data.data;
};

/**
 * Get products by category
 */
export const getProductsByCategory = async (
  categoryId: number,
  filters?: Omit<ProductFilters, 'category_id'>
): Promise<PaginatedResponse<Product>> => {
  return getProducts({ ...filters, category_id: categoryId });
};
