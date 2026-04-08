/**
 * Design System Entry Point
 * 
 * Centralized export of all design tokens and component variants.
 * Import from this file to access the entire design system.
 */

// Design Tokens
export { colors, withOpacity, opacity } from './tokens/colors';
export { typography, responsiveTypography } from './tokens/typography';
export {
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
  semanticShadows,
  transitions,
  semanticTransitions,
  zIndex,
  breakpoints,
  containerWidth,
} from './tokens';

// Component Variants
export {
  buttonVariants,
  buttonSizes,
  buttonIcons,
  softButtonVariant,
  sharpButtonVariant,
  elegantButtonVariant,
  type ButtonVariant,
  type ButtonSize,
} from './components/button.variants';

export {
  productCardVariants,
  cardElevations,
  cardImageRatios,
  productImageStyles,
  productContentStyles,
  addToCartStyles,
  categoryCardVariants,
  featuredCardVariants,
  type CardElevation,
  type CardImageRatio,
} from './components/card.variants';

// Re-export types
export type {
  ColorScale,
  ColorTokens,
} from './tokens/colors';

export type {
  TypographyScale,
  TypographyTokens,
} from './tokens/typography';

/**
 * Usage Examples:
 * 
 * // Import everything
 * import * as DS from '@/design-system';
 * 
 * // Import specific tokens
 * import { colors, spacing, shadows } from '@/design-system';
 * 
 * // Import component variants
 * import { buttonVariants, productCardVariants } from '@/design-system';
 * 
 * // Use in components
 * <button style={{
 *   ...DS.buttonVariants.primary.default,
 *   ...DS.buttonSizes.md,
 * }}>
 *   Click me
 * </button>
 * 
 * <div style={{
 *   ...DS.productCardVariants.default.default,
 *   padding: DS.spacing[4],
 *   borderRadius: DS.borderRadius.lg,
 * }}>
 *   Product card content
 * </div>
 */
