# florioin.com — marketing site

Public-facing landing for **FlorioIn** — a B2B SaaS that combines Tasks,
Docs, AI Co-Pilot, and Smart Inbox into one workspace at $3 per user/month.

This repo is **only the marketing site**. The actual product app lives at
[florioin.app](https://florioin.app) in a separate codebase. The
relationship between the two:

| | This repo (florioin.com) | The product app (florioin.app) |
| --- | --- | --- |
| Purpose | Explain, convert, route to access form | Where customers actually work |
| Auth | None — `/login` 308-redirects to `florioin.app/login` | Real auth |
| Forms | "Request access" → email to Carlos via Resend | n/a |
| Stack | Next.js 16 · React 19 · Tailwind v4 | (separate) |
| Owner | Carlos Anaya Ruiz | Carlos Anaya Ruiz |

## Stack

- **Next.js 16.2.4** (Turbopack default, App Router, Proxy convention)
- **React 19.2.4**, **TypeScript 5+**, **Tailwind CSS v4**
- **next/font** for Inter + JetBrains Mono + Cal Sans (local woff2)
- **Native i18n** (server-only dictionaries, no `next-intl` — see
  `EXECUTION_LOG.md` for the rationale)
- **framer-motion** + **Lenis** + **GSAP** for motion (with
  reduced-motion safety on every component)
- **Radix UI** primitives + custom design system tokens
- **react-hook-form + Zod** for forms
- **Resend + React Email** for transactional email
- **Vitest + Playwright** for testing

## Quick start

```bash
npm install
npm run dev      # → http://localhost:3000 (auto-redirects to /en or /es)
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values you have. The
forms degrade gracefully when Resend env is unset (they log + return
`{ ok: true, sent: false }`) so dev/preview never errors.

```bash
NEXT_PUBLIC_SITE_URL=https://florioin.com
NEXT_PUBLIC_APP_URL=https://florioin.app

# Required for /request-access and /contact forms to actually send email
RESEND_API_KEY=
[email protected]
[email protected]

# Optional analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_GA_ID=
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run typecheck` | `tsc --noEmit` — strict TypeScript |
| `npm run lint` | `eslint .` (Next 16 removed `next lint`) |
| `npm run lint:fix` | Auto-fix lintable issues |
| `npm run format` | Prettier write |
| `npm run test` | Vitest unit tests (jsdom) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright e2e (boots prod server) |
| `npm run optimize:images` | Sharp pipeline: `public/images/_raw/` → AVIF + WebP |
| `npm run convert:gifs` | ffmpeg pipeline: `public/videos/_raw_gifs/` → MP4 + WebM + poster |

## Project layout

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (marketing)/        # nav + footer wrap; the public site
│   │   │   ├── page.tsx        # home
│   │   │   ├── product/...     # overview + 5 deep-dives
│   │   │   ├── solutions/...   # 15 industries via dynamic route
│   │   │   ├── pricing/...
│   │   │   ├── request-access/
│   │   │   ├── contact/
│   │   │   ├── about/
│   │   │   ├── customers/
│   │   │   ├── blog/...        # listing + [slug] + category filter
│   │   │   ├── changelog/...
│   │   │   ├── careers/...
│   │   │   ├── resources/...
│   │   │   ├── security/
│   │   │   ├── legal/...       # privacy, terms, dpa, cookies
│   │   │   └── dev/            # ⚠ component gallery — strip before launch
│   │   ├── error.tsx
│   │   ├── layout.tsx          # html/body, fonts, theme, OG
│   │   └── not-found.tsx
│   ├── api/
│   │   ├── access-request/route.ts
│   │   ├── contact/route.ts
│   │   └── og/route.tsx        # dynamic OG (edge runtime)
│   ├── icon.tsx                # generated favicon
│   ├── manifest.ts
│   ├── robots.ts
│   ├── rss.xml/route.ts
│   └── sitemap.ts
├── components/
│   ├── animations/             # FadeIn, SlideUp, Stagger, TextReveal,
│   │                           #  CountUp, Magnetic, RotatingText, ...
│   ├── bento/                  # BentoGrid + BentoCard
│   ├── brand/logo.tsx
│   ├── forms/
│   │   ├── access-request-form.tsx
│   │   ├── contact-form.tsx
│   │   └── emails/             # React Email templates
│   ├── i18n/
│   ├── layout/                 # Nav, NavMobile, Footer, AnnouncementBar,
│   │                           #  CookieBanner
│   ├── media/                  # LazyImage, AutoplayVideo, mockups, ...
│   ├── sections/               # Home + reusable section blocks
│   ├── seo/json-ld.tsx
│   ├── theme/                  # ThemeProvider, ThemeScript, ThemeToggle
│   └── ui/                     # Button, Card, Dialog, etc. (Radix-wrapped)
├── content/                    # reserved for future MDX
├── hooks/
├── i18n/
│   ├── locales.ts
│   ├── get-dictionary.ts
│   └── messages/{en,es}.json
├── lib/
│   ├── blog.ts                 # 3 sample posts (TS objects, MDX-ready shape)
│   ├── careers.ts              # 3 openings
│   ├── changelog.ts            # 5 versioned entries
│   ├── constants.ts            # SITE, INDUSTRIES, PRICING, ...
│   ├── customers.ts            # 3 case studies
│   ├── env.ts                  # zod-validated env (lazy server-only)
│   ├── industries.ts           # bilingual content for all 15 industries
│   ├── resources.ts            # 2 lead magnets
│   └── utils.ts                # cn(), slugify, formatDate, ...
├── proxy.ts                    # locale detection (replaces middleware in Next 16)
└── styles/animations.css

public/
├── fonts/CalSans-Regular.woff2
├── images/{product,solutions,customers,team,blog,og,illustrations,_raw}/
└── videos/{demos,tutorials,hero,_raw_gifs}/

scripts/
├── optimize-images.mjs
└── gif-to-mp4.mjs

tests/
├── unit/                       # Vitest
├── e2e/                        # Playwright
└── setup.ts
```

## i18n

Two locales, both shipped at build time:
- **`/en`** — default (English), no prefix → `/` redirects here for English visitors
- **`/es`** — Spanish (LATAM neutral, "tú" form)

Locale detection lives in `src/proxy.ts`:
1. Cookie (`NEXT_LOCALE`) — set when the user actively switches via the
   language dropdown
2. `Accept-Language` header — used on first visit
3. Falls back to `en`

Adding strings: edit `src/i18n/messages/en.json` and `es.json`.
The TypeScript shape is derived from `en.json`, so EN is the source of
truth and the unit tests verify ES has the same top-level keys.

Adding a locale: list it in `src/i18n/locales.ts` and create the matching
`messages/<locale>.json`. Sitemap, hreflang, and the language switcher pick
it up automatically.

## Theming

Dark mode is bound to `[data-theme="dark"]` on `<html>`. The
`ThemeScript` (`<head>`-injected, ~280B) reads `localStorage.theme` (or
falls back to `prefers-color-scheme`) before React hydrates — no flash.

`ThemeToggle` flips the attribute and stores the preference. Tailwind's
`dark:` variant is wired to the same selector via `@custom-variant dark`
in `globals.css`.

All design tokens live as CSS custom properties in `src/app/globals.css`
under `:root` and `:root[data-theme="dark"]`, then surfaced to Tailwind
via `@theme inline`. Add a token in CSS, get a Tailwind utility for free.

## Forms

Both forms (`/request-access`, `/contact`) use react-hook-form + Zod.
The schemas live alongside the form components and are duplicated server-
side in the route handlers — the same shape is enforced twice on purpose.

The access-request flow:

```
form → /api/access-request → Resend (internal email to carlos@florioin.com)
                          → Resend (bilingual confirmation to user)
                          → redirect /request-access/thank-you
```

Behavior when `RESEND_API_KEY` is unset (preview / staging / dev):
- Submission still succeeds (returns `{ ok: true, sent: false }`)
- Console warns
- User still lands on thank-you so QA flows work

## Performance

- Server Components by default; client only for interactivity.
- `next/image` everywhere (AVIF + WebP, lazy by default).
- Cal Sans loaded via `next/font/local` (zero CLS, no FOIT).
- Lenis smooth scroll skips on small viewports and on
  `prefers-reduced-motion`.
- `<ScrollProgress>` and motion components return `null` / pass-through
  div under reduced motion.
- `next/font` for all webfonts → no third-party requests in the critical path.

## Testing

```bash
npm test         # Vitest unit (currently 19 tests across 3 files)
npm run test:e2e # Playwright (boots prod server, ~30s startup)
```

Unit tests live in `tests/unit/` and cover:
- `cn()`, `slugify`, `absoluteUrl` helpers
- Locale dictionary parity (EN ↔ ES same shape)
- Industries dataset completeness (all 15 have 3 pains + 3 solutions)

E2E specs in `tests/e2e/` cover:
- Locale redirect from `/`
- Home renders nav, hero CTA, footer
- Spanish content on `/es`
- `/login` → `florioin.app/login` redirect
- Pricing page hero + FAQ
- Form validation triggers field errors
- 15 industry links exist on `/solutions`
- `sitemap.xml` and `robots.txt` are served correctly

## Deploy

This repo expects to be deployed on Vercel.

```bash
npx vercel link
npx vercel
```

In the Vercel dashboard, set:
- `NEXT_PUBLIC_SITE_URL=https://florioin.com`
- `NEXT_PUBLIC_APP_URL=https://florioin.app`
- `RESEND_API_KEY=…`
- `CONTACT_EMAIL_FROM=[email protected]`
- `CONTACT_EMAIL_TO=[email protected]`

Domains:
- `florioin.com` and `www.florioin.com` → this project
- `florioin.app` → the product project (separate)
- `status.florioin.app` → status page provider (Atlassian / Better Stack /
  whatever you choose)

CI is configured at `.github/workflows/ci.yml`:
- lint + typecheck + unit tests on every push/PR
- production build on success
- Playwright e2e on top of the build

## Before launch

1. Strip the `/[locale]/dev` component gallery (it's behind a path; safe
   to leave for staging but remove for production).
2. Drop real assets per `ASSET-INSTRUCTIONS.md`.
3. Replace placeholders flagged in `BLOCKERS.md`.
4. Have legal counsel review every doc under `/legal/` (search for
   `[PLACEHOLDER LEGAL]`).
5. Add a real Resend domain (verify SPF/DKIM/DMARC for `florioin.com`).
6. Generate proper favicons (current ones are emitted from
   `app/icon.tsx` — nice for now, replace before launch).

## Living docs

- **`EXECUTION_LOG.md`** — phase-by-phase decisions, deviations, rationale.
- **`ASSET-INSTRUCTIONS.md`** — how Carlos drops in real images / videos /
  customer logos / team photos.
- **`BLOCKERS.md`** — what's missing for production launch.

## License

Proprietary — © FlorioIn. All rights reserved.
#   f l o r i o i n - w e b  
 