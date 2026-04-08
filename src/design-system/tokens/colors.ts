/**
 * Design System - Color Tokens
 * 
 * Centralized color definitions with semantic meanings.
 * Import these tokens in components for consistent theming.
 */

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

export interface ColorTokens {
  // Brand Colors
  primary: ColorScale;
  secondary: ColorScale;
  accent?: ColorScale;
  
  // Neutral Colors
  gray: ColorScale;
  
  // Semantic Colors
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  
  // Special Purpose
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    link: string;
    linkHover: string;
  };
  
  border: {
    default: string;
    hover: string;
    focus: string;
    error: string;
  };
}

/**
 * COLOR TOKENS
 * 
 * Replace these with your brand colors from .brand/color-palette.md
 */
export const colors: ColorTokens = {
  // Primary Brand Color (Replace with your colors)
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316',  // Main brand color
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
    950: '#431407',
  },
  
  // Secondary Brand Color
  secondary: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',  // Main secondary color
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  
  // Neutral Gray Scale
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  
  // Semantic Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F5F5F5',
    inverse: '#171717',
  },
  
  // Text Colors
  text: {
    primary: '#171717',
    secondary: '#525252',
    tertiary: '#737373',
    inverse: '#FFFFFF',
    link: '#3B82F6',
    linkHover: '#2563EB',
  },
  
  // Border Colors
  border: {
    default: '#E5E5E5',
    hover: '#D4D4D4',
    focus: '#F97316',  // Use primary color
    error: '#EF4444',
  },
};

/**
 * Color Utility Functions
 */

/** Get color with opacity */
export const withOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

/** Common opacity values */
export const opacity = {
  disabled: 0.38,
  inactive: 0.54,
  active: 0.87,
  hover: 0.08,
  focus: 0.12,
  selected: 0.16,
  backdrop: 0.5,
};

/**
 * Usage Examples:
 * 
 * import { colors, withOpacity, opacity } from '@/design-system/tokens/colors';
 * 
 * // Use in components
 * <button style={{ backgroundColor: colors.primary[500] }}>
 *   Click me
 * </button>
 * 
 * // Use with opacity
 * <div style={{ backgroundColor: withOpacity(colors.primary[500], opacity.hover) }}>
 *   Hover background
 * </div>
 */
