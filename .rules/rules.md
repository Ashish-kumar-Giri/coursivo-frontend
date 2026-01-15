# Styling and Theme Rules (Source of Truth)

These rules define **how styling and theming work in this project**. Follow them strictly to ensure consistent results across editors, AI models, and developers.

## Theme System (Dark Mode)

- **Theme is controlled by `next-themes`** package
- **Theme class is applied to the `<html>` element**: `light` or `dark`
- **Design tokens live in `src/index.css`** as CSS variables using OKLCH color space
- **Tailwind is configured** in `tailwind.config.js` to use these CSS variables

### Color Token Structure

All colors use OKLCH format: `oklch(lightness chroma hue / alpha)`

```css
:root {
  --background: 1.0 0 0;  /* Pure white */
  --foreground: 0.20 0.01 255;  /* Dark text */
  --primary: 0.45 0.20 280;  /* Udemy purple */
  /* ... more tokens */
}

.dark {
  --background: 0.15 0.01 255;  /* Dark gray */
  --foreground: 0.95 0.005 250;  /* Light text */
  --primary: 0.60 0.20 280;  /* Lighter purple */
  /* ... more tokens */
}
```

### Required Usage

- **Always use semantic Tailwind colors backed by tokens**:
  - ✅ Use: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-primary`
  - ❌ Avoid: `text-slate-900`, `bg-white`, `text-blue-600`, `#hex`, `bg-[#...]`
- **If you must add a new color**, add it in **both** `:root` and `.dark` in `src/index.css`
- **Test in both light and dark modes** before committing

## Styling Approach

### Default Stack

1. **Tailwind utilities first** for all layout, spacing, colors, and styling
2. **shadcn/ui components** from `src/components/ui/*` for common UI elements
   - Use: `Button`, `Input`, `Card`, `DropdownMenu`, etc.
   - Always merge classes with `cn()` from `src/lib/utils.ts`
3. **Global CSS only in `src/index.css`** - no scattered CSS files

### What to Avoid

- ❌ No new CSS files or component-specific stylesheets
- ❌ No inline styles for colors, spacing, or typography
- ❌ No arbitrary values unless absolutely necessary
- ❌ No hard-coded colors or magic numbers

## Typography System

Typography utilities are defined in `src/index.css` using Inter font.

### Font Family

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Typography Classes

Use these predefined classes:

- **Display/Hero**: `.text-display` - Large hero headlines (3xl-6xl)
- **Headings**: `.text-h1`, `.text-h2`, `.text-h3`
- **Body**: `.text-body` - Standard body text
- **Utility**: Use Tailwind's `text-sm`, `text-base`, `text-lg`, etc.

### Font Weights

- Regular: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)
- Extrabold: `font-extrabold` (800)

## Spacing & Layout

### Container Standards

```tsx
<div className="container-padding mx-auto max-w-7xl">
  {/* Content */}
</div>
```

- **Max Width**: `max-w-7xl` (1280px)
- **Padding**: Use `.container-padding` utility
- **Centering**: Always use `mx-auto`

### Section Spacing

```tsx
<section className="section-padding">
  {/* Content */}
</section>
```

- **Vertical Padding**: Use `.section-padding` utility (py-8 md:py-16)
- **Consistent rhythm**: All major sections should use this

### Common Spacing Values

- Extra small: `gap-2` (8px)
- Small: `gap-4` (16px)
- Medium: `gap-6` (24px)
- Large: `gap-8` (32px)
- Extra large: `gap-12` (48px)

## Component Patterns

### Buttons

Always use the `Button` component from `src/components/ui/button.tsx`:

```tsx
import { Button } from "@/components/ui/button"

// Primary action
<Button size="lg" className="h-12 px-8 font-semibold">
  Click Me
</Button>

// Secondary action
<Button variant="outline" size="lg" className="h-12 px-8 font-semibold">
  Learn More
</Button>
```

**Variants**:
- `default` - Primary purple button
- `outline` - Bordered button
- `ghost` - Transparent button
- `link` - Link-styled button

**Sizes**:
- `sm` - Small (h-9)
- `default` - Medium (h-10)
- `lg` - Large (h-11)

### Cards

```tsx
<div className="bg-card border border-border shadow-sm p-6">
  {/* Card content */}
</div>
```

**Card Patterns**:
- Background: `bg-card`
- Border: `border border-border`
- Shadow: `shadow-sm` (hover: `shadow-lg`)
- Padding: `p-4` to `p-8`
- Corners: Sharp (default) or minimal (`rounded-sm`)

### Course Cards

Specific pattern for course display:

```tsx
<div className="group cursor-pointer">
  {/* Image */}
  <div className="aspect-video bg-muted mb-2">
    <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
  </div>
  
  {/* Content */}
  <div className="space-y-1">
    <h3 className="font-bold text-base line-clamp-2">{title}</h3>
    <p className="text-xs text-muted-foreground">{instructor}</p>
    <div className="flex items-center gap-1">
      {/* Rating */}
    </div>
    <div className="font-bold text-base">{price}</div>
  </div>
</div>
```

