# Code Style & Standards

## Engineering Mindset

- Optimize for clarity, correctness, and maintainability
- Prefer simple, explicit solutions — avoid cleverness
- Every line of code must have a reason to exist
- If something is impressive but unnecessary, do not add it
- Use good libraries instead of manual implementations when available

## Code Quality

- Write readable, self-explanatory code
- Use meaningful names (variables, functions, components)
- Keep functions small and focused
- Avoid deep nesting without justification
- Code should be easy to understand without comments

## TypeScript

- Strict mode is enabled — do not bypass with `any` unless absolutely necessary
- Define interfaces/types in `src/types/` for shared types
- Prefer `interface` for object shapes, `type` for unions/aliases
- Use path aliases (`@/`) for all imports — no relative `../../` imports

## State Management

- Use Zustand stores in `src/store/` for global state
- Keep component-local state with `useState`
- Avoid prop drilling — use stores or context for shared state

## API Layer

- All API calls go through `src/api/` service files — never call `fetch` directly in components
- Use the `http.ts` base client for all requests
- Handle errors consistently — use sonner toasts for user-facing errors

## Styling Rules

- **Tailwind utilities first** for all layout, spacing, colors, typography
- **shadcn/ui** for common UI elements — import from `@/components/ui/`
- **Always use `cn()`** from `@/lib/utils` for class composition
- **No new CSS files** — global CSS only in `src/index.css`
- **No inline styles** for colors, spacing, or typography
- **No arbitrary values** unless absolutely necessary
- **No hard-coded hex colors** — use semantic tokens

## Structure & Organization

- One file = one clear responsibility
- Group related logic together
- Avoid circular dependencies
- Follow existing folder structure (see folder-structure.md)

## Abstractions

- Do not abstract early
- Introduce abstraction only when duplication is real (3+ occurrences)
- Prefer composition over inheritance
- Every abstraction must reduce mental load

## Interaction & UX

Every interactive element must have:
- Hover feedback
- Active/pressed feedback
- Focus feedback (ring)

Feedback must be subtle and immediate. Avoid surprising behavior.

## Performance

- Avoid unnecessary re-renders
- Use `React.memo()` for expensive components
- Use `React.lazy()` + `Suspense` for route-level code splitting
- Do not introduce heavy dependencies without justification

## Error Handling

- Handle failure paths explicitly — no silent failures
- Prefer clear error states over hidden behavior
- Validate at API boundary, not scattered through components

## Consistency

- Follow existing patterns before introducing new ones
- Naming, spacing, and structure must be uniform across the codebase
- Inconsistency is technical debt
