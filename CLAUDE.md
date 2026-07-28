# Landing Page Website Development Guide for AI Agents & Developers (`ecom-web`)

You are working on the Public Landing Page Website built with Next.js 16 (App Router), Tailwind CSS v4, and `@ecom/*` shared packages.

## Core Directives

- **Shared UI & Domain**: Consume UI components from `@ecom/ui` and `@ecom/ui/domain`.
- **SEO & Performance**: Maintain 100% Core Web Vitals optimization, static page generation, and structured metadata.
- **Translations (i18n)**: Load translations from `@ecom/i18n`.
- **Tailwind v4 Scanning**: Ensure `globals.css` includes `@source "../../../ecom-shared-packages/packages/ui"`.

---

## Key Commands

```bash
# Start dev server
yarn dev

# Type check
yarn type-check

# Build production bundle
yarn build

# Link local yalc packages
yarn yalc:link:all
```
