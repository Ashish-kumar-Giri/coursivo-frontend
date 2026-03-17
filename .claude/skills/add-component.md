Add a new React component following Coursivo frontend conventions.

Ask the user for:
1. Component name and purpose
2. Where it lives (ui/, layout/, feature component, or page)
3. Any props it needs

Then scaffold the component following these rules:
- File location based on `.claude/rules/folder-structure.md`
- Use semantic HTML elements
- Use Tailwind utilities + semantic color tokens (`bg-background`, `text-foreground`, etc.)
- Use `cn()` from `@/lib/utils` for class composition
- Use shadcn/ui components from `@/components/ui/` where applicable (never build from scratch what shadcn provides)
- Support both light and dark mode (use semantic tokens, not hardcoded colors)
- Mobile-first responsive design
- Proper TypeScript interface for props
- Include loading, error, and empty states if the component fetches data

Follow all rules in `.claude/rules/design-system.md`, `.claude/rules/components.md`, and `.claude/rules/code-style.md`.
