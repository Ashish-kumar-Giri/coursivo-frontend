# Design System: Udemy-Inspired (Source of Truth)

This document defines the **locked** design system for the Coursivo project. All new UI components must adhere to these rules.

## Core Aesthetic

- **Style**: Clean, Professional, Minimal, Modern EdTech (Udemy-inspired)
- **Keywords**: Clean, Simple, Readable, Trustworthy, Professional
- **Approach**: Minimalist design with focus on content and usability
- **Rounded Corners**: Minimal use - 0px for most elements (sharp corners), small radius (0.25rem-0.5rem) only for cards when needed
- **Shadows**: Subtle and minimal - use sparingly for depth

## Color Palette

The theme uses CSS variables defined in `src/index.css` using OKLCH color space.

### Light Mode (Default)
- **Background**: Pure White `#FFFFFF` (`bg-background`)
- **Foreground**: Dark Gray/Black for text (`text-foreground`)
- **Primary**: Udemy Purple `oklch(0.45 0.20 280)` (`bg-primary`)
- **Secondary**: Very Light Gray `oklch(0.97 0.003 250)` (`bg-secondary`)
- **Muted**: Very Light Gray `oklch(0.98 0.002 250)` (`bg-muted`)
- **Border**: Subtle Gray `oklch(0.90 0.003 250)` (`border-border`)

### Dark Mode
- **Background**: Dark Gray `oklch(0.15 0.01 255)` (`bg-background`)
- **Foreground**: Off-White (`text-foreground`)
- **Primary**: Lighter Purple `oklch(0.60 0.20 280)` (`bg-primary`)
- **Border**: Dark Gray `oklch(0.30 0.015 255)` (`border-border`)

## Typography

**Font Family**: Inter (primary), with system font fallbacks
- Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap')`
- Fallback stack: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif`

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

### Typography Scale
- **Display/Hero**: `text-5xl md:text-6xl` (48px-60px), Bold (700-800)
- **H1**: `text-3xl lg:text-4xl` (30px-36px), Bold
- **H2**: `text-2xl lg:text-3xl` (24px-30px), Bold
- **H3**: `text-xl lg:text-2xl` (20px-24px), Bold
- **Body**: `text-base` (16px), Regular (400)
- **Small**: `text-sm` (14px), Regular
- **Tiny**: `text-xs` (12px), Regular

### Line Heights
- Headlines: `leading-tight` (1.2-1.3)
- Body: `leading-relaxed` (1.625)

## UI Components

### Buttons (`Button`)
- **Shape**: Minimal rounded corners (0px default, max 0.25rem if needed)
- **Height**: Standard h-10 (40px), Large h-12 (48px)
- **Padding**: px-4 to px-8
- **Font**: Medium weight (500-600)
- **Primary**: 
  - Solid Purple background
  - White text
  - Hover: Slightly darker (90% opacity)
- **Outline**: 
  - Border with transparent background
  - Foreground text color
  - Hover: Light background
- **Transitions**: Fast (200ms)

### Cards
- **Background**: Solid white (`bg-card`) in light mode
- **Border**: 1px solid subtle gray (`border-border`)
- **Corners**: Sharp (0px) or minimal (0.25rem max)
- **Shadow**: Very subtle - `shadow-sm` default, `shadow-lg` on hover
- **Padding**: p-4 to p-8 depending on content
- **Hover**: Subtle shadow increase (no translation)

### Course Cards (Specific)
- **Image**: Aspect ratio 16:9 (`aspect-video`)
- **No decorative elements**: No hearts, badges unless functional
- **Layout**: Image → Title → Instructor → Rating → Price
- **Typography**: 
  - Title: `text-base font-bold` (16px)
  - Instructor: `text-xs text-muted-foreground` (12px)
  - Price: `text-base font-bold` (16px)
- **Rating**: Orange stars (`fill-orange-400 text-orange-400`)

### Navbar
- **Background**: Solid White (Light) / Dark Gray (Dark)
- **Border**: Bottom border only (`border-b border-border`)
- **Shadow**: `shadow-sm`
- **Height**: h-16 (64px)
- **Logo**: Simple text, lowercase, bold, no icon
- **Links**: 
  - Regular weight (400)
  - Normal foreground color
  - Hover: Primary color
  - Spacing: gap-6

### Search Bars
- **Background**: White card background
- **Border**: 1px solid border
- **Height**: h-12 (48px)
- **Icon**: Left-aligned, muted color
- **Button**: Integrated on right side
- **Shadow**: Subtle (`shadow-sm`)

### Hero Section
- **Background**: Subtle gradient from primary/5 to accent/5
- **Layout**: Two-column on desktop (content left, visual right)
- **Headline**: Large (text-5xl to text-6xl), bold
- **Gradient text**: Use sparingly - only for emphasis
- **CTA Buttons**: Two buttons - primary and outline
- **Visual card**: Stats display with rounded corners, shadow

## Implementation Rules

1. **Always use Tailwind utilities**: `bg-primary`, `text-foreground`, etc.
2. **No Arbitrary Colors**: Do not use `bg-[#123456]`. Use semantic tokens from CSS variables.
3. **Minimal Gradients**: Use gradients very sparingly - only in hero sections or for text emphasis.
4. **Icons**: Use `lucide-react`. Standard sizes: `h-4 w-4` (small), `h-5 w-5` (medium), `h-6 w-6` (large).
5. **Spacing**: Use consistent spacing scale (4, 6, 8, 12, 16, 24)
6. **Transitions**: Keep fast (200ms) for interactions
7. **Font Smoothing**: Always enabled (`-webkit-font-smoothing: antialiased`)

## Layout Standards

### Container
- **Max Width**: `max-w-7xl` (1280px)
- **Padding**: `container-padding` utility (px-4 sm:px-6 lg:px-8)
- **Centering**: `mx-auto`

### Section Spacing
- **Vertical**: `py-8 md:py-16` (section-padding utility)
- **Between sections**: Consistent borders or background changes

### Grid Layouts
- **Course grids**: 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
  - Large: 5 columns
- **Gap**: `gap-4` to `gap-6`

## Checklist for New Pages/Components

- [ ] Uses Inter font family
- [ ] Uses semantic color tokens (bg-background, text-foreground, etc.)
- [ ] Minimal rounded corners (0px or max 0.5rem)
- [ ] Subtle shadows only
- [ ] Fast transitions (200ms)
- [ ] Works in both light and dark mode
- [ ] Proper spacing using Tailwind scale
- [ ] Clean, minimal design without decorative elements
- [ ] Accessible contrast ratios
- [ ] Responsive on all screen sizes

## Don'ts (Banned Patterns)

❌ **NO** Glassmorphism or frosted glass effects
❌ **NO** Heavy gradients everywhere
❌ **NO** Large rounded corners (max 0.5rem)
❌ **NO** Colored shadows or glows
❌ **NO** Arbitrary hex colors
❌ **NO** Decorative animations
❌ **NO** Complex hover effects (translations, scales)
❌ **NO** Custom fonts other than Inter
❌ **NO** Inline styles for colors/spacing

## Reference

This design system is inspired by Udemy's clean, professional, and minimal approach to online learning platforms. The focus is on:
- **Clarity**: Easy to read and understand
- **Simplicity**: No unnecessary decorative elements
- **Professionalism**: Trustworthy and credible
- **Usability**: Fast, responsive, and accessible
