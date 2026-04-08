/**
 * Theme Provider
 * Provides theme context to the entire application
 */

'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { StoreTheme, ThemeConfig } from '@/types/theme';
import { defaultTheme, themeToCSSVariables } from '@/config/theme.config';
import { getStoreTheme } from '@/services/store';

interface ThemeContextType {
  theme: ThemeConfig;
  storeTheme: StoreTheme | null;
  isLoading: boolean;
  error: Error | null;
  refreshTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: StoreTheme;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [storeTheme, setStoreTheme] = useState<StoreTheme | null>(initialTheme || null);
  const [isLoading, setIsLoading] = useState(!initialTheme);
  const [error, setError] = useState<Error | null>(null);

  const loadTheme = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const theme = await getStoreTheme();
      setStoreTheme(theme);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load theme'));
      // Fallback to default theme
      setStoreTheme({
        id: parseInt(process.env.NEXT_PUBLIC_STORE_ID || '1'),
        storeName: process.env.NEXT_PUBLIC_STORE_NAME || 'Store',
        domain: process.env.NEXT_PUBLIC_STORE_DOMAIN || null,
        theme: defaultTheme,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load theme on mount if not provided
  useEffect(() => {
    if (!initialTheme) {
      loadTheme();
    }
  }, [initialTheme]);

  // Apply theme CSS variables to document root
  useEffect(() => {
    if (storeTheme) {
      const cssVars = themeToCSSVariables(storeTheme.theme);
      const root = document.documentElement;

      Object.entries(cssVars).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    }
  }, [storeTheme]);

  const refreshTheme = async () => {
    await loadTheme();
  };

  const value: ThemeContextType = {
    theme: storeTheme?.theme || defaultTheme,
    storeTheme,
    isLoading,
    error,
    refreshTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get theme colors
 */
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

/**
 * Hook to get theme typography
 */
export function useThemeTypography() {
  const { theme } = useTheme();
  return theme.typography;
}

/**
 * Hook to get store logo
 */
export function useStoreLogo() {
  const { theme } = useTheme();
  return theme.logo;
}
