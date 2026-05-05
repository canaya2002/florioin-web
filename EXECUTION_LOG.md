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
| 1 — Componentes base | ✅ done | UI primitives + layout + animations + dev gallery |
| 2 — Bento + media | ✅ done | BentoGrid + cards, mockups, video, marquee, optimize scripts |
| 3 — Home **[CHECKPOINT]** | ✅ approved | Hero + bento + stats + marquee + steps + testimonials + industries grid + pricing teaser + final CTA |
| 4 — Product pages | ✅ done | /product overview + 5 deep-dives (ai-copilot, tasks, docs, inbox, integrations) |
| 5 — Solutions 15 industries | ✅ done | Index grid + dynamic [industry] route, all 15 with bilingual content |
| 6 — Pricing + forms | ✅ done | /pricing with FAQ, /request-access form + Resend API, /contact + API, thank-you |
| 7 — Blog/Changelog/Careers/Resources/Customers | ✅ done | 3 blog posts, 5 changelog, 3 careers, 2 resources, 3 customers, RSS feed |
| 8 — About + Security + Legal **[CHECKPOINT]** | ✅ done · awaiting Carlos OK | Mission/vision/values, security pillars, 4 legal docs (privacy/terms/dpa/cookies) |
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

---

## Fase 1 — Componentes base — 2026-05-04

**Done**:
- **Brand**: `<Logo>` SVG component with hero-gradient F mark + wordmark.
  Variants: `full | mark`, sizes: `sm | md | lg | xl`.
- **UI primitives** (Radix-wrapped or custom):
  - `Button` (cva variants: primary/secondary/ghost/link/outline/icon, sizes
    sm/md/lg/xl + icon, `asChild` via Radix Slot).
  - `Badge` (default/primary/success/warning/outline).
  - `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`,
    `CardFooter`.
  - `Input`, `Textarea`, `Label` (Radix Label).
  - `Skeleton` with shimmer keyframe.
  - `Separator`, `Dialog`, `Tooltip`, `Tabs`, `Accordion`, `DropdownMenu`
    (all Radix-wrapped with our token system).
- **Animation primitives** (framer-motion-based, all reduced-motion safe):
  `<FadeIn>`, `<SlideUp>`, `<Stagger>` + `<StaggerItem>`, `<TextReveal>`
  (per-word stagger), `<CountUp>`, `<Magnetic>`, `<RotatingText>`,
  `<RevealOnScroll>` (directional), `<ScrollProgress>` (sticky top bar).
- **Theme**: `<ThemeToggle>` (Sun/Moon icon swap; relies on Tailwind v4
  `@custom-variant dark` mapping to `[data-theme="dark"]`).
- **i18n**: `<LanguageSwitcher>` dropdown that swaps the locale prefix on
  the current pathname using `usePathname`.
- **Layout**: `<AnnouncementBar>`, `<Nav>` (sticky-on-scroll, blurred bg,
  dropdown mega-menu items, theme + lang toggles, mobile menu trigger),
  `<NavMobile>` (Radix Dialog drawer with Accordion sections), `<Footer>`
  (logo + tagline + social icons + 3 link columns + bottom theme/lang +
  copyright with year interpolation; uses `SITE.statusUrl` for the status
  link).
- **Marketing route group**: created `app/[locale]/(marketing)/layout.tsx`
  that wraps Nav + main + Footer + ScrollProgress. Moved home into
  `(marketing)/page.tsx`. Locale shell `[locale]/layout.tsx` keeps the
  html/body/fonts/theme provider — pages outside the marketing group stay
  free of marketing chrome (e.g. legal/security can opt in or out).
- **Dev gallery** at `/[locale]/dev` rendering every primitive — Phase 1
  validation per spec.
- **Tailwind v4 `@custom-variant dark`** wired to `[data-theme="dark"]`
  selector so the existing theme provider drives `dark:` utility classes.
- **Animation keyframes** for accordion open/close added to
  `src/styles/animations.css`.

**Validation**:
- `tsc --noEmit` and ESLint both clean.
- `npm run build` SSGs 7 routes (home + dev gallery in each locale +
  not-found). Proxy registered.
- Smoke test (dev): `/en` (60KB), `/es` (60KB), `/en/dev` (136KB) all 200.
  Nav, Footer, Logo, skip-link, ES translations all rendering.

---

## Fase 2 — Sistema bento + media — 2026-05-04

**Done**:
- `<BentoGrid>` (12-col desktop, 4-col tablet, 1-col mobile) and
  `<BentoCard>` with size variants `small | wide | tall | large | full | xl`,
  `visualPosition` of `background | below | above | side`, optional `gradient`
  backdrop, `eyebrow / title / description / visual / ctaLabel / href`, hover
  lift + brand-tinted border. When `href` is set the whole card becomes a
  Link (single focusable target — better a11y).
  Used `Omit<HTMLAttributes, "title">` because the native title attr is
  `string` and would collide with the ReactNode title we pass in.
