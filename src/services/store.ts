/**
 * Store API Service
 * Handles store configuration and theme retrieval
 */

import apiClient, { type ApiResponse } from '@/lib/apiClient';
import type { Store } from '@/types';
import type { StoreTheme, ThemeConfig } from '@/types/theme';
import { defaultTheme } from '@/config/theme.config';

/**
 * Get store information including theme
 */
export const getStore = async (storeId?: string): Promise<Store> => {
  const id = storeId || process.env.NEXT_PUBLIC_STORE_ID || '1';
  const response = await apiClient.get<ApiResponse<Store>>(`/stores/${id}`);
  return response.data.data;
};

/**
 * Get store theme configuration
 * Returns theme from backend or falls back to default theme
 */
export const getStoreTheme = async (storeId?: string): Promise<StoreTheme> => {
  try {
    const store = await getStore(storeId);
    
    // Parse theme from store settings
    const themeConfig: ThemeConfig = {
      colors: store.settings.theme?.colors || defaultTheme.colors,
      typography: store.settings.theme?.typography || defaultTheme.typography,
      logo: {
        url: store.logo_url || null,
        altText: `${store.name} Logo`,
        width: store.settings.theme?.logo?.width || defaultTheme.logo.width,
        height: store.settings.theme?.logo?.height || defaultTheme.logo.height,
      },
      borderRadius: store.settings.theme?.borderRadius || defaultTheme.borderRadius,
      spacing: store.settings.theme?.spacing || defaultTheme.spacing,
    };

    return {
      id: store.id,
      storeName: store.name,
      domain: store.domain,
      theme: themeConfig,
    };
  } catch (error) {
    console.warn('Failed to fetch store theme, using default:', error);
    
    // Fallback to default theme
    return {
      id: parseInt(process.env.NEXT_PUBLIC_STORE_ID || '1'),
      storeName: process.env.NEXT_PUBLIC_STORE_NAME || 'Store',
      domain: process.env.NEXT_PUBLIC_STORE_DOMAIN || null,
      theme: defaultTheme,
    };
  }
};

/**
 * Get store settings
 */
export const getStoreSettings = async (storeId?: string): Promise<Store['settings']> => {
  const store = await getStore(storeId);
  return store.settings;
};

/**
 * Get store contact information
 */
export const getStoreContact = async (storeId?: string) => {
  const store = await getStore(storeId);
  return {
    email: store.settings.contact?.email || null,
    phone: store.settings.contact?.phone || null,
    address: store.settings.contact?.address || null,
  };
};

/**
 * Get store social media links
 */
export const getStoreSocial = async (storeId?: string) => {
  const store = await getStore(storeId);
  return {
    facebook: store.settings.social?.facebook || null,
    instagram: store.settings.social?.instagram || null,
    twitter: store.settings.social?.twitter || null,
  };
};
