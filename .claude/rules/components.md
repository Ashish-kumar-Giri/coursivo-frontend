# Component Guidelines

## General Principles

- **Consistency**: Follow existing patterns before inventing new ones
- **Reusability**: Build components to be reused across the application
- **Accessibility**: Semantic HTML, keyboard navigation, screen reader support
- **Responsiveness**: Mobile-first, works on all screen sizes
- **Performance**: Minimize re-renders; use `React.memo()` for expensive components

## Class Composition

Always use `cn()` from `@/lib/utils` for combining classes:

```tsx
import { cn } from "@/lib/utils"

<div className={cn("base-classes", condition && "conditional-classes", className)}>
```

## shadcn/ui Components

Components in `src/components/ui/` are shadcn/ui — **never modify them manually**.
To add a new one: `npx shadcn@latest add [component-name]`

## Button

```tsx
import { Button } from "@/components/ui/button"

// Primary
<Button size="lg" className="h-12 px-8 font-semibold">Get Started</Button>

// Secondary
<Button variant="outline" size="lg" className="h-12 px-8 font-semibold">Learn More</Button>

// Tertiary
<Button variant="ghost">Cancel</Button>
```

Variants: `default` (purple), `outline`, `ghost`, `link`
Sizes: `sm` (h-9), `default` (h-10), `lg` (h-11)

## Course Card

```tsx
<div className="group cursor-pointer">
  <div className="aspect-video bg-muted mb-2">
    <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
  </div>
  <div className="space-y-1">
    <h3 className="font-bold text-base line-clamp-2 leading-tight">{title}</h3>
    <p className="text-xs text-muted-foreground">{instructor}</p>
    {/* Rating row */}
    <div className="font-bold text-base">{price}</div>
  </div>
</div>
```

Grid layout:
```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
```

## Navbar

- Sticky: `sticky top-0 z-50`
- Height: `h-16`
- Border: `border-b border-border shadow-sm`
- Logo: lowercase bold text, no icon

## State Components

```tsx
// Loading
<div className="flex items-center justify-center py-20">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</div>

// Error
<div className="flex items-center justify-center py-20">
  <div className="text-center">
    <p className="text-destructive text-lg mb-2">{error}</p>
    <Button onClick={() => window.location.reload()}>Try Again</Button>
  </div>
</div>

// Empty
<div className="flex flex-col items-center justify-center py-20">
  <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
  <p className="text-muted-foreground text-lg font-semibold">No items found</p>
</div>
```

## Form Pattern

```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <label htmlFor="field" className="text-sm font-medium">Label</label>
    <input id="field" className="w-full h-12 px-4 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
  </div>
  <Button type="submit" size="lg" className="w-full h-12 font-semibold">Submit</Button>
</form>
```

## Hero Section

```tsx
<section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border overflow-hidden">
  <div className="container-padding mx-auto max-w-7xl relative z-10">
    <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
      <div className="max-w-xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
          Headline
          <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gradient Word
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-12 px-8 font-semibold">Primary</Button>
          <Button size="lg" variant="outline" className="h-12 px-8 font-semibold">Secondary</Button>
        </div>
      </div>
      <div className="hidden md:block">{/* Visual */}</div>
    </div>
  </div>
</section>
```

## Component File Structure

1. Imports (React → libraries → components → utils → types)
2. TypeScript interfaces/types
3. Main component function
4. Helper functions
5. Export

## Responsive Design

Mobile-first approach:
```tsx
className="text-base md:text-lg lg:text-xl"
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
className="py-8 md:py-16"
```