- **Media primitives**:
  - `<GradientPlaceholder>` — dev/CI placeholder with brand gradient + subtle
    grid + caption strip. Used everywhere there's no real image yet.
  - `<LazyImage>` — wraps `next/image` with default base64 SVG blur seed and
    onError fallback to GradientPlaceholder. `fallback` prop forces dev mode.
  - `<AutoplayVideo>` — IntersectionObserver play/pause at 25% threshold,
    muted/loop/playsInline always, MP4 + optional WebM source. Falls back to
    poster (and to GradientPlaceholder if no src). Respects reduced-motion
    (no autoplay).
  - `<BrowserMockup>` — pure-CSS browser chrome with traffic lights and URL.
  - `<DeviceMockup>` — CSS frames for `iphone | ipad | macbook`.
  - `<Marquee>` — CSS infinite scroll, soft-fade edges via mask, optional
    pause-on-hover, reverse direction.
  - `<CodeBlock>` — minimal dark code block (Shiki integration deferred to
    Phase 7 when MDX lands).
- **Asset pipeline scripts**:
  - `scripts/optimize-images.mjs`: walks `public/images/_raw/`, emits AVIF +
    WebP variants into the mirrored output dir, plus a copy of the original
    as fallback. Sharp-based; skips up-to-date outputs unless `--force`.
  - `scripts/gif-to-mp4.mjs`: shells out to ffmpeg to emit MP4 (H.264) +
    WebM (VP9) + first-frame poster.jpg per input GIF.
- Dev gallery extended with bento section (mixed sizes), browser/device
  mockups, marquee, autoplay video (in fallback mode), code block.

**Validation**: tsc + eslint clean, build SSGs 7 routes.

---

## Fase 3 — Home — 2026-05-04 · CHECKPOINT

**Sections built** (all in `src/components/sections/`, all bilingual via the
shared dictionary, all reduced-motion safe):

1. **`<Hero>`**: animated gradient glow background, badge w/ pulse dot,
   `<TextReveal>` headline (per-word stagger), description, primary CTA
   (`/request-access`) + secondary CTA (anchors to `#demo`) + sign-in
   link (→ florioin.app/login). Hero visual is a placeholder rendered as
   `<GradientPlaceholder>` with caption directing Carlos to drop the real
   video into `public/videos/hero/`.
2. **`<FeaturesBento>`**: 7 bento cards mixing every size variant —
   `large` AI Co-Pilot (with caption-strip placeholder for the demo
   video), `small` speed quote with gradient backdrop, `wide` Tasks board
   (`side` visual position), `tall` mobile platforms strip, `wide` Smart
   Inbox (channel icons), `small` $3 pricing pill (linked), `full`
   manifesto card. Three of these link to `/product/*` deep-dives that
   ship in Phase 4.
3. **`<StatsSection>`**: 10× / 200+ / $3 / 99.99% with
   `<CountUp>` animated on scroll-into-view.
4. **`<LogosMarquee>`**: 10 placeholder customer names in a paused-on-hover
   marquee (real logos drop into `public/images/customers/` later).
5. **`<HowItWorks>`**: 3 numbered steps (Mic / Sparkles / CircleCheck
   icons in gradient circles), staggered reveal-on-scroll.
6. **`<Testimonials>`**: 3 placeholder quotes with gradient initials avatars.
7. **`<IndustriesTeaser>`**: 5×3 grid of all 15 industries with bilingual
   labels and lucide icons; each links to `/solutions/<slug>` (Phase 5).
8. **`<PricingTeaser>`**: $3/seat headline with 6 included items
   (bilingual list), primary + outline CTAs.
9. **`<CtaSection>`**: full-bleed gradient block with white CTA → request access.

**Validation**:
- `tsc --noEmit` and ESLint clean.
- `npm run build` SSGs 7 routes (home + dev gallery in EN+ES + 404).
- Smoke test: `/en` (184KB), `/es` (185KB) both 200; bilingual content
  verified (eyebrow strings differ, 15 industry links present, logo
  appears 3× — nav, footer, mobile drawer — testimonials render with
  initials avatars, final CTA renders bilingual).
- No hydration errors in dev server log.
- Bundle weight is dominated by framer-motion + page HTML; production
  bundle analysis lives in Phase 11.

**Carlos action required**: review the home preview at `/en` and `/es`
and approve before I proceed to Phase 4 (Product deep-dives). Run the
dev server with `npm run dev` and visit `http://localhost:3000` (it
auto-redirects based on browser language; explicit URLs `/en` and `/es`
are also fine).

---

## Fases 4–8 — 2026-05-04 · CHECKPOINT 3

Carlos approved Phase 3. Phases 4 through 8 ran in one continuous push.

### Fase 4 — Product pages
- `<PageHero>` reusable component (eyebrow, TextReveal title, sub, primary +
  secondary CTAs, optional visual).
- `<FeatureList>` for side-by-side comparisons (positive checks /
  negative crossed-out).
- `/product` overview — bento of 4 pillars + integrations CTA + platforms strip.
- `/product/ai-copilot` — 5 capabilities bento (voice, RAG, tool use,
  multi-model, integrations) + comparison block "FlorioIn vs ChatGPT alone".
- `/product/tasks` — 7 capabilities bento covering boards/lists/timelines,
  automations, dependencies, custom fields, SLA, recurring, AI assignment.
- `/product/docs` — 6 capabilities bento covering editor, inline AI,
  realtime, versions, templates, doc-to-task.
- `/product/inbox` — 5 capabilities bento covering channels, triage,
  drafts, snooze, message-to-task.
- `/product/integrations` — 8-category grid of 50+ apps + custom integration
  fallback CTA.

### Fase 5 — 15 solutions
- `src/lib/industries.ts` — single source of truth with bilingual content
  for all 15 industries: label, tag, headline, description, 3 pain points,
  3 solutions, quote with author, template description.
- `/solutions` index — 3-col grid with industry icons + tag.
- `/solutions/[industry]` — dynamic route with `generateStaticParams` for
  all 15 in both locales (30 SSG pages). Layout: hero + pain-points grid +
  solutions grid + quote block + template block + final CTA.

### Fase 6 — Pricing + forms
- `/pricing` — full pricing page with $3 hero card (8 includes), 3-step
  "how it works", 8-question FAQ accordion, enterprise CTA strip.
- `/request-access` — `<AccessRequestForm>` (RHF + Zod) with name, work
  email (rejects free hosts), company, role, headcount, industry (dropdown
  populated from INDUSTRIES), source, message, terms checkbox. Submits to
  `/api/access-request`.
- `/api/access-request` — Zod-validated POST → Resend dual email (internal
  notification to carlos@florioin.com + bilingual confirmation to user).
  Falls through gracefully when `RESEND_API_KEY` is unset (logs + returns
  `{ ok: true, sent: false }`) so dev/preview doesn't error.
- React Email templates: internal alert + user confirmation, both
  locale-aware.
- `/request-access/thank-you` — `noindex` confirmation page.
- `/contact` + `<ContactForm>` (simpler: name, email, message) → `/api/contact`.

### Fase 7 — Content
**Decision**: shipped placeholder content as TS objects (not MDX) to keep
the bundle small and avoid a Turbopack ↔ next-mdx-remote setup hiccup
this early. Carlos can convert to MDX when post count grows past 5–10.
Architecture supports the swap — every post/entry/job is shaped as
`{ heading, paragraphs }` sections that map cleanly to MDX once it lands.

- `src/lib/blog.ts`: 3 bilingual posts (announcement, guide, case-study)
  with category filtering, sort by date.
- `src/lib/changelog.ts`: 5 versioned entries with tagged items
  (new/improved/fixed/security) and color-coded labels.
- `src/lib/careers.ts`: 3 openings (Senior FS Eng, Product Designer, CS Lead).
- `src/lib/customers.ts`: 3 case studies (Atlas Legal, Mercado Norte,
  Ola Studios) with hero metric + quote + body sections.
- `src/lib/resources.ts`: 2 lead magnets (eBook + workspace template).
- All have `/listing` and `/[slug]` (or `/[version]`) detail pages.
- Blog has additional `/blog/category/[category]` filtered listings.
- `/rss.xml` route handler that serializes blog posts to RSS 2.0.

### Fase 8 — About + Security + Legal
- `/about` — mission + vision side-by-side, 3-step story (2024–2026),
  5 values grid, team placeholder card.
- `/security` — 6 pillars (multi-tenant RLS, encryption, SSO+SCIM,
  audit logs, data residency, compliance roadmap), AI privacy block
  ("your data doesn't train public models"), trust-center contact strip.
- `<LegalDoc>` reusable doc component with `[PLACEHOLDER LEGAL]` warning
  badge.
- `/legal/privacy`, `/legal/terms`, `/legal/dpa`, `/legal/cookies` —
  bilingual templates with placeholder markers wherever real legal review
  is needed (logged in BLOCKERS.md).

### Validation across 4-8
- `tsc --noEmit` clean.
- ESLint clean.
- `npm run build` SSGs ~80 routes (most pages × 2 locales). API routes
  (`/api/access-request`, `/api/contact`) and `/rss.xml` are dynamic.
- All forms wire to Resend with graceful fallback when env is unset.

**Carlos action required**: review preview, approve before Phase 9 (SEO,
sitemap, OG images) starts.
