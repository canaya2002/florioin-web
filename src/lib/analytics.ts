/**
 * Centralized Vercel Analytics event tracking.
 *
 * Why a wrapper? Every event passes through here so:
 *   1) Event names live in ONE place (no scattered string typos).
 *   2) Each event has a typed payload — we can't ship malformed props.
 *   3) We can plug additional sinks later (PostHog, etc.) without
 *      touching every call site.
 *
 * Naming convention: `domain.action` in snake_case.
 *   - cta.*           — call-to-action clicks
 *   - form.*          — form lifecycle
 *   - nav.*           — navigation interactions
 *   - product.*       — product showcase / bento exploration
 *   - outbound.*      — external link clicks
 *   - ui.*            — theme / locale / chrome interactions
 *   - scroll.*        — scroll-depth milestones
 */

import { track as vercelTrack } from "@vercel/analytics";

export type EventMap = {
  // ── CTAs ──────────────────────────────────────────────────────
  "cta.request_access_click": { location: string };
  "cta.contact_sales_click": { location: string };
  "cta.watch_demo_click": { location: string };
  "cta.pricing_click": { location: string };
  "cta.see_product_click": { location: string };
  "cta.fill_form_click": { location: string };

  // ── Form lifecycle ────────────────────────────────────────────
  "form.access_request_view": Record<string, never>;
  "form.access_request_submit": {
    headcount: string;
    industry: string;
    source: string;
  };
  "form.access_request_success": {
    headcount: string;
    industry: string;
  };
  "form.access_request_error": { error: string };

  // ── Navigation ────────────────────────────────────────────────
  "nav.click": { label: string; href: string };
  "nav.logo_click": Record<string, never>;
  "nav.mobile_open": Record<string, never>;
  "nav.mobile_close": Record<string, never>;

  // ── Product exploration ──────────────────────────────────────
  "product.showcase_tab_change": { tab: string; auto: boolean };
  "product.bento_card_click": { module: string };
  "product.module_link_click": { module: string; location: string };
  "product.industry_click": { industry: string };
  "product.use_case_click": { team: string };

  // ── Outbound / external ──────────────────────────────────────
  "outbound.email_click": { email: string; location: string };
  "outbound.social_click": { network: string; location: string };
  "outbound.app_login_click": Record<string, never>;

  // ── UI chrome ─────────────────────────────────────────────────
  "ui.locale_switch": { from: string; to: string };
  "ui.theme_toggle": { theme: string };

  // ── Scroll depth ──────────────────────────────────────────────
  "scroll.depth_25": { path: string };
  "scroll.depth_50": { path: string };
  "scroll.depth_75": { path: string };
  "scroll.depth_100": { path: string };

  // ── FAQ engagement ────────────────────────────────────────────
  "faq.open": { question: string; page: string };
};

export type EventName = keyof EventMap;

/**
 * Track a custom analytics event.
 *
 * @example
 *   track("cta.request_access_click", { location: "hero" })
 *   track("form.access_request_submit", { headcount: "11-50", industry: "legal", source: "search" })
 */
export function track<T extends EventName>(
  event: T,
  props: EventMap[T],
): void {
  try {
    // Vercel Analytics accepts only flat objects with string/number/boolean/null
    // values. Our typed payloads already comply, so this cast is safe.
    vercelTrack(event, props as Record<string, string | number | boolean | null>);
  } catch (err) {
    // Never let analytics break product flow — swallow silently in
    // development and report only in dev console.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[analytics] failed to track ${event}`, err);
    }
  }
}
