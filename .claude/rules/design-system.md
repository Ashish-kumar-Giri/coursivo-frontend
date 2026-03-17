# Design System: Udemy-Inspired (Source of Truth)

This document defines the **locked** design system for the Coursivo project. All new UI components must adhere to these rules.

## Core Aesthetic

- **Style**: Clean, Professional, Minimal, Modern EdTech (Udemy-inspired)
- **Keywords**: Clean, Simple, Readable, Trustworthy, Professional
- **Approach**: Minimalist design with focus on content and usability
- **Rounded Corners**: Minimal — 0px for most elements, max 0.5rem only where necessary
- **Shadows**: Subtle and minimal — use sparingly for depth

## Color Palette

Colors are defined as CSS variables in `src/index.css` using OKLCH color space. Always use semantic Tailwind tokens — never hardcode colors.

### Light Mode
- Background: `bg-background` (pure white)
- Foreground: `text-foreground` (dark gray)
- Primary: `bg-primary` (Udemy purple `oklch(0.45 0.20 280)`)
- Secondary: `bg-secondary` (very light gray)
- Muted: `bg-muted`
- Border: `border-border`

### Dark Mode
- Background: `bg-background` (`oklch(0.15 0.01 255)`)
- Primary: `bg-primary` (lighter purple `oklch(0.60 0.20 280)`)

### Adding New Colors
Always add in **both** `:root` and `.dark` in `src/index.css`. Never use arbitrary hex values.

## Typography

**Font**: Inter (400, 500, 600, 700, 800 weights)

### Scale
- Display/Hero: `text-5xl md:text-6xl`, bold
- H1: `text-3xl lg:text-4xl`, bold
- H2: `text-2xl lg:text-3xl`, bold
- H3: `text-xl lg:text-2xl`, bold
- Body: `text-base` (16px), regular
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

### Line Heights
- Headlines: `leading-tight`
- Body: `leading-relaxed`

## Icons

Use **lucide-react** exclusively.
- Small: `h-4 w-4`
- Medium: `h-5 w-5`
- Large: `h-6 w-6`

## Spacing & Layout

### Container
```tsx
<div className="container-padding mx-auto max-w-7xl">
```
- Max width: `max-w-7xl` (1280px)
- Padding: `container-padding` utility (`px-4 sm:px-6 lg:px-8`)
- Centering: `mx-auto`

### Section Spacing
```tsx
<section className="section-padding">  {/* py-8 md:py-16 */}
```

### Spacing Scale
- `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12` — stick to this scale

## Shadows
- Default: `shadow-sm`
- Hover: `shadow-md` or `shadow-lg`
- Modals/dropdowns: `shadow-lg`
- **Never**: colored shadows, glow effects

## Transitions
- Duration: `duration-200` (fast, snappy)
- `transition-all` or `transition-colors`
- **Never**: translate on hover, scale transforms, decorative animations

## Gradients (use sparingly)
```tsx
// Hero background only
<div className="bg-gradient-to-br from-primary/5 via-background to-accent/5">

// Text emphasis only
<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
```
- ❌ No gradients on buttons or cards

## Banned Patterns

❌ Glassmorphism or frosted glass
❌ Heavy gradients
❌ Rounded corners > 0.5rem
❌ Colored shadows or glows
❌ Arbitrary hex colors (`bg-[#123456]`)
❌ Decorative animations
❌ Scale/translate hover effects
❌ Custom fonts other than Inter
❌ Inline styles for colors or spacing
❌ New CSS files (global CSS only in `src/index.css`)

## Accessibility

- Minimum contrast ratio 4.5:1 (text on background)
- Always visible focus states: `focus:outline-none focus:ring-2 focus:ring-ring`
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- Never remove focus indicators
