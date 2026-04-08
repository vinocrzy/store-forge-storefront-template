/**
 * Design System - Spacing, Shadows, and Transition Tokens
 * 
 * Centralized definitions for spacing scale, elevation shadows,
 * border radius, and animation timings.
 */

/**
 * SPACING TOKENS (4px base unit)
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px - base unit
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

/**
 * SEMANTIC SPACING
 * Pre-defined spacing for common use cases
 */
export const semanticSpacing = {
  containerPadding: {
    mobile: spacing[4],      // 16px
    tablet: spacing[8],      // 32px
    desktop: spacing[12],    // 48px
  },
  sectionGap: {
    small: spacing[8],       // 32px
    medium: spacing[16],     // 64px
    large: spacing[24],      // 96px
  },
  componentGap: {
    xs: spacing[1],          // 4px
    sm: spacing[2],          // 8px
    md: spacing[4],          // 16px
    lg: spacing[6],          // 24px
    xl: spacing[8],          // 32px
  },
};

/**
 * BORDER RADIUS TOKENS
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',    // Pill/circle
} as const;

/**
 * SHADOW TOKENS (Elevation system)
 */
export const shadows = {
  none: 'none',
  
  // Elevation levels
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Special shadows
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)', // Focus outline
} as const;

/**
 * SEMANTIC SHADOWS
 * Component-specific shadow presets
 */
export const semanticShadows = {
  card: shadows.md,
  cardHover: shadows.lg,
  button: shadows.sm,
  buttonHover: shadows.md,
  modal: shadows['2xl'],
  dropdown: shadows.lg,
  navbar: shadows.sm,
  tooltip: shadows.md,
};

/**
 * TRANSITION TOKENS
 */
export const transitions = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '200ms',
    medium: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  // Timing functions (easing)
  timing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy
  },
  
  // Common transition properties
  property: {
    all: 'all',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    transform: 'transform',
    shadow: 'box-shadow',
  },
} as const;

/**
 * SEMANTIC TRANSITIONS
 * Pre-built transition combinations
 */
export const semanticTransitions = {
  // Quick micro-interactions
  fast: `${transitions.duration.fast} ${transitions.timing.easeInOut}`,
  
  // Default smooth transitions
  base: `${transitions.duration.base} ${transitions.timing.easeOut}`,
  
  // Smooth entrances/exits
  medium: `${transitions.duration.medium} ${transitions.timing.easeOut}`,
  
  // Slow dramatic effects
  slow: `${transitions.duration.slow} ${transitions.timing.easeInOut}`,
  
  // Component-specific
  button: `all ${transitions.duration.fast} ${transitions.timing.easeInOut}`,
  modal: `all ${transitions.duration.medium} ${transitions.timing.easeOut}`,
  dropdown: `all ${transitions.duration.base} ${transitions.timing.easeOut}`,
  fade: `opacity ${transitions.duration.base} ${transitions.timing.easeInOut}`,
  slideUp: `transform ${transitions.duration.medium} ${transitions.timing.easeOut}`,
};

/**
 * Z-INDEX SCALE
 */
export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  
  // Semantic z-index
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
} as const;

/**
 * BREAKPOINTS
 */
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Laptop
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
} as const;

/**
 * CONTAINER WIDTHS
 */
export const containerWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

/**
 * Usage Examples:
 * 
 * import { spacing, shadows, transitions, borderRadius } from '@/design-system/tokens';
 * 
 * // Use in components
 * <div style={{
 *   padding: spacing[4],
 *   borderRadius: borderRadius.lg,
 *   boxShadow: shadows.md,
 *   transition: semanticTransitions.button,
 * }}>
 *   Content
 * </div>
 * 
 * // Use in styled components
 * const Card = styled.div`
 *   padding: ${spacing[6]};
 *   border-radius: ${borderRadius.xl};
 *   box-shadow: ${semanticShadows.card};
 *   transition: ${semanticTransitions.base};
 *   
 *   &:hover {
 *     box-shadow: ${semanticShadows.cardHover};
 *     transform: translateY(-2px);
 *   }
 * `;
 */
