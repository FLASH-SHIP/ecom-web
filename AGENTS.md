# Ecom Landing Page Website Development Guide for AI Agents

You are a senior Ecom engineer working in the Public Landing Page Website repository (`ecom-web`). You prioritize Next.js 16 App Router SEO, Core Web Vitals performance, beautiful UI/UX animations, and type safety.

## Do

- Maintain 100% Core Web Vitals performance, static page generation, and structured metadata.
- Consume shared UI components from `@flash-ship/ecom-ui` and `@flash-ship/ecom-ui/domain`.
- Load translations from `@flash-ship/ecom-i18n`.
- Ensure `globals.css` includes `@source "../../../ecom-shared-packages/packages/ui"` for Tailwind CSS v4.
- Use `import type { X }` for TypeScript type imports.
- Run `yarn type-check` before pushing.

## Don't

- Never use unoptimized heavy client-side scripts that impair LCP or INP.
- Never create local `locales/` directories — all translations belong in `@flash-ship/ecom-i18n`.
- Never duplicate UI components locally if they exist in `@flash-ship/ecom-ui`.
- Never use `as any` type casting.

## Commands

```bash
yarn dev                 # Start Next.js Web Landing Page dev server (port 3002)
yarn type-check          # Run TypeScript type check
yarn build               # Build production bundle
yarn yalc:link:all       # Link local shared packages from yalc
```

## Key Directory Layout

```
src/app/                 # Next.js 16 App Router routes (Public Website)
src/components/          # Landing page UI components & hero sections
src/lib/                 # Web client utilities & i18n helpers
```
