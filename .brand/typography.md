# Typography System

> **Purpose**: Documents font choices, type scale, and typography guidelines. Ensures consistent text hierarchy and readability.

## Typography Philosophy
[Brief statement about typography role, e.g., "Typography balances elegance with readability, reflecting artisanal quality"]

## Font Families

### Heading Font
**Family**: [Font name, e.g., "Playfair Display"]  
**Category**: Serif / Sans-serif / Display / Script  
**Weights Used**: 400, 600, 700  
**Source**: [Google Fonts / Adobe Fonts / Custom]

**Rationale**: [Why this font? What does it communicate about the brand?]

**Character**: [Describe personality - elegant, modern, friendly, bold, etc.]

**Best for**:
- [ ] Page titles (h1)
- [ ] Section headings (h2, h3)
- [ ] Hero headlines
- [ ] Product names
- [ ] Navigation

### Body Font
**Family**: [Font name, e.g., "Inter"]  
**Category**: Serif / Sans-serif  
**Weights Used**: 400, 500, 600  
**Source**: [Google Fonts / Adobe Fonts / Custom]

**Rationale**: [Why this font pairs well with heading font?]

**Character**: [Clean, readable, professional, etc.]

**Best for**:
- [ ] Product descriptions
- [ ] Body copy
- [ ] UI elements
- [ ] Buttons
- [ ] Form labels

### Accent Font (Optional)
**Family**: [Font name, e.g., "Pacifico"]  
**Category**: Script / Handwriting / Display  
**Weights Used**: 400  
**Source**: [Google Fonts / Adobe Fonts / Custom]

**Rationale**: [When and why to use sparingly?]

**Usage**: Hero taglines, special callouts, handwritten feel elements

## Font Pairing Strategy

### Pairing Principle
[Explain pairing strategy, e.g., "Classic serif + modern sans-serif for contrast and balance"]

**Contrast**: [How fonts differ - serif vs sans, thick vs thin, etc.]  
**Harmony**: [What makes them work together - similar x-height, proportions, etc.]

### Examples from Similar Brands
1. [Brand 1]: [Heading font] + [Body font]
2. [Brand 2]: [Heading font] + [Body font]

## Type Scale

### Modular Scale Ratio
**Ratio**: 1.250 (Major Third) / 1.333 (Perfect Fourth) / 1.618 (Golden Ratio)

**Base Size**: 16px (1rem)

### Scale Values

```typescript
fontSize: {
  xs: '0.64rem',      // 10.24px - Fine print
  sm: '0.8rem',       // 12.8px  - Captions, labels
  base: '1rem',       // 16px    - Body text (PRIMARY)
  lg: '1.25rem',      // 20px    - Large body, small headings
  xl: '1.563rem',     // 25px    - h4
  '2xl': '1.953rem',  // 31.25px - h3
  '3xl': '2.441rem',  // 39px    - h2
  '4xl': '3.052rem',  // 48.83px - h1, hero headlines
  '5xl': '3.815rem',  // 61px    - Extra large hero
}
```

**Visual Scale**:
```
5xl █████████████████████████████ (Hero headlines)
4xl ████████████████████████ (Page titles)
3xl ███████████████████ (Section headings)
2xl ████████████████ (Sub-headings)
xl ████████████ (Small headings)
lg ██████████ (Large body)
base ████████ (Body text - most used)
sm ██████ (Captions)
xs ████ (Fine print)
```

## Typography Hierarchy

### H1 - Page Titles
```typescript
h1: {
  fontFamily: 'var(--font-heading)',
  fontSize: '3.052rem',      // 4xl
  fontWeight: 700,           // Bold
  lineHeight: '1.2',         // Tight
  letterSpacing: '-0.02em',  // Slight tightening
  color: 'var(--color-foreground)',
}
```
**Usage**: Page titles, hero headlines (1 per page)

### H2 - Section Headings
```typescript
h2: {
  fontFamily: 'var(--font-heading)',
  fontSize: '2.441rem',      // 3xl
  fontWeight: 600,           // Semibold
  lineHeight: '1.3',
  letterSpacing: '-0.01em',
  color: 'var(--color-foreground)',
}
```
**Usage**: Main section headings (3-5 per page)

### H3 - Subsections
```typescript
h3: {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.953rem',      // 2xl
  fontWeight: 600,
  lineHeight: '1.4',
  letterSpacing: '0',
  color: 'var(--color-foreground)',
}
```

### H4 - Small Headings
```typescript
h4: {
  fontFamily: 'var(--font-body)',  // Switch to body for smaller headings
  fontSize: '1.563rem',      // xl
  fontWeight: 600,
  lineHeight: '1.5',
  letterSpacing: '0',
  color: 'var(--color-foreground)',
}
```

### Body Text
```typescript
body: {
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',          // base
  fontWeight: 400,           // Regular
  lineHeight: '1.6',         // Comfortable reading
  letterSpacing: '0',
  color: 'var(--color-foreground)',
}
```
**Usage**: Product descriptions, paragraphs, main content

