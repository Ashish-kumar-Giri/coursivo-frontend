# Component Guidelines

This document provides specific implementation guidelines for common UI components in the Coursivo project.

## General Principles

1. **Consistency**: All components should follow the same design patterns
2. **Reusability**: Build components to be reused across the application
3. **Accessibility**: Always consider keyboard navigation and screen readers
4. **Responsiveness**: Components should work on all screen sizes
5. **Performance**: Optimize for fast rendering and minimal re-renders

## Core Components

### Button Component

Location: `src/components/ui/button.tsx`

**Usage**:
```tsx
import { Button } from "@/components/ui/button"

// Primary button
<Button size="lg" className="h-12 px-8 font-semibold">
  Get Started
</Button>

// Outline button
<Button variant="outline" size="lg" className="h-12 px-8 font-semibold">
  Learn More
</Button>

// Ghost button
<Button variant="ghost">
  Cancel
</Button>
```

**Variants**:
- `default`: Purple background, white text (primary actions)
- `outline`: Border only (secondary actions)
- `ghost`: No background (tertiary actions)
- `link`: Styled as a link

**Sizes**:
- `sm`: Small (h-9, px-3)
- `default`: Medium (h-10, px-4)
- `lg`: Large (h-11, px-8)

**Best Practices**:
- Use `default` variant for primary CTAs
- Use `outline` for secondary actions
- Always include descriptive text (no icon-only buttons without labels)
- Add `font-semibold` or `font-bold` for emphasis
- Use consistent sizing within the same context

### Course Card Component

Location: `src/components/CourseCard.tsx`

**Structure**:
```tsx
<div className="group cursor-pointer">
  {/* Image - 16:9 aspect ratio */}
  <div className="aspect-video bg-muted mb-2">
    <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
  </div>

  {/* Content */}
  <div className="space-y-1">
    {/* Title */}
    <h3 className="font-bold text-base line-clamp-2 leading-tight">
      {title}
    </h3>
    
    {/* Instructor */}
    <p className="text-xs text-muted-foreground">
      {instructor.fullName}
    </p>
    
    {/* Rating */}
    <div className="flex items-center gap-1">
      <span className="font-bold text-sm">4.5</span>
      <div className="flex items-center gap-0.5">
        {/* Star icons */}
      </div>
      <span className="text-xs text-muted-foreground">(1,234)</span>
    </div>

    {/* Price */}
    <div className="font-bold text-base">
      {formatPrice(price, currency, isFree)}
    </div>
  </div>
</div>
```

**Key Features**:
- No borders or shadows (clean look)
- 16:9 aspect ratio for images
- Line clamp on title (max 2 lines)
- Orange star ratings
- Clear price display

**Grid Layout**:
```tsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
  {courses.map(course => <CourseCard key={course.id} course={course} />)}
</div>
```

### Navbar Component

Location: `src/components/layout/Navbar.tsx`

**Structure**:
```tsx
<nav className="bg-background sticky top-0 z-50 w-full border-b border-border shadow-sm">
  <div className="container-padding mx-auto flex h-16 max-w-7xl items-center justify-between">
    {/* Logo */}
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <span className="text-2xl font-bold tracking-tight text-foreground">
        coursivo
      </span>
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex md:items-center md:gap-6">
      {navLinks.map(link => (
        <Link
          key={link.name}
          to={link.href}
          className="text-sm font-normal text-foreground hover:text-primary transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {/* Auth buttons or user menu */}
    </div>
  </div>
</nav>
```

**Key Features**:
- Sticky positioning
- Simple text logo (lowercase, bold)
- Clean navigation links
- Theme toggle
- User menu for authenticated users
- Mobile hamburger menu

### Search Bar Component

**Pattern**:
```tsx
<div className="flex items-center bg-card border border-border shadow-sm">
  <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
  <input 
    type="text" 
    placeholder="Search for anything" 
    className="flex-1 bg-transparent border-none outline-none px-4 text-base h-12 placeholder:text-muted-foreground"
  />
  <Button size="sm" className="m-1 h-10 px-6">Search</Button>
</div>
```

**Key Features**:
- Icon on left
- Integrated button on right
- Transparent input background
- Clean border
- Proper placeholder styling

## Layout Components

### Hero Section

**Pattern**:
```tsx
<section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border overflow-hidden">
  {/* Subtle background patterns */}
  <div className="absolute inset-0 bg-[radial-gradient(...)]" />
  
  <div className="container-padding mx-auto max-w-7xl relative z-10">
    <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
      
      {/* Left Content */}
      <div className="max-w-xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
          {/* Badge content */}
        </div>
        
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
          Main Headline
          <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gradient Word
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          Supporting text
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="h-12 px-8 font-semibold">
            Primary CTA
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 font-semibold">
            Secondary CTA
          </Button>
        </div>
      </div>
      
      {/* Right Visual */}
      <div className="hidden md:block">
        {/* Visual element (stats card, image, etc.) */}
      </div>
    </div>
  </div>
</section>
```

