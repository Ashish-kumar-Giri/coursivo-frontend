# Coursivo "Editorial Scholar" Design System

This document outlines the core aesthetic, components, and Tailwind usage patterns for the Coursivo frontend platform. All AI assistants and developers MUST strictly adhere to these patterns when creating, updating, or reviewing UI components.

## Core Aesthetic: "Editorial Scholar"
- **Vibe:** Premium, modern, clean, flat, and highly professional.
- **Dark Mode Native:** The styles are configured to seamlessly look incredibly sharp using the application's built-in CSS variables (e.g., `bg-background`, `text-foreground`).
- **Shapes:** Very sharp. All shadcn radii are set to `--radius: 0rem`. Do NOT use rounded components (like `rounded-md` or `rounded-[...]`) for primary UI scaffolding unless it is a specific pill/chip. 
- **Borders:** Minimal and subtle. Rely on `border-border/50` or `border-border/40`.

## 1. Backgrounds & Gradients
We use specific gradient treatments rather than flat block colors to achieve the premium feel.

**Hero / Layout Backgrounds:**
```tsx
// Standard split/hero background
className="bg-gradient-to-br from-background via-muted/30 to-background border-border"
```

**Glassmorphism Glow Orbs:**
Use blurred radial orbs layered beneath the UI to give depth:
```tsx
{/* Primary glow orb */}
<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
```

**Text Gradients:**
Used exclusively for key header emphasis:
```tsx
<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
  Highlighted Text
</span>
```

## 2. Typography
- **Headings:** High contrast, extremely bold, with tight tracking. 
  - Standard massive hero title: `text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight`
- **Subheadings/Descriptions:** Subdued, elegant, utilizing muted foregrounds.
  - Standard description text: `text-muted-foreground text-lg max-w-sm`
- **Logos/Branding:** Serif fonts are used for brand accents to achieve the "Scholar" look.
  - Standard logo styling: `font-serif font-bold text-2xl tracking-tight`
- **Small labels:** Uppercase, tracking-wider, heavy weight.
  - Standard label: `text-xs font-semibold text-muted-foreground uppercase tracking-wider`

## 3. Cards & Interactions
We don't use heavy colored borders. Depth is achieved via `hover` transforms and shadows.

**Standard Interactive Card:**
```tsx
<Card className="border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
 ...
</Card>
```

**Header Paddings/Structure:**
Never use massive padding like `py-16` for standard dashboards unless it's a Landing Page Hero. Use `py-6` or `pt-12` to keep interfaces compact and usable.

## 4. Reusable UI Blocks

**"Pulsing Pill" (Radar Notification / Prompt):**
Used atop important hero units or for status.
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(var(--primary),0.1)]">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
  </span>
  Your Text Here
</div>
```

**Page Entry Animations:**
We use `tailwindcss-animate` attributes to smoothly fade the page in on load. Always stagger delays.
```tsx
// Outer container
className="animate-in fade-in slide-in-from-bottom-8 duration-1000"

// Delayed child block
className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150"
```

## 5. Do's and Don'ts
- **DO NOT** use default literal Tailwind colors like `bg-zinc-950` or `text-zinc-500` for major layouts as they break dark/light mode harmonizations. Always use thematic equivalents (`bg-background`, `text-foreground`, `text-muted-foreground`, etc.).
- **DO NOT** use rounded corners (`rounded-xl`, `rounded-full`) for standard structure elements like Cards or Buttons, as the CSS variable `--radius` is set to `0rem` for the flat aesthetic. The only exception is glowing background orbs or specific pills.
- **DO** use `lucide-react` for all iconography, and keep icons lightweight (`w-5 h-5` usually, or `w-4 h-4` inside buttons).
