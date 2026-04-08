/**
 * Default Theme Configuration
 * This serves as the fallback theme when store-specific theme is not available
 */

import type { ThemeConfig } from '@/types/theme';

export const defaultTheme: ThemeConfig = {
  colors: {
    // Primary brand colors
    primary: '#3b82f6', // Blue-500
    primaryHover: '#2563eb', // Blue-600
    secondary: '#8b5cf6', // Violet-500
    secondaryHover: '#7c3aed', // Violet-600
    accent: '#f59e0b', // Amber-500

    // Base colors
    background: '#ffffff',
    foreground: '#0f172a', // Slate-900
    muted: '#f1f5f9', // Slate-100
    mutedForeground: '#64748b', // Slate-500

    // UI colors
    border: '#e2e8f0', // Slate-200
    input: '#e2e8f0',
    ring: '#3b82f6',

    // Status colors
    success: '#10b981', // Green-500
    warning: '#f59e0b', // Amber-500
    error: '#ef4444', // Red-500
    info: '#3b82f6', // Blue-500
  },

  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  logo: {
    url: null,
    altText: 'Store Logo',
    width: 150,
    height: 50,
  },

  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem',   // 8px
    xl: '0.75rem',  // 12px
    full: '9999px',
  },

  spacing: {
    xs: '0.5rem',  // 8px
    sm: '1rem',    // 16px
    md: '1.5rem',  // 24px
    lg: '2rem',    // 32px
    xl: '3rem',    // 48px
  },
};

/**
 * Convert theme config to CSS variables
 */
export const themeToCSSVariables = (theme: ThemeConfig): Record<string, string> => {
  return {
    // Colors
    '--color-primary': theme.colors.primary,
    '--color-primary-hover': theme.colors.primaryHover,
    '--color-secondary': theme.colors.secondary,
    '--color-secondary-hover': theme.colors.secondaryHover,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-foreground': theme.colors.foreground,
    '--color-muted': theme.colors.muted,
    '--color-muted-foreground': theme.colors.mutedForeground,
    '--color-border': theme.colors.border,
    '--color-input': theme.colors.input,
    '--color-ring': theme.colors.ring,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--color-info': theme.colors.info,

    // Typography
    '--font-family-sans': theme.typography.fontFamily.sans,
    '--font-family-serif': theme.typography.fontFamily.serif,
    '--font-family-mono': theme.typography.fontFamily.mono,
    
    // Border Radius
    '--radius-sm': theme.borderRadius.sm,
    '--radius-md': theme.borderRadius.md,
    '--radius-lg': theme.borderRadius.lg,
    '--radius-xl': theme.borderRadius.xl,
    '--radius-full': theme.borderRadius.full,

    // Spacing
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,
  };
};
