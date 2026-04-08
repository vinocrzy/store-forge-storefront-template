# Color Palette

> **Purpose**: Documents color choices, rationale, and usage guidelines. Ensures consistent color application across all brand touchpoints.

## Color Philosophy
[Brief statement about what colors mean for this brand, e.g., "Warm earth tones reflecting natural, handmade quality"]

## Primary Color Palette

### Primary Color
**Name**: [Color name, e.g., "Honey Gold"]  
**Hex**: `#000000`  
**Usage**: Primary CTAs, brand moments, highlights

**Rationale**: [Why this color? What does it communicate?]

**Color Shades** (Light to Dark):
```typescript
primary: {
  50: '#FFFFFF',   // Lightest - backgrounds
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',  // Main brand color
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',  // Darkest - text
}
```

### Secondary Color
**Name**: [Color name]  
**Hex**: `#000000`  
**Usage**: Supporting elements, secondary CTAs

**Rationale**: [Why this color complements primary?]

**Color Shades**:
```typescript
secondary: {
  50: '#FFFFFF',
  100: '#F5F5F5',
  500: '#737373',  // Main
  900: '#171717',
}
```

### Accent Color
**Name**: [Color name]  
**Hex**: `#000000`  
**Usage**: Highlights, special promotions, alerts

**Rationale**: [Why this accent?]

## Neutral Colors

### Background Colors
```typescript
background: {
  primary: '#FFFFFF',    // Main background
  secondary: '#F5F5F5',  // Subtle sections
  tertiary: '#E5E5E5',   // Cards, panels
}
```

### Text Colors
```typescript
text: {
  primary: '#171717',   // Main body text
  secondary: '#525252', // Supporting text
  tertiary: '#737373',  // Muted text
  inverse: '#FFFFFF',   // Text on dark backgrounds
}
```

## Semantic Colors

### Success
**Hex**: `#10B981` (Green)
**Usage**: Success messages, completed actions, positive indicators

### Warning
**Hex**: `#F59E0B` (Amber)
**Usage**: Warning messages, important notices

### Error
**Hex**: `#EF4444` (Red)
**Usage**: Error messages, destructive actions

### Info
**Hex**: `#3B82F6` (Blue)
**Usage**: Informational messages, helpful tips

## Color Psychology

### [Primary Color Name]
**Psychological Impact**: [What emotions/associations does this color evoke?]
**Cultural Considerations**: [Any cultural meanings to be aware of?]
**Brand Alignment**: [How does this support brand values?]

### [Secondary Color Name]
[Same structure as above]

## Color Application Rules

### 60-30-10 Rule
- **60%**: [Primary/Dominant color - usually neutral/background]
- **30%**: [Secondary color - supporting elements]
- **10%**: [Accent color - CTAs, highlights]

### Color Combinations

**Hero Section**:
- Background: [Color]
- Heading: [Color]
- Body text: [Color]
- CTA: [Color]

**Product Cards**:
- Card background: [Color]
- Product name: [Color]
- Price: [Color]
- Add to cart button: [Color]

**Navigation**:
- Nav background: [Color]
- Nav text: [Color]
- Active link: [Color]
- Hover state: [Color]

## Accessibility (WCAG 2.1 AA)

### Contrast Ratios ✅

All text pairs must meet minimum contrast ratios:
- **Normal text** (under 18px): 4.5:1 minimum
- **Large text** (18px+ or 14px+ bold): 3:1 minimum
- **UI components**: 3:1 minimum

**Tested Combinations**:

| Foreground | Background | Ratio | Result | Usage |
|------------|------------|-------|--------|-------|
| `#171717` (Dark) | `#FFFFFF` (White) | 16:1 | ✅ AAA | Body text on white |
| `#FFFFFF` (White) | `#737373` (Primary) | 4.8:1 | ✅ AA | Button text |
| [Add more] | [combinations] | [ratio] | [✅/❌] | [usage] |

**Testing Tools**:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse
- axe DevTools extension

### Non-Color Indicators ⚠️

**NEVER** use color alone to convey information. Always pair with:
- ✅ Icons (e.g., ✓ for success, ⚠ for warning)
- ✅ Text labels
- ✅ Patterns/textures
- ✅ Position/layout

**Examples**:
- Error fields: Red border + error icon + "Required field" message
- Success: Green background + checkmark icon + "Saved successfully" text

## Color Don'ts

❌ **NEVER**:
- Use colors that fail contrast tests
- Use more than 5 colors in color palette (too chaotic)
- Apply brand colors inconsistently (undermines recognition)
- Ignore colorblind accessibility (8% of men, 0.5% of women)
- Use red and green alone to differentiate (colorblind issue)

## References

**Inspiration sources**:
- [Link to mood board]
- [Competitor with similar palette]
- [Color theory resource]

**Design Tools**:
- [Coolors.co](https://coolors.co/) - Palette generator
- [Adobe Color](https://color.adobe.com/) - Color wheel
- [Paletton](https://paletton.com/) - Color scheme designer

---

**Last Updated**: [Date]
**Updated By**: [Name/Role]