### Body Large
```typescript
bodyLarge: {
  fontFamily: 'var(--font-body)',
  fontSize: '1.25rem',       // lg
  fontWeight: 400,
  lineHeight: '1.6',
  color: 'var(--color-foreground)',
}
```
**Usage**: Lead paragraphs, important callouts

### Body Small
```typescript
bodySmall: {
  fontFamily: 'var(--font-body)',
  fontSize: '0.875rem',      // sm
  fontWeight: 400,
  lineHeight: '1.5',
  color: 'var(--color-muted-foreground)',
}
```
**Usage**: Captions, metadata, timestamps

### Caption
```typescript
caption: {
  fontFamily: 'var(--font-body)',
  fontSize: '0.75rem',       // xs
  fontWeight: 400,
  lineHeight: '1.4',
  color: 'var(--color-muted-foreground)',
}
```
**Usage**: Image captions, fine print, helper text

## Responsive Typography

### Fluid Type Scaling

Use `clamp()` for fluid typography that scales smoothly:

```css
/* H1: 32px (mobile) to 48.83px (desktop) */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 3.052rem);
}

/* H2: 24px to 39px */
h2 {
  font-size: clamp(1.5rem, 4vw + 1rem, 2.441rem);
}

/* Body: 14px to 16px */
body {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
}
```

### Breakpoint Adjustments

**Mobile (< 640px)**:
- Reduce heading sizes by 20-30%
- Increase line-height slightly for readability
- Reduce letter-spacing

**Tablet (640px - 1024px)**:
- Default scale applies

**Desktop (> 1024px)**:
- Full scale
- Can reduce line-height slightly for tighter hero text

## Line Height Guidelines

**Headings** (Large text, short lines):
- H1-H2: `1.2` (Tight, impactful)
- H3-H4: `1.3-1.4` (Slightly looser)

**Body Text** (Comfortable reading):
- Body: `1.6` (Generous, easy to read)
- Long-form content: `1.75` (Extra space for long articles)

**UI Elements** (Compact):
- Buttons: `1` (Single line, centered)
- Labels: `1.4` (Compact but readable)

## Letter Spacing (Tracking)

**Large Headings**: `-0.02em` (Negative tracking, tighter)  
**Small Headings**: `0` (Normal)  
**Body**: `0` (Normal)  
**Uppercase Text**: `0.05em` (Positive tracking, more space)  
**Buttons**: `0.025em` (Slight positive)

## Font Weights

```typescript
fontWeight: {
  normal: 400,    // Regular - body text
  medium: 500,    // Medium - emphasis
  semibold: 600,  // Semibold - headings, buttons
  bold: 700,      // Bold - strong emphasis, h1
}
```

**Usage Rules**:
- Body text: 400 (regular)
- Emphasis: 500-600 (medium/semibold)
- Headings: 600-700 (semibold/bold)
- Avoid extremes: Don't use 100-300 (too light) or 800-900 (too heavy)

## Accessibility

### Readability Requirements ✅

**Line Length**: 50-75 characters per line (optimal)  
**Font Size**: Minimum 16px (1rem) for body text  
**Line Height**: Minimum 1.5 for body text (WCAG 2.1)  
**Contrast**: See color-palette.md for contrast ratios

### Font Loading Strategy

**FOUT Prevention** (Flash of Unstyled Text):
```html
<!-- Use font-display: swap for better performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="..." media="print" onload="this.media='all'">
```

**System Font Fallback**:
```css
font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Roboto, sans-serif;
```

## Typography Don'ts

❌ **NEVER**:
- Use more than 3 font families (creates visual chaos)
- Set body text below 16px on desktop (readability)
- Use script fonts for body text (hard to read)
- Use all caps for long text (slows reading by 10%)
- Set line-height below 1.5 for body text (accessibility)
- Pair two serif or two script fonts (lacks contrast)
- Use decorative fonts for important information

## Component-Specific Typography

### Buttons
```typescript
button: {
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',          // base
  fontWeight: 600,           // Semibold
  lineHeight: '1',           // Compact
  letterSpacing: '0.025em',  // Slight spacing
  textTransform: 'none',     // Keep natural case
}
```

### Product Names
```typescript
productName: {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.25rem',       // lg
  fontWeight: 600,
  lineHeight: '1.4',
}
```

### Price
```typescript
price: {
  fontFamily: 'var(--font-body)',
  fontSize: '1.5rem',        // 2xl
  fontWeight: 700,           // Bold
  lineHeight: '1',
  color: 'var(--color-primary)',
}
```

### Navigation
```typescript
nav: {
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',          // base
  fontWeight: 500,           // Medium
  lineHeight: '1.4',
  letterSpacing: '0.01em',
}
```

## Testing Checklist

- [ ] All fonts load correctly (no FOUT)
- [ ] Headings create clear hierarchy
- [ ] Body text is comfortable to read (50-75 chars/line)
- [ ] Line-height meets WCAG 1.5 minimum
- [ ] Font sizes scale properly on mobile
- [ ] Contrast ratios pass for all text
- [ ] Fallback fonts match brand feel

---

**Last Updated**: [Date]
**Updated By**: [Name/Role]
