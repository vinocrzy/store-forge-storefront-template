# Design System & Brand Identity

This storefront uses a **standardized design system structure** to ensure consistency and enable AI-assisted development.

## 📁 Folder Structure

```
storefront/
├── .brand/                       # 📝 Brand Identity Documentation
│   ├── identity.md               # Brand values, personality, target audience
│   ├── color-palette.md          # Color choices, rationale, accessibility
│   ├── typography.md             # Font selection, type scale, hierarchy
│   ├── style-guide.md            # Visual guidelines, component styles
│   └── competitive-analysis.md   # Competitor research, differentiation
│
└── src/
    ├── config/
    │   └── theme.config.ts       # ✅ Runtime theme configuration
    │
    └── design-system/            # 🎨 Design System Implementation
        ├── tokens/               # Design tokens (colors, typography, spacing, etc.)
        │   ├── colors.ts         # Color system with semantic meanings
        │   ├── typography.ts     # Type scale, font families, weights
        │   └── index.ts          # Spacing, shadows, transitions, etc.
        │
        ├── components/           # Component variants
        │   ├── button.variants.ts
        │   └── card.variants.ts
        │
        └── index.ts              # Central export point
```

## 🎯 Purpose

### `.brand/` - Brand Identity Documentation
**Purpose**: Documents the "why" behind design decisions. Used by:
- **AI Agents** (Storefront Frontend Dev) to understand brand personality
- **Designers** to maintain consistency
- **Developers** to make appropriate design decisions

**Key Files**:
- `identity.md` - Brand essence, values, target audience
- `color-palette.md` - Color rationale with WCAG accessibility checks
- `typography.md` - Font pairing strategy and hierarchy
- `style-guide.md` - Complete visual guidelines
- `competitive-analysis.md` - Market research and differentiation

### `src/design-system/` - Design System Implementation
**Purpose**: Production-ready design tokens and component variants.

**Key Features**:
- **Type-safe** - Full TypeScript support
- **Semantic** - Colors like `primary`, `success` (not "blue", "green")
- **Consistent** - Single source of truth for all visual properties
- **Reusable** - Import tokens anywhere in the codebase

## 🚀 Quick Start

### 1. Document Your Brand Identity

Fill out the `.brand/` markdown files:

```bash
# Start with brand essence
.brand/identity.md        # Define values, personality, audience

# Design your color palette
.brand/color-palette.md   # Choose colors with rationale

# Select typography
.brand/typography.md      # Pick fonts that match brand voice

# Create style guide
.brand/style-guide.md     # Document visual patterns

# Research competitors
.brand/competitive-analysis.md  # Identify differentiation
```

### 2. Customize Design Tokens

Update `src/design-system/tokens/` with your brand colors and typography:

```typescript
// src/design-system/tokens/colors.ts
export const colors = {
  primary: {
    500: '#F59E0B',  // Your brand color
    // ... full scale
  },
  // ... other colors
};

// src/design-system/tokens/typography.ts
export const typography = {
  fontFamily: {
    heading: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
  },
  // ... type scale
};
```

### 3. Customize Component Variants

Modify `src/design-system/components/` to match your brand personality:

```typescript
// src/design-system/components/button.variants.ts

// For soft, organic brand (Honey Bee):
export const softButtonVariant = {
  borderRadius: borderRadius.full,  // Pill-shaped
  boxShadow: shadows.md,           // Soft elevation
};

// For sharp, modern brand (Tech Store):
export const sharpButtonVariant = {
  borderRadius: borderRadius.sm,   // Minimal rounding
  boxShadow: shadows.lg,          // Bold shadow
};
```

### 4. Use in Components

```typescript
import { colors, spacing, buttonVariants } from '@/design-system';

<button style={{
  ...buttonVariants.primary.default,
  ...buttonSizes.md,
}}>
  Add to Cart
</button>

<div style={{
  backgroundColor: colors.primary[500],
  padding: spacing[4],
}}>
  Content
</div>
```

## 🤖 AI Agent Integration

The **Storefront Frontend Dev** agent uses these files to:

1. **Understand Brand Identity** (`.brand/identity.md`)
   - Brand values and personality
   - Target audience insights
   - Emotional goals

2. **Apply Color Theory** (`.brand/color-palette.md`)
   - Primary, secondary, accent colors
   - Semantic color meanings
   - WCAG contrast ratios

3. **Implement Typography** (`.brand/typography.md`)
   - Font pairings and rationale
   - Type scale and hierarchy
   - Responsive typography

