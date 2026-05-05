# FlorioIn marketing site — execution log

Living changelog for the build of florioin.com. Decisions, deviations from
the original spec, and per-phase status live here.

---

## Project facts

- **This project**: marketing site at `florioin.com` (this repo).
- **Product app**: lives at `florioin.app` (separate repo, not built here).
- **CTA destination**: `/request-access` form → email to `carlos@florioin.com`.
- **Sign-in destination**: `/login` 308-redirects to `https://florioin.app/login`.

## Stack as discovered

- **Next.js 16.2.4** (NOT 15 as the spec assumed).
  See `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`.
  Key Next 16 deltas adopted:
  - `middleware.ts` is deprecated → using `proxy.ts` (Node runtime, not edge).
  - Async params/searchParams enforced (no synchronous fallback).
  - Turbopack default — no `--turbopack` flag, top-level `turbopack` key in next.config.
  - `next lint` removed → use `eslint .` directly.
  - `images.domains` deprecated → using `images.remotePatterns`.
  - `images.qualities` defaults to `[75]` → explicitly set `[50, 75, 90]`.
- **React 19.2.4**, **Tailwind v4**, **TypeScript 5+**.

## Deviations from spec

### i18n: native dictionaries instead of `next-intl`
**What**: skipped `next-intl` dependency in favor of Next 16's native i18n
pattern (server-only dictionaries + `proxy.ts`).
**Why**:
- next-intl is built around `middleware.ts` (deprecated in Next 16). Using it
  with Next 16's `proxy.ts` is unsupported / undocumented at this point.
- Native pattern adds zero KB to the client bundle (server-only loaders).
- Performance is non-negotiable (Lighthouse 95+, bundle <100KB) — fewer deps
  helps directly.
- The Next 16 i18n guide explicitly recommends this pattern.
**Tradeoff**: no automatic ICU MessageFormat (we ship simple `{placeholder}`
substitution if needed). For this marketing site that's fine.

### MDX: `next-mdx-remote` instead of `contentlayer2`
**What**: skipped contentlayer2 in favor of `next-mdx-remote` v6.
**Why**: contentlayer2 has known compatibility issues with Next 16's RSC
streaming and the App Router. The spec already named this fallback explicitly.

## Audit findings (`npm audit`)
- 5 moderate vulnerabilities, all transitive and non-applicable:
  - **postcss XSS via untrusted CSS** — only triggers when CSS comes from an
    untrusted source (we control all CSS). Fix would downgrade Next to 9.x —
    not acceptable.
  - **uuid v3/v5/v6 buffer bounds** — only triggers when generating UUIDs from
    a user-supplied buffer. Resend/svix uses v4 internally. Not exploitable.
- Net effect: keep current versions, log here, revisit on next major bump.

---

## Phase status

| Phase | Status | Notes |
| --- | --- | --- |
| 0 — Setup base | ✅ done | Tokens, i18n, proxy, theme, fonts, env, redirects |
| 1 — Componentes base | ⏳ next | UI primitives + layout + animations |
| 2 — Bento + media | ☐ | |
| 3 — Home **[CHECKPOINT]** | ☐ | |
| 4 — Product pages | ☐ | |
| 5 — Solutions 15 industries | ☐ | |
| 6 — Pricing + forms | ☐ | |
| 7 — Blog/Changelog/Careers/Resources/Customers | ☐ | |
| 8 — About + Security + Legal **[CHECKPOINT]** | ☐ | |
| 9 — SEO + sitemap + OG | ☐ | |
| 10 — Advanced animations | ☐ | |
| 11 — Performance + a11y | ☐ | |
| 12 — Testing + CI | ☐ | |
| 13 — Deploy **[CHECKPOINT FINAL]** | ☐ | |

---

## Fase 0 — Setup base — 2026-05-04

**Done**:
- Verified Next 16.2.4 baseline; documented Next 16 breaking-change deltas.
- Installed deps in two batches:
  - Runtime: framer-motion, gsap, lenis, tailwindcss-animate, Radix primitives
    (dialog/dropdown/tabs/accordion/tooltip/separator/slot/label/toast),
    lucide-react, cva, clsx, tailwind-merge, react-hook-form, zod,
    @hookform/resolvers, resend, @react-email/components, next-mdx-remote,
    gray-matter, remark-gfm, rehype-pretty-code, shiki, posthog-js,
    @vercel/analytics, @vercel/og, next-sitemap, plaiceholder, sharp,
    @formatjs/intl-localematcher, negotiator.
  - Dev: vitest, @vitejs/plugin-react, @testing-library/react/+jest-dom/+
    user-event, jsdom, @playwright/test, prettier, prettier-plugin-tailwindcss,
    @types/negotiator.
