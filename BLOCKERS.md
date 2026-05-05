# Blockers / TODO for Carlos

## Real content needed

- [ ] **Product screenshots / demo videos** for hero, bento cards, deep-dive
      pages. Site renders gradient placeholders until these arrive. See
      `ASSET-INSTRUCTIONS.md` for the drop-in pipeline.
- [ ] **Customer logos** for the home-page marquee (10–15 minimum).
- [ ] **Customer case studies** (3 minimum) — currently scaffolded with
      placeholder data; replace in `src/content/customers/`.
- [ ] **Real testimonials** with names + photos + company.
- [ ] **Team photos** for `/about`.
- [ ] **Investor logos** for `/about` (if applicable).

## Operational

- [ ] **Resend account + API key**: needed for `/request-access` and
      `/contact` form submissions. Add `RESEND_API_KEY` to Vercel.
      Verify the sending domain (`florioin.com`) so emails don't land in
      spam.
- [ ] **PostHog account** (optional but recommended for conversion analytics).
- [ ] **Vercel project**: link with `npx vercel link`, add env vars from
      `.env.example`.
- [ ] **DNS for florioin.com**: point `A` / `CNAME` records to Vercel.
- [ ] **DNS for status.florioin.app**: pick a status-page provider
      (Atlassian Statuspage, Better Stack Uptime, …) and point the subdomain.

## Legal review

- [ ] `/legal/privacy`, `/legal/terms`, `/legal/dpa`, `/legal/cookies` ship
      with `[PLACEHOLDER LEGAL]` markers wherever real legal review is
      required. Have these reviewed by counsel before launch.

## Security

- [ ] **`/security` content review**: confirm the architecture/compliance
      claims on the page match reality of the actual product (`florioin.app`).
      Coordinate with engineering team on the app side.

## Audit findings (informational, not blocking)

- 5 moderate `npm audit` findings — all transitive and non-applicable to
  this codebase. Logged in `EXECUTION_LOG.md`. Re-evaluate on next major
  dependency bump.
