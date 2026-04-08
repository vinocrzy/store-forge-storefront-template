/**
 * Design System - Typography Tokens
 * 
 * Centralized typography definitions including font families,
 * type scale, weights, line heights, and letter spacing.
 */

export interface TypographyScale {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: number;
}

export interface TypographyTokens {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
    accent?: string;
  };
  
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  
  lineHeight: {
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
  };
  
  // Predefined text styles
  heading: {
    h1: TypographyScale;
    h2: TypographyScale;
    h3: TypographyScale;
    h4: TypographyScale;
  };
  
  body: {
    large: TypographyScale;
    base: TypographyScale;
    small: TypographyScale;
    xs: TypographyScale;
  };
}

/**
 * TYPOGRAPHY TOKENS
 * 
 * Replace these with your brand typography from .brand/typography.md
 */
export const typography: TypographyTokens = {
  // Font Families
  fontFamily: {
    heading: '"Inter", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    // accent: '"Your Accent Font", cursive', // Optional
  },
  
  // Font Sizes (Modular scale: 1.250 - Major Third)
  fontSize: {
    xs: '0.64rem',     // 10.24px
    sm: '0.8rem',      // 12.8px
    base: '1rem',      // 16px (base)
    lg: '1.25rem',     // 20px
    xl: '1.563rem',    // 25px
    '2xl': '1.953rem', // 31.25px
    '3xl': '2.441rem', // 39px
    '4xl': '3.052rem', // 48.83px
    '5xl': '3.815rem', // 61px
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights
  lineHeight: {
    tight: '1.2',
    snug: '1.4',
    normal: '1.6',
    relaxed: '1.75',
    loose: '2',
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
  
  // Heading Styles
  heading: {
    h1: {
      fontSize: '3.052rem',      // 4xl
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.441rem',      // 3xl
      lineHeight: '1.3',
      letterSpacing: '-0.01em',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.953rem',      // 2xl
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.563rem',      // xl
      lineHeight: '1.5',
      letterSpacing: '0',
      fontWeight: 600,
    },
  },
  
  // Body Text Styles
  body: {
    large: {
      fontSize: '1.25rem',       // lg
      lineHeight: '1.6',
      letterSpacing: '0',
      fontWeight: 400,
    },
    base: {
      fontSize: '1rem',          // base
      lineHeight: '1.6',
      letterSpacing: '0',
      fontWeight: 400,
    },
    small: {
      fontSize: '0.875rem',      // sm
      lineHeight: '1.5',
      letterSpacing: '0',
      fontWeight: 400,
    },
    xs: {
      fontSize: '0.75rem',       // xs
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: 400,
    },
  },
};

/**
 * Responsive Typography Helpers
 */
export const responsiveTypography = {
  // Fluid font sizes using clamp()
  h1: 'clamp(2rem, 5vw + 1rem, 3.052rem)',
  h2: 'clamp(1.5rem, 4vw + 1rem, 2.441rem)',
  h3: 'clamp(1.25rem, 3vw + 1rem, 1.953rem)',
  h4: 'clamp(1.125rem, 2.5vw + 1rem, 1.563rem)',
  body: 'clamp(0.875rem, 1.5vw, 1rem)',
};

/**
 * Usage Examples:
 * 
 * import { typography, responsiveTypography } from '@/design-system/tokens/typography';
 * 
 * // Use in components
 * <h1 style={{ 
 *   fontFamily: typography.fontFamily.heading,
 *   fontSize: typography.heading.h1.fontSize,
 *   lineHeight: typography.heading.h1.lineHeight,
 *   fontWeight: typography.heading.h1.fontWeight,
 * }}>
 *   Page Title
 * </h1>
 * 
 * // Use responsive typography
 * <h1 style={{ fontSize: responsiveTypography.h1 }}>
 *   Fluid Title
 * </h1>
 * 
 * // Use in CSS
 * h1 {
 *   font-family: var(--font-heading);
 *   font-size: var(--font-size-4xl);
 *   font-weight: var(--font-weight-bold);
 *   line-height: var(--line-height-tight);
 * }
 */
