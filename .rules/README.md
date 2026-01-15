# Design & Development Rules

This folder contains the **source of truth** for all design and development standards in the Coursivo frontend project. These documents ensure consistency across different code editors, AI models, and developers.

## 📚 Documentation Files

### 1. `design-system.md`
**Complete design system specification**
- Color palette (OKLCH tokens)
- Typography (Inter font system)
- UI component specifications
- Layout standards
- Visual design rules

**Use this when**: Creating new UI components, choosing colors, or making design decisions.

### 2. `rules.md`
**Styling and theming implementation rules**
- Theme system (light/dark mode)
- CSS variable usage
- Tailwind utility patterns
- Component styling approach
- Responsive design guidelines

**Use this when**: Writing CSS, applying styles, or implementing themes.

### 3. `components.md`
**Component implementation guidelines**
- Specific component patterns
- Code examples for common components
- Best practices and anti-patterns
- Accessibility requirements
- Performance optimization

**Use this when**: Building new components or modifying existing ones.

### 4. `standards.md`
**General coding standards**
- Code organization
- Naming conventions
- File structure
- TypeScript usage
- Best practices

**Use this when**: Writing any code in the project.

### 5. `FOLDER_STRUCTURE.md`
**Project structure documentation**
- Directory organization
- File naming conventions
- Module organization

**Use this when**: Creating new files or organizing code.

## 🎯 Purpose

These rules exist to:

1. **Maintain consistency** - Ensure all code follows the same patterns
2. **Preserve design integrity** - Prevent design drift over time
3. **Enable collaboration** - Make it easy for new developers to contribute
4. **Support AI assistance** - Provide clear guidelines for AI code editors
5. **Document decisions** - Record why things are done a certain way

## 🚀 How to Use

### For Developers

1. **Before starting work**: Read the relevant documentation
2. **During development**: Reference these docs when making decisions
3. **Before committing**: Verify your code follows the guidelines
4. **When in doubt**: Check these docs first, then ask

### For AI Code Editors (Cursor, Copilot, etc.)

These documents are specifically formatted to be easily understood by AI models:

1. **Clear rules**: Explicit do's and don'ts
2. **Code examples**: Concrete patterns to follow
3. **Checklists**: Verifiable requirements
4. **Consistent format**: Easy to parse and reference

### For Code Reviews

Use these documents as the standard for reviewing code:

1. **Design adherence**: Does it follow the design system?
2. **Code quality**: Does it match the standards?
3. **Component patterns**: Does it use the correct patterns?
4. **Accessibility**: Does it meet the requirements?

## 📋 Quick Reference

### Design System Essentials

- **Font**: Inter (400, 500, 600, 700, 800)
- **Primary Color**: Purple `oklch(0.45 0.20 280)`
- **Border Radius**: Minimal (0px or max 0.5rem)
- **Shadows**: Subtle only
- **Transitions**: 200ms

### Styling Rules

- ✅ Use semantic tokens: `bg-background`, `text-foreground`
- ✅ Use Tailwind utilities
- ✅ Test in both light and dark mode
- ❌ No arbitrary colors or inline styles
- ❌ No custom CSS files

### Component Patterns

- ✅ Use shadcn/ui components
- ✅ Use `cn()` for class composition
- ✅ Follow responsive patterns
- ❌ No hard-coded values
- ❌ No decorative animations

## 🔄 Updating These Rules

When updating these documents:

1. **Discuss first**: Major changes should be discussed with the team
2. **Update all related docs**: Keep documentation in sync
3. **Add examples**: Show concrete code examples
4. **Version control**: Commit with clear messages
5. **Communicate**: Let the team know about changes

## 🎨 Design Philosophy

The Coursivo frontend follows a **Udemy-inspired, minimal, professional** design approach:

- **Clean**: No unnecessary decorative elements
- **Simple**: Easy to understand and use
- **Professional**: Trustworthy and credible
- **Accessible**: Works for everyone
- **Fast**: Optimized for performance

## 📖 Additional Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Lucide Icons**: https://lucide.dev
- **OKLCH Colors**: https://oklch.com
- **Inter Font**: https://rsms.me/inter/

## ⚠️ Important Notes

1. **These rules are mandatory** - Not optional suggestions
2. **Consistency over preference** - Follow the rules even if you prefer something else
3. **Update when needed** - These docs should evolve with the project
4. **Reference in PRs** - Link to relevant sections in pull requests
5. **Onboard with these** - New team members should read all docs

## 🤝 Contributing

If you find issues or want to improve these docs:

1. Open an issue describing the problem
2. Propose a solution with examples
3. Update the relevant documentation
4. Submit a pull request

## 📞 Questions?

If you have questions about these rules:

1. Check the documentation thoroughly
2. Search for similar patterns in the codebase
3. Ask in the team chat
4. Open a discussion issue

---

**Last Updated**: January 2026

**Maintained By**: Coursivo Development Team

**Version**: 1.0.0 (Udemy-inspired design system)