- Updated `package.json` scripts: `typecheck`, `lint`, `format`, `test`,
  `test:e2e`, `optimize:images`, `convert:gifs`. Removed reliance on
  `next lint` (removed in Next 16).
- Wrote complete design-token system into `src/app/globals.css` — paletas
  light/dark, gradients (hero/card/glow), shadows (sm/md/lg/xl/glow), radii,
  easings, durations, fluid type scale, section spacing. All wired through
  `@theme inline`. Imported `src/styles/animations.css` for keyframes.
- Theme system: `ThemeScript` (anti-FOUC inline ~280B in `<head>`) +
  `ThemeProvider` (client context with `setTheme`/`toggleTheme`).
  Strategy: `[data-theme]` attribute on `<html>` toggles CSS variables.
  Persists to `localStorage`; defaults to system preference; survives
  hydration without a flash.
- i18n: `src/i18n/locales.ts` (constants + type guard), JSON dictionaries for
  `en` and `es` covering nav/footer/home/forms/errors namespaces,
  `get-dictionary.ts` server-only async loader.
- `src/proxy.ts`: detects locale from cookie → `Accept-Language` →
  fallback `en`. Redirects unprefixed paths to `/[locale]/...`. Skips
  `_next`, `api`, and asset URLs via matcher and pathname checks. Persists
  detected locale to `NEXT_LOCALE` cookie (1 year).
- Fonts: Inter Variable + JetBrains Mono via `next/font/google` (display:
  swap). Cal Sans (`public/fonts/CalSans-SemiBold.woff2`, 298KB) loaded via
  `next/font/local`. All exposed as CSS vars (`--font-inter`,
  `--font-jetbrains-mono`, `--font-cal-sans`) and bound via `@theme inline`.
- Root layout in `src/app/[locale]/layout.tsx` (Next 16 pattern: locale
  segment IS the root layout — no top-level `app/layout.tsx`). Sets
  `<html lang>` dynamically, applies font variables, includes anti-FOUC
  script in `<head>`, wraps content in `ThemeProvider`, includes a
  skip-to-content a11y link.
- `generateMetadata` per locale with full OG/Twitter/hreflang.
- `[locale]/page.tsx` placeholder showing tagline + design tokens working.
- `[locale]/not-found.tsx` for 404s.
- `lib/utils.ts` with `cn()`, `formatNumber`, `formatDate`, `absoluteUrl`,
  `slugify`.
- `lib/constants.ts` with `SITE` (urls including `florioin.app`), pricing
  constants, industries, product pillars, platforms, social links.
- `lib/env.ts` with zod schemas for public + server env (lazy server
  evaluation so client bundles don't blow up).
- `next.config.ts`: top-level `turbopack`, `images.formats=[avif,webp]`,
  `qualities=[50,75,90]`, `remotePatterns` for unsplash/dicebear, redirects
  for `/login → florioin.app/login` (308), `/signup → /request-access`,
  `/demo → /request-access`, `/docs → /resources`. Security headers
  (X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Hooks: `useReducedMotion`, `useMounted`.
- `.env.example`, `.prettierrc.json`, `.prettierignore`.
- Folder skeleton with `.gitkeep` for components/, content/, public/images,
  public/videos, scripts, tests/e2e.

**Notes from validation**:
- Cal Sans SemiBold woff2 from the spec URL no longer exists — `calcom/font` was
  renamed to `calcom/sans` and only ships `CalSans-Regular.woff2` now. Using
  Regular as the display font (Cal Sans is intentionally a single-weight
  display family). File: `public/fonts/CalSans-Regular.woff2` (37KB).
- Hooks (`useReducedMotion`, `useMounted`) and `ThemeProvider` use
  `useSyncExternalStore` instead of `useEffect+setState` — required by Next 16's
  React 19 lint rule `react-hooks/set-state-in-effect`. Side benefit: zero extra
  render after hydration.
- Smoke test (dev): `/` → 307 to `/es` or `/en` based on Accept-Language with
  cookie persistence; `/en` and `/es` → 200 with correct `<html lang>`,
  bilingual content, theme script in `<head>`, fonts loaded; `/login` → 308 to
  `https://florioin.app/login`.
- Production build: SSG for both locales, Proxy registered.
- ESLint and `tsc --noEmit` both clean.