## Surfaces & Borders

### Default Surfaces

- **Page background**: `bg-background`
- **Card background**: `bg-card`
- **Muted sections**: `bg-muted/30` or `bg-muted/20`
- **Borders**: `border-border`

### Border Patterns

- Standard: `border border-border`
- Top only: `border-t border-border`
- Bottom only: `border-b border-border`
- No border: Don't add border class

## Gradients (Use Sparingly)

Gradients should be minimal and only for emphasis:

### Allowed Gradient Patterns

```tsx
// Subtle background gradient (hero sections only)
<div className="bg-gradient-to-br from-primary/5 via-background to-accent/5">

// Gradient text (headlines only)
<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
  Emphasized Text
</span>
```

### Gradient Rules

- ✅ Hero sections: Very subtle background gradients
- ✅ Text emphasis: Gradient on key words in headlines
- ❌ No gradients on buttons
- ❌ No gradients on cards
- ❌ No colored glows or shadows

## Shadows

Use shadows sparingly for depth:

- **Minimal**: `shadow-sm` - Default for cards
- **Medium**: `shadow-md` - Hover states
- **Large**: `shadow-lg` - Modals, dropdowns
- **Extra Large**: `shadow-xl` - Hero cards, featured elements

**Never use**:
- Colored shadows
- Glow effects
- Multiple layered shadows

## Transitions & Animations

### Standard Transitions

```tsx
className="transition-all duration-200"
```

- **Duration**: 200ms (fast and snappy)
- **Easing**: Default (ease)
- **Properties**: `transition-all` or specific like `transition-colors`

### Animation Rules

- ✅ Hover states: Color changes, shadow changes
- ✅ Focus states: Ring appearance
- ✅ Loading states: Spin animation
- ❌ No translations on hover
- ❌ No scale transforms
- ❌ No decorative animations
- ❌ No infinite animations (except loading)

## Accessibility

### Contrast Requirements

- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Clear focus states

### Focus States

- Always visible: `focus:outline-none focus:ring-2 focus:ring-ring`
- Never remove focus indicators
- Test keyboard navigation

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use semantic elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- Add ARIA labels where needed

## Responsive Design

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach

```tsx
// Mobile default, then larger screens
className="text-base md:text-lg lg:text-xl"
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
```

### Common Responsive Patterns

- **Typography**: Scale up on larger screens
- **Grids**: More columns on larger screens
- **Spacing**: Increase padding/margins on larger screens
- **Layout**: Stack on mobile, side-by-side on desktop

## Quick Checklist for Any UI Change

Before committing any UI changes, verify:

- [ ] Uses token-based colors (`bg-background`, `text-foreground`, etc.)
- [ ] Works in both light and dark mode
- [ ] Uses `cn()` for class composition
- [ ] Uses shadcn/ui components where applicable
- [ ] No arbitrary hex colors or inline styles
- [ ] Proper spacing using Tailwind scale
- [ ] Fast transitions (200ms)
- [ ] Accessible (contrast, focus states, semantic HTML)
- [ ] Responsive on all screen sizes
- [ ] Follows Inter font system
- [ ] Minimal shadows and no glows
- [ ] Clean, professional appearance

## Common Mistakes to Avoid

1. **Hard-coding colors**: Always use semantic tokens
2. **Inconsistent spacing**: Use the Tailwind spacing scale
3. **Over-animating**: Keep it simple and fast
4. **Ignoring dark mode**: Test both themes
5. **Arbitrary values**: Use predefined utilities
6. **Complex hover effects**: Keep it subtle
7. **Missing focus states**: Always visible for accessibility
8. **Inconsistent typography**: Use defined classes
9. **Too many gradients**: Use very sparingly
10. **Decorative elements**: Keep it minimal and functional

## When Modifying Existing Code

- Prefer refactors toward tokens and utilities
- Don't break existing functionality
- Test in both light and dark modes
- Maintain consistent spacing and typography
- Keep the minimal, clean aesthetic
- Document any new patterns in this file

## File Structure

```
src/
├── index.css           # Global styles, CSS variables, utilities
├── components/
│   ├── ui/            # shadcn/ui components
│   ├── layout/        # Layout components (Navbar, Footer)
│   └── CourseCard.tsx # Feature components
├── pages/             # Page components
└── lib/
    └── utils.ts       # cn() utility
```

## Summary

This project uses a **clean, minimal, Udemy-inspired design system** with:
- **Inter font** for all typography
- **OKLCH color tokens** for consistent theming
- **Tailwind utilities** for all styling
- **Minimal decorative elements** for professional appearance
- **Fast, subtle interactions** for good UX
- **Full dark mode support** with semantic tokens

Always prioritize **clarity, simplicity, and professionalism** over decorative flourishes.
