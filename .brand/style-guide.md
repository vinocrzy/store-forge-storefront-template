# Visual Style Guide

> **Purpose**: Comprehensive visual guidelines for maintaining brand consistency across all touchpoints.

## Brand Overview

**Brand Name**: [STORE_NAME]  
**Industry**: [E-commerce category]  
**Style Keywords**: [3-5 adjectives describing visual style]

## Logo Guidelines

### Logo Variants

**Primary Logo**:
- File: `/public/images/logo-primary.svg`
- Usage: Main header, email signatures, promotional materials
- Minimum size: 120px width
- Clear space: Minimum padding equal to height of logo

**Secondary Logo** (if applicable):
- File: `/public/images/logo-secondary.svg`
- Usage: Tight spaces, social media avatars
- Minimum size: 40px x 40px

**Logo on Dark**:
- File: `/public/images/logo-light.svg`
- Usage: Dark backgrounds, footer

### Logo Usage Rules

✅ **DO**:
- Maintain aspect ratio
- Use provided file formats (SVG preferred)
- Ensure adequate clear space
- Place on appropriate backgrounds

❌ **DON'T**:
- Stretch or distort
- Change colors (unless approved variants)
- Add effects (drop shadows, gradients, outlines)
- Place on busy backgrounds
- Rotate or skew

## Color Usage

See [color-palette.md](./color-palette.md) for complete palette.

### Primary Applications

**Hero Sections**:
- Background: [Color + rationale]
- Text: [Color + contrast ratio]
- CTA: [Color + hover state]

**Product Cards**:
- Card background: [Color]
- Border: [Color, if applicable]
- Product name: [Color]
- Price: [Color]
- "Add to cart" button: [Color scheme]

**Navigation**:
- Background: [Color]
- Text: [Color]
- Active/hover: [Color]

**Footer**:
- Background: [Color]
- Text: [Color]
- Links: [Color + hover]

### Color Dos and Don'ts

✅ **DO**:
- Use primary color for CTAs and brand moments (10% of design)
- Use neutrals for majority of design (60-70%)
- Ensure all text passes WCAG AA contrast (4.5:1)

❌ **DON'T**:
- Use primary color as background for large areas
- Mix warm and cool neutrals inconsistently
- Use color alone to convey information

## Typography Applications

See [typography.md](./typography.md) for complete type system.

### Heading Hierarchy

**Page Title (H1)**:
- One per page
- [Font], [Size], [Weight], [Color]
- Example: "Our Products"

**Section Heading (H2)**:
- [Font], [Size], [Weight], [Color]
- Example: "Featured Collection"

**Product Name**:
- [Font], [Size], [Weight], [Color]
- Example: "Lavender Honey Soap"

### Body Text

**Product Description**:
- [Font], [Size], [Line-height], [Color]
- Max width: 65ch (characters) for readability

**Small Text / Captions**:
- [Font], [Size], [Use cases]
- Example: "Free shipping on orders over $50"

## Spacing & Layout

### Spacing Scale (4px base unit)

```typescript
spacing: {
  xs: '0.25rem',   // 4px  - Tight spacing
  sm: '0.5rem',    // 8px  - Small gaps
  md: '1rem',      // 16px - Default spacing
  lg: '1.5rem',    // 24px - Section gaps
  xl: '2rem',      // 32px - Large sections
  '2xl': '3rem',   // 48px - Hero spacing
  '3xl': '4rem',   // 64px - Major sections
  '4xl': '6rem',   // 96px - Page sections
}
```

### Grid System

**Container**: Max-width 1280px, centered  
**Padding**: 1rem (mobile), 2rem (tablet), 3rem (desktop)

**Grid Columns**:
- Mobile: 4 columns
- Tablet: 8 columns
- Desktop: 12 columns

**Gap**: 1rem (mobile), 1.5rem (tablet+)

### Layout Patterns

**Product Grid**:
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns
- Gap: 1.5rem

**Hero Section**:
- Height: 60vh (min 400px)
- Content max-width: 800px
- Center-aligned or left-aligned (specify)

## Component Styles

### Buttons

**Primary Button**:
```css
background: var(--color-primary);
color: white;
padding: 0.75rem 2rem;
border-radius: [value from brand];
font-weight: 600;
transition: all 200ms ease-in-out;

hover: {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: [elevation];
}
```

**Secondary Button**:
```css
background: transparent;
color: var(--color-primary);
border: 2px solid var(--color-primary);
/* same padding/radius as primary */
```

**Ghost Button**:
```css
background: transparent;
color: var(--color-foreground);
/* Use for tertiary actions */
```

### Cards

**Product Card**:
```css
background: white;
border: 1px solid var(--color-border);
border-radius: [value];
padding: [value];
box-shadow: [value];

hover: {
  box-shadow: [elevated shadow];
  transform: translateY(-4px);
  transition: all 300ms ease-out;
}
```

**Image Ratio**: 1:1 (square) / 3:4 (portrait) / 4:3 (landscape)

### Forms

**Input Fields**:
```css
background: var(--color-input);
border: 1px solid var(--color-border);
border-radius: [value];
padding: 0.75rem 1rem;
font-size: 1rem;

focus: {
  border-color: var(--color-primary);
  outline: 2px solid rgba(primary, 0.2);
  outline-offset: 2px;
}

error: {
  border-color: var(--color-error);
}
```