**Key Features**:
- Subtle gradient background
- Two-column layout on desktop
- Large, bold headline with optional gradient text
- Two CTA buttons
- Visual element on right (desktop only)

### Section Container

**Pattern**:
```tsx
<section className="container-padding mx-auto max-w-7xl py-12">
  {/* Section header */}
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-foreground mb-2">
      Section Title
    </h2>
    <p className="text-base text-muted-foreground">
      Section description
    </p>
  </div>
  
  {/* Section content */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {/* Content items */}
  </div>
</section>
```

**Key Features**:
- Consistent container padding
- Max width constraint
- Section header with title and description
- Responsive grid layout

## State Components

### Loading State

**Pattern**:
```tsx
{isLoading && (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)}
```

### Error State

**Pattern**:
```tsx
{error && (
  <div className="flex items-center justify-center py-20">
    <div className="text-center">
      <p className="text-destructive text-lg mb-2">{error}</p>
      <Button onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  </div>
)}
```

### Empty State

**Pattern**:
```tsx
{!isLoading && !error && items.length === 0 && (
  <div className="flex flex-col items-center justify-center py-20">
    <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
    <p className="text-muted-foreground text-lg font-semibold">
      No items found
    </p>
    <p className="text-sm text-muted-foreground mt-2">
      Check back soon for new content!
    </p>
  </div>
)}
```

## Form Components

### Input Field

**Pattern**:
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
    className="w-full h-12 px-4 bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
  />
</div>
```

### Form Layout

**Pattern**:
```tsx
<form className="space-y-6">
  {/* Form fields */}
  <div className="space-y-2">
    {/* Input field */}
  </div>
  
  {/* Submit button */}
  <Button type="submit" size="lg" className="w-full h-12 font-semibold">
    Submit
  </Button>
</form>
```

## Best Practices

### Component Organization

1. **Imports**: Group by type (React, libraries, components, utils, types)
2. **Types**: Define interfaces/types at the top
3. **Component**: Main component function
4. **Helpers**: Helper functions at the bottom
5. **Exports**: Default or named exports at the end

### Class Name Composition

Always use the `cn()` utility for combining classes:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className // Allow prop override
)}>
```

### Responsive Design

Use mobile-first approach:

```tsx
className="text-base md:text-lg lg:text-xl"
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
className="py-8 md:py-16"
```

### Accessibility

1. **Semantic HTML**: Use proper elements (`<button>`, `<nav>`, `<main>`)
2. **ARIA labels**: Add where needed for screen readers
3. **Keyboard navigation**: Ensure all interactive elements are accessible
4. **Focus states**: Always visible and clear
5. **Alt text**: Provide for all images

### Performance

1. **Memoization**: Use `React.memo()` for expensive components
2. **Lazy loading**: Use `React.lazy()` for code splitting
3. **Image optimization**: Use proper formats and sizes
4. **Avoid inline functions**: Define handlers outside JSX when possible

## Component Checklist

Before creating or modifying a component:

- [ ] Uses semantic HTML elements
- [ ] Follows the design system (colors, typography, spacing)
- [ ] Works in both light and dark mode
- [ ] Responsive on all screen sizes
- [ ] Accessible (keyboard, screen readers)
- [ ] Proper TypeScript types
- [ ] Uses `cn()` for class composition
- [ ] Follows naming conventions
- [ ] Documented with comments if complex
- [ ] Tested in different states (loading, error, empty)

## Common Patterns to Avoid

❌ **Don't**: Hard-code colors
```tsx
<div className="bg-[#A435F0]"> {/* Wrong */}
```

✅ **Do**: Use semantic tokens
```tsx
<div className="bg-primary"> {/* Correct */}
```

❌ **Don't**: Use inline styles
```tsx
<div style={{ padding: '20px' }}> {/* Wrong */}
```

✅ **Do**: Use Tailwind utilities
```tsx
<div className="p-5"> {/* Correct */}
```

❌ **Don't**: Create custom CSS files
```tsx
import './MyComponent.css' {/* Wrong */}
```

✅ **Do**: Use Tailwind utilities and global CSS
```tsx
<div className="bg-card border border-border"> {/* Correct */}
```

## Conclusion

Following these component guidelines ensures:
- **Consistency** across the application
- **Maintainability** for future developers
- **Accessibility** for all users
- **Performance** optimization
- **Design system** adherence

Always refer to this document when creating new components or modifying existing ones.
