# Design System: Udemy-Inspired (Source of Truth)

This document defines the **locked** design system for the Coursivo project. All new UI components must adhere to these rules.

## Core Aesthetic

- **Style**: Professional, Authority, Direct, "EdTech".
- **Keywords**: Sharp, Solid, High-Contrast, Trustworthy.
- **Glassmorphism**: ❌ BANNED. Do not use frosted glass or transparency effects.
- **Rounded Corners**: ❌ BANNED (mostly). Use sharp corners (`rounded-none`) for buttons and inputs. Small radius (`0.5rem`) allowed for cards only if necessary, but prefer sharp.
- **Shadows**: Subtle, utilitarian. No colored glows.

## Color Palette

The theme uses CSS variables defined in `src/index.css`.

### Light Mode (Default)
- **Background**: White `#FFFFFF` (`bg-background`)
- **Foreground**: Almost Black `#1C1D1F` (`text-foreground`)
- **Primary**: Udemy Purple `#A435F0` (`bg-primary`)
- **Secondary**: Light Gray `#F7F9FA` (`bg-secondary`)
- **Border**: Light Gray `#D1D7DC` (`border-border`)

### Dark Mode
- **Background**: Dark Gray `#1C1D1F` (`bg-background`)
- **Foreground**: White `#FFFFFF` (`text-foreground`)
- **Primary**: Light Lilac `#D8A9FF` (`bg-primary`)

## Typography

- **Headings**:
  - **Hero/Display**: Serif (`font-serif`) - e.g., "SuisseWorks", "Georgia".
  - **Section Headers**: Sans-serif, Bold (`font-bold`).
- **Body**: Sans-serif (`font-sans`) - e.g., "Inter", "SuisseIntl".
- **Sizing**:
  - `text-display`: 4xl-7xl, Serif.
  - `text-h1`: 3xl, Bold.
  - `text-h3`: xl, Bold (Card titles).

## UI Components

### Buttons (`Button`)
- **Shape**: Rectangular, 0px border radius (`rounded-none`).
- **Height**: Tall and clickable (h-12 / 48px standard).
- **Primary**: Solid Purple, White text, Bold.
- **Outline**: Black border, Black text (White border/text in dark mode).
- **Hover**: 
  - Primary: Darker purple or 90% opacity.
  - Outline: Light gray background (`bg-accent`).

### Cards
- **Style**: Solid background (`bg-card`).
- **Border**: 1px solid border (`border-border`).
- **Shadow**: `shadow-sm` on rest, `shadow-md` on hover.
- **Interaction**: explicit "pointer" cursor if clickable.

### Navbar
- **Background**: Solid White (Light) / Dark Gray (Dark).
- **Border**: Bottom border (`border-b`).
- **Shadow**: `shadow-sm`.
- **Logo**: Solid background square, sharp or slight radius.

## Implementation Rules

1. **Always use Tailwind utilities**: `bg-primary`, `text-foreground`, `rounded-none`.
2. **No Arbitrary Colors**: Do not use `bg-[#123456]`. Use semantic tokens.
3. **No Gradients**: Avoid text gradients or background gradients unless explicitly mimicking a specific marketing asset.
4. **Icons**: Use `lucide-react`. Keep them simple and consistent size (`h-5 w-5`).

## Checklist for New Pages

- [ ] Are buttons sharp (`rounded-none`)?
- [ ] Is the primary action Purple?
- [ ] Are backgrounds solid (no transparency)?
- [ ] Is the main headline nice and bold (serif if distinct)?
