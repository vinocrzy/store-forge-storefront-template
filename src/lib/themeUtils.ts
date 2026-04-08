/**
 * Theme Utilities
 * Helper functions for working with theme in components
 */

import { type ThemeColors } from '@/types/theme';

/**
 * Get CSS variable reference for a theme color
 * Usage: style={{ backgroundColor: getThemeColor('primary') }}
 */
export const getThemeColor = (colorName: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    accent: 'var(--color-accent)',
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    muted: 'var(--color-muted)',
    mutedForeground: 'var(--color-muted-foreground)',
    border: 'var(--color-border)',
    input: 'var(--color-input)',
    ring: 'var(--color-ring)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
  };

  return colorMap[colorName];
};

/**
 * Get Tailwind classes for button variants based on theme
 */
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary'): string => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-primary hover:bg-muted focus:ring-primary',
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};

/**
 * Get Tailwind classes for button sizes
 */
export const getButtonSizeClasses = (size: 'sm' | 'md' | 'lg' = 'md'): string => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return sizeClasses[size];
};

/**
 * Get Tailwind classes for status badges
 */
export const getStatusBadgeClasses = (status: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default'): string => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const statusClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-muted text-muted-foreground',
  };

  return `${baseClasses} ${statusClasses[status]}`;
};

/**
 * Convert hex color to RGB values for Tailwind
 */
export const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `${r}, ${g}, ${b}`;
};

/**
 * Lighten a hex color by a percentage
 */
export const lightenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
};

/**
 * Darken a hex color by a percentage
 */
export const darkenColor = (hex: string, percent: number): string => {
  return lightenColor(hex, -percent);
};