4. **Follow Style Guide** (`.brand/style-guide.md`)
   - Component patterns
   - Spacing rules
   - Animation principles

5. **Generate Design Tokens** (`src/design-system/tokens/`)
   - Converts brand decisions to code
   - Ensures type safety
   - Maintains consistency

## 📋 Workflow

### For New Storefronts

1. **Brand Discovery**
   - Fill out `.brand/identity.md`
   - Research competitors (`.brand/competitive-analysis.md`)

2. **Color Palette Design**
   - Choose colors (`.brand/color-palette.md`)
   - Test accessibility (WCAG AA 4.5:1)
   - Update `tokens/colors.ts`

3. **Typography Selection**
   - Select fonts (`.brand/typography.md`)
   - Create type scale
   - Update `tokens/typography.ts`

4. **Component Customization**
   - Adjust button variants (soft vs sharp vs elegant)
   - Customize card styles
   - Update `components/*.variants.ts`

5. **Implementation**
   - Import design system tokens
   - Build components with variants
   - Test on real devices

### For Updates

1. **Update Documentation** (`.brand/` markdown files)
2. **Update Tokens** (`tokens/` TypeScript files)
3. **Update Components** (`components/` variants)
4. **Test Changes** (visual regression, accessibility)

## ✅ Best Practices

### DO ✅
- **Document decisions** - Explain why colors/fonts were chosen
- **Test accessibility** - All text must pass WCAG AA (4.5:1 contrast)
- **Use semantic names** - `primary`, not "orange"
- **Keep it DRY** - Single source of truth for design values
- **Version control** - Commit design system changes
- **Test responsively** - Mobile, tablet, desktop

### DON'T ❌
- **Hardcode values** - Use design tokens instead
- **Skip documentation** - AI agents need context
- **Ignore accessibility** - Test contrast ratios
- **Mix systems** - Use one design system consistently
- **Forget mobile** - Mobile-first approach

## 📚 File Reference

| File | Purpose | Used By |
|------|---------|---------|
| `.brand/identity.md` | Brand essence, values, audience | AI agents, designers, marketers |
| `.brand/color-palette.md` | Color rationale, accessibility | Designers, developers, AI agents |
| `.brand/typography.md` | Font selection, hierarchy | Designers, developers, AI agents |
| `.brand/style-guide.md` | Visual guidelines | All team members |
| `.brand/competitive-analysis.md` | Market research | Product, design teams |
| `src/design-system/tokens/colors.ts` | Color system (code) | React components |
| `src/design-system/tokens/typography.ts` | Typography system (code) | React components |
| `src/design-system/tokens/index.ts` | Spacing, shadows, transitions | React components |
| `src/design-system/components/*.variants.ts` | Component styles | React components |
| `src/config/theme.config.ts` | Runtime theme config | Theme provider |

## 🎨 Customization Examples

### Honey Bee (Natural, Organic Brand)

**Brand Identity**:
- Values: Natural, handmade, sustainable
- Colors: Honey gold, natural green, warm cream
- Typography: Playfair Display (elegant serif) + Inter (clean sans)
- Style: Soft rounded corners, gentle shadows, warm feel

**Design System**:
```typescript
// Soft, organic button
borderRadius: borderRadius.full,  // Pill-shaped
boxShadow: shadows.md,           // Gentle elevation
```

### Tech Store (Modern, Innovative Brand)

**Brand Identity**:
- Values: Innovation, performance, cutting-edge
- Colors: Blue, gray, white
- Typography: Poppins (geometric sans) + Inter (modern sans)
- Style: Sharp corners, bold shadows, high contrast

**Design System**:
```typescript
// Sharp, modern button
borderRadius: borderRadius.sm,   // Minimal rounding
boxShadow: shadows.xl,          // Bold shadow
```

### Luxury Fashion (Elegant, Sophisticated Brand)

**Brand Identity**:
- Values: Elegance, exclusivity, timeless
- Colors: Charcoal, gold accents, off-white
- Typography: Bodoni Moda (high-contrast serif) + Lato (refined sans)
- Style: Minimal, refined, subtle

**Design System**:
```typescript
// Elegant, minimal button
borderRadius: borderRadius.DEFAULT,
boxShadow: 'none',              // No shadow, minimal
border: '1px solid black',
```

## 🔗 Related Documentation

- [Storefront Frontend Dev Agent](/.github/agents/storefront-frontend-dev.agent.md)
- [Admin Panel Design System](/docs/19-admin-panel-design-system.md)
- [SEO Implementation](/docs/17-seo-implementation.md)

---

**Questions?** Contact the design system maintainer or check the agent documentation.
