import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { PRICING } from "@/lib/constants";

type PricingTeaserProps = {
  locale: Locale;
  dict: Dictionary;
};

export function PricingTeaser({ locale, dict }: PricingTeaserProps) {
  const lp = `/${locale}`;
  const isEs = locale === "es";

  const includes = isEs
    ? [
        "Tasks · tableros ilimitados",
        "Docs · páginas ilimitadas",
        "Smart Inbox",
        "Co-Pilot · prompts ilimitados",
        "Español + Inglés",
        "99.99% uptime SLA",
        "SSO / SAML en cada plan",
      ]
    : [
        "Tasks · unlimited boards",
        "Docs · unlimited pages",
        "Smart Inbox",
        "Co-Pilot · unlimited prompts",
        "Spanish + English",
        "99.99% uptime SLA",
        "SSO / SAML on every plan",
      ];

  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <Container className="relative">
        <div className="mx-auto mb-[var(--space-12)] max-w-[860px] text-center">
          <span className="eyebrow mb-[var(--space-3)] inline-block">
            {dict.home.pricing.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
            <span className="text-gradient">${PRICING.perSeat}</span>{" "}
            {isEs
              ? "por usuario. Por mes. Para siempre."
              : "per seat. Per month. Forever."}
          </h2>
          <p className="mx-auto mt-[var(--space-4)] max-w-[640px] text-[18px] leading-[1.55] text-[var(--fg-secondary)]">
            {dict.home.pricing.sub}
          </p>
        </div>

        <div className="relative mx-auto max-w-[900px]">
          {/* Soft gradient halo behind the pebble — colored glow, not a wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 opacity-70 blur-3xl"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div
            className="glow-border relative grid items-center gap-[var(--space-8)] overflow-hidden bg-white p-[var(--space-12)] md:grid-cols-[1fr_1px_1fr]"
            style={{
              borderRadius: "84px 64px 96px 60px / 60px 96px 64px 84px",
            }}
          >
            {/* Continuous sheen */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                animationDuration: "10s",
                mixBlendMode: "soft-light",
              }}
            />
            <div className="relative">
              <div className="flex items-baseline gap-[10px]">
                <span
                  className="font-display text-[clamp(76px,10vw,132px)] leading-[0.88] tracking-[-0.055em] animate-breathe"
                  style={{
                    background: "var(--gradient-hero)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ${PRICING.perSeat}
                </span>
                <span className="text-[14px] leading-[1.3] text-[var(--fg-muted)]">
                  USD
                  <br />
                  {isEs ? "por usuario / mes" : "per seat / mo"}
                </span>
              </div>
              <div className="mt-[var(--space-3)] font-mono text-[12px] text-[var(--fg-muted)]">
                {isEs
                  ? "facturado mensual · cancela cuando quieras"
                  : "billed monthly · cancel anytime"}
              </div>
              <div className="mt-[var(--space-4)] flex flex-wrap gap-1.5">
                {[
                  isEs ? "Sin tiers" : "No tiers",
                  isEs ? "Sin tarjeta" : "No card",
                  "SSO incluido",
                ].map((t) => (
                  <span
                    key={t}
                    className="lozenge inline-flex items-center gap-1 px-3 py-1 text-[11px] font-medium text-[var(--fg-secondary)]"
                  >
                    <CircleCheck className="h-3 w-3 text-[#1f8a5b]" strokeWidth={2.4} />
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`${lp}/request-access`}
                className="mt-[var(--space-6)] inline-block"
              >
                <Button size="lg" variant="primary">
                  {dict.common.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div
              aria-hidden
              className="hidden h-full md:block"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(150,170,200,0.30), transparent)",
              }}
            />

            <ul className="relative flex flex-col gap-[var(--space-3)]">
              {includes.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-[10px] text-[14.5px] text-[var(--fg-secondary)]"
                  style={{
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <span
                    aria-hidden
                    className="grid h-6 w-6 place-items-center rounded-full"
                    style={{
                      background: "rgba(52, 199, 154, 0.18)",
                      color: "#1f8a5b",
                    }}
                  >
                    <CircleCheck className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