**Labels**:
```css
font-weight: 500;
margin-bottom: 0.5rem;
color: var(--color-foreground);
```

## Border Radius

```typescript
borderRadius: {
  none: '0',
  sm: '0.25rem',   // 4px  - Subtle rounding
  md: '0.5rem',    // 8px  - Default
  lg: '0.75rem',   // 12px - Cards, modals
  xl: '1rem',      // 16px - Large elements
  '2xl': '1.5rem', // 24px - Hero images
  full: '9999px',  // Pills, circular avatars
}
```

**Brand Style**: [Specify dominant radius - sharp, soft, very rounded]

## Shadows (Elevation)

```typescript
shadows: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',           // Subtle
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',         // Default
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',       // Elevated
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',       // Floating
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',  // Pressed
}
```

**Shadow Philosophy**: [Soft and subtle / Prominent and bold / Minimal]

## Animations & Transitions

### Timing Functions

```typescript
transitions: {
  fast: '150ms ease-in-out',    // Micro-interactions
  base: '200ms ease-in-out',    // Default
  slow: '300ms ease-out',       // Smooth entrances
  slower: '500ms ease-out',     // Page transitions
}
```

### Animation Principles

**Hover Effects**:
- Buttons: Scale up or lift with shadow
- Cards: Lift (translateY) + shadow increase
- Images: Subtle zoom (1.05x)

**Loading States**:
- Skeleton screens (prefer over spinners)
- Pulse animation on placeholders
- Smooth fade-in when loaded

**Page Transitions**:
- Fade in new content
- Slide up important elements
- Stagger product card entrances

### Micro-Interactions

**Add to Cart**:
- Button: Success checkmark animation (300ms)
- Cart icon: Bounce or increment number badge
- Optional: Product image flies to cart

**Form Validation**:
- Error: Shake input (200ms)
- Success: Checkmark fade-in (150ms)

## Imagery Guidelines

### Photo Style

**Product Photography**:
- Style: [Clean white background / Lifestyle / Flat lay]
- Lighting: [Soft natural / Bright studio / Moody]
- Consistency: All products shot in same style

**Lifestyle Photography**:
- Mood: [Describe desired emotion]
- Setting: [Studio / Natural environment / Home]
- Models: [If applicable - diversity, age range, styling]

### Aspect Ratios

**Product Images**: 1:1 (square)  
**Hero Images**: 16:9 (landscape)  
**Category Banners**: 3:1 (wide)  
**Instagram-style**: 4:5 (vertical)

### Image Treatment

**Filters**: None / Slight desaturation / Warm tone / [Describe]  
**Overlays**: For text on images, use [color] gradient with 40% opacity  
**Border Radius**: [Specify - sharp corners, rounded, very rounded]

## Iconography

**Icon Style**: [Line / Filled / Duotone]  
**Icon Library**: [Heroicons / Lucide / Font Awesome / Custom]  
**Icon Size**: 16px (small), 24px (default), 32px (large)

**Icon Usage**:
- Always pair with labels for accessibility
- Use consistent stroke weight
- Match brand personality (rounded vs sharp)

## Accessibility Standards

### WCAG 2.1 AA Compliance ✅

- ✅ Color contrast: 4.5:1 for text, 3:1 for UI elements
- ✅ Focus indicators: Visible 2px outline on all interactive elements
- ✅ Touch targets: Minimum 44x44px
- ✅ Text resize: Support up to 200% zoom without loss of function
- ✅ Keyboard navigation: Logical tab order, visible focus
- ✅ Alt text: All images have descriptive alt attributes
- ✅ Semantic HTML: Proper heading hierarchy, landmarks

## Responsive Behavior

### Breakpoints

```typescript
breakpoints: {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Laptop
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
}
```

### Mobile-First Rules

**Navigation**: Hamburger menu below 768px  
**Product Grid**: 2 columns mobile, 3 tablet, 4 desktop  
**Typography**: Reduce heading sizes by 20-30% on mobile  
**Spacing**: Reduce section padding by 50% on mobile

## Brand Applications

### Email Templates
- Header: Logo + brand color
- Body: Same fonts, neutral background
- CTA buttons: Match website primary button

### Social Media
- Profile image: Logo variant (square)
- Cover images: Feature products on brand background
- Post graphics: Use brand colors, fonts, filters

### Packaging (if applicable)
- Print colors: CMYK equivalents of digital colors
- Logo placement: [Guidelines]
- Typography: Same font families if available for print

## Dos and Don'ts Summary

### ✅ DO
- Follow spacing scale consistently
- Use semantic color names (primary, not "blue")
- Test on real devices (mobile, tablet, desktop)
- Ensure WCAG AA accessibility
- Maintain visual hierarchy
- Keep it simple and consistent

### ❌ DON'T
- Mix different design systems
- Use arbitrary spacing values
- Ignore mobile experience
- Sacrifice accessibility for aesthetics
- Overcomplicate designs
- Forget to test with real content

---

**Last Updated**: [Date]
**Updated By**: [Name/Role]
