/**
 * Design System - Button Component Variants
 * 
 * Brand-specific button styles using design tokens.
 * Customize these variants to match your brand personality.
 */

import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing, borderRadius, shadows, semanticTransitions } from '../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button Base Styles
 */
const buttonBase = {
  fontFamily: typography.fontFamily.body,
  fontWeight: typography.fontWeight.semibold,
  lineHeight: '1',
  textAlign: 'center' as const,
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing[2],
  transition: semanticTransitions.button,
  
  // Interactive states
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  
  '&:focus-visible': {
    outline: `2px solid ${colors.primary[500]}`,
    outlineOffset: '2px',
  },
};

/**
 * Button Size Variants
 */
export const buttonSizes = {
  sm: {
    fontSize: typography.fontSize.sm,
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: borderRadius.md,
    minHeight: '36px',
  },
  md: {
    fontSize: typography.fontSize.base,
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: borderRadius.lg,
    minHeight: '44px',  // Minimum touch target
  },
  lg: {
    fontSize: typography.fontSize.lg,
    padding: `${spacing[4]} ${spacing[8]}`,
    borderRadius: borderRadius.xl,
    minHeight: '52px',
  },
};

/**
 * Button Style Variants
 * 
 * Customize these to match your brand personality:
 * - Soft/rounded: Use borderRadius.full for pill-shaped buttons
 * - Sharp/modern: Use borderRadius.sm or borderRadius.DEFAULT
 * - Elevated: Add shadows.md to default state
 * - Flat: Remove shadows entirely
 */
export const buttonVariants = {
  /**
   * PRIMARY BUTTON
   * Main call-to-action button
   */
  primary: {
    default: {
      ...buttonBase,
      backgroundColor: colors.primary[500],
      color: colors.text.inverse,
      boxShadow: shadows.sm,
    },
    hover: {
      backgroundColor: colors.primary[600],
      boxShadow: shadows.md,
      transform: 'translateY(-1px)',
    },
    active: {
      backgroundColor: colors.primary[700],
      boxShadow: shadows.sm,
      transform: 'translateY(0)',
    },
  },
  
  /**
   * SECONDARY BUTTON
   * Secondary actions
   */
  secondary: {
    default: {
      ...buttonBase,
      backgroundColor: colors.secondary[500],
      color: colors.text.inverse,
      boxShadow: shadows.sm,
    },
    hover: {
      backgroundColor: colors.secondary[600],
      boxShadow: shadows.md,
      transform: 'translateY(-1px)',
    },
    active: {
      backgroundColor: colors.secondary[700],
      boxShadow: shadows.sm,
      transform: 'translateY(0)',
    },
  },
  
  /**
   * OUTLINE BUTTON
   * Less prominent actions
   */
  outline: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: `2px solid ${colors.primary[500]}`,
      boxShadow: 'none',
    },
    hover: {
      backgroundColor: colors.primary[50],
      borderColor: colors.primary[600],
    },
    active: {
      backgroundColor: colors.primary[100],
    },
  },
  
  /**
   * GHOST BUTTON
   * Subtle, minimalist actions
   */
  ghost: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: colors.text.primary,
      boxShadow: 'none',
    },
    hover: {
      backgroundColor: colors.gray[100],
    },
    active: {
      backgroundColor: colors.gray[200],
    },
  },
  
  /**
   * LINK BUTTON
   * Text-only, link-style button
   */
  link: {
    default: {
      ...buttonBase,
      backgroundColor: 'transparent',
      color: colors.text.link,
      boxShadow: 'none',
      padding: '0',
    },
    hover: {
      color: colors.text.linkHover,
      textDecoration: 'underline',
    },
    active: {
      color: colors.primary[700],
    },
  },
};

/**
 * Button Icon Styles
 */
export const buttonIcons = {
  sm: {
    width: '16px',
    height: '16px',
  },
  md: {
    width: '20px',
    height: '20px',
  },
  lg: {
    width: '24px',
    height: '24px',
  },
};

/**
 * Brand-Specific Button Customizations
 * 
 * Examples of how to customize buttons per brand personality:
 */

/**
 * SOFT & ORGANIC BRAND (e.g., Honey Bee)
 * Rounded corners, gentle shadows, warm feel
 */
export const softButtonVariant = {
  primary: {
    ...buttonVariants.primary.default,
    borderRadius: borderRadius.full,  // Pill-shaped
    boxShadow: shadows.md,
  },
};

/**
 * SHARP & MODERN BRAND (e.g., Tech Store)
 * Sharp corners, bold shadows, clean
 */
export const sharpButtonVariant = {
  primary: {
    ...buttonVariants.primary.default,
    borderRadius: borderRadius.sm,  // Minimal rounding
    boxShadow: shadows.lg,
  },
};

/**
 * ELEGANT & LUXURY BRAND (e.g., Fashion Store)
 * Subtle, minimal, refined
 */
export const elegantButtonVariant = {
  primary: {
    ...buttonVariants.primary.default,
    borderRadius: borderRadius.DEFAULT,
    boxShadow: 'none',
    border: `1px solid ${colors.gray[900]}`,
    backgroundColor: colors.gray[900],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
};

/**
 * Usage Example:
 * 
 * import { buttonVariants, buttonSizes } from '@/design-system/components/button.variants';
 * 
 * <button style={{
 *   ...buttonVariants.primary.default,
 *   ...buttonSizes.md,
 * }}>
 *   Add to Cart
 * </button>
 * 
 * // Or with hover (in styled-components)
 * const Button = styled.button<{ variant: ButtonVariant; size: ButtonSize }>`
 *   ${(props) => buttonVariants[props.variant].default}
 *   ${(props) => buttonSizes[props.size]}
 *   
 *   &:hover {
 *     ${(props) => buttonVariants[props.variant].hover}
 *   }
 *   
 *   &:active {
 *     ${(props) => buttonVariants[props.variant].active}
 *   }
 * `;
 */
