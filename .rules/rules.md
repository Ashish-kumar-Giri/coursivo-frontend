# Design System, Theme, and Styling Rules (Source of Truth)

These rules define **how styling and theming work in this project**. Follow them to ensure consistent results across editors/models.

## Theme system (how dark mode works)

- **Theme is controlled by a class on the `<html>` element**: `light` or `dark`.
- **Design tokens live in `src/app/globals.css`** as CSS variables in `:root` (light) and `.dark` (dark).
- Tailwind utilities are mapped to those tokens via Tailwind v4 `@theme inline` in `globals.css`.

### Required usage

- **Use semantic Tailwind colors backed by tokens**, not hard-coded colors:
  - Use: `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `ring-ring`, etc.
  - Avoid: `text-slate-900`, `bg-white/60`, `text-blue-600`, `#hex`, and arbitrary colors like `bg-[#...]` in new code.
- **If you must add a new color/token**, add it in **both** `:root` and `.dark`, and (if needed) expose it in the `@theme inline` mapping.
- **Respect reduced motion**: theme transitions are intentionally limited to theme toggles (see `.theme-transition` in `globals.css`).

## Styling approach (what to use by default)

### Default stack

- **Tailwind utilities first** for layout, spacing, and small one-off styling.
- **shadcn/ui primitives** under `src/components/ui/*` for common UI building blocks.
  - Use `Button`, `Card`, `Input`, `DropdownMenu`, `Sheet`, etc.
  - Always merge class names with `cn()` from `src/lib/utils.ts`.
- **Global CSS is allowed only in `src/app/globals.css`** and should remain token/utility focused (no page-specific styling there).

### Avoid

- Avoid introducing new ad-hoc CSS files or scattered “one-off” component CSS.
- Avoid inline styles for typography/spacing. Prefer the established utility classes and tokens.

## Typography system (use these classes)

Typography utilities are defined in `src/app/globals.css`. Prefer them over custom font stacks and inline styles.

- **Headlines**
  - `.text-display` (hero headline)
  - `.text-h1`, `.text-h2`, `.text-h3`
- **Body**
  - `.text-body`, `.text-body-lg`, `.text-small`, `.text-meta`
- **Fonts**
  - Use the font variables injected by `src/app/layout.tsx`.
  - Prefer `.font-display` / `.text-display` / `.text-h*` rather than setting `fontFamily` inline.

## Spacing & layout conventions

Use these global layout helpers for consistent section rhythm:

- **Section spacing**: `.section-padding`
- **Horizontal gutters**: `.container-padding`

Prefer responsive utilities and `clamp()`-based helpers already provided over inventing new spacing scales.

## Surfaces, borders, and “glass” look

This project uses a “calm authority / glass” aesthetic driven by tokens:

- **Default surfaces**
  - Use `bg-card text-card-foreground` for solid cards.
  - Use `bg-popover text-popover-foreground` for overlays/menus.
  - Use `border-border` for borders.
- **Glass surfaces**
  - Use `.glass-surface` for frosted panels (token-driven).
  - Use `.glass-card` for frosted cards (has dark-mode override).
- **Borders**
  - Prefer `border-border` / token-based borders over arbitrary opacity borders.

## Accent, gradients, and glow

Accent is defined by `--accent-start` and `--accent-end`.

- Use `.text-accent-gradient` for gradient text.
- Use `.glow-sm`, `.glow-md`, `.glow-lg` sparingly (only to emphasize primary actions or key highlights).
- Background effects available:
  - `.bg-grid`, `.bg-grid-fade`
  - `.bg-aurora`, `.bg-stars`, `.bg-noise`

## Buttons and interactive elements

### Default rule

- Use `Button` from `src/components/ui/button.tsx` for new buttons.
- Choose variants consistently:
  - **Primary**: `variant="default"`
  - **Secondary**: `variant="secondary"`
  - **Subtle**: `variant="ghost"`
  - **Borders**: `variant="outline"`
  - **Links**: `variant="link"`

### Marketing/landing CTAs (allowed)

If a button must be an `<a>` for navigation/anchors, keep styling consistent by using the global button helpers when appropriate:

- `.btn-cta` for gradient CTA
- `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-outline` for pill-style buttons

### Interaction requirements

Every interactive element must have:

- Visible hover state
- Visible focus state (keyboard)
- Immediate feedback without excessive motion

## Motion & animation

- Use `framer-motion` where motion adds clarity (entrance, subtle emphasis).
- Keep durations short and easing smooth.
- Never add “decorative” motion that distracts.
- Respect `prefers-reduced-motion` (avoid long/infinite animations; provide fallbacks).

## Accessibility and contrast

- Ensure text contrast is acceptable in both themes.
- Don’t rely on color alone to convey meaning.
- Keep focus rings intact (shadcn components already provide them).

## When modifying existing sections

- Prefer refactors toward tokens and global utilities, **but don’t churn** large sections unless necessary.
- If you touch a section that hard-codes colors, align it toward token-based classes as part of the change (when safe).

## Quick checklist for any UI change

- Uses token-based colors (`bg-background`, `text-foreground`, etc.)
- Works in both `light` and `dark`
- Uses `cn()` for class composition
- Uses shadcn primitives when applicable
- No new arbitrary hex/colors unless absolutely required (and then tokenized)

