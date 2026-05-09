import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FloatingBlobs } from "@/components/ui/floating-blobs";
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
        "Co-Piloto IA con límites razonables",
        "Tasks · Docs · Inbox · Forms — todo",
        "Apps web · iOS · iPad · Android · Mac · Win · Linux",
        "Modo oscuro · ES + EN",
        "Seguridad enterprise: SSO, RLS, audit logs",
        "Reembolso 100% en los primeros 30 días",
      ]
    : [
        "AI Co-Pilot with reasonable limits",
        "Tasks · Docs · Inbox · Forms — everything",
        "Web · iOS · iPad · Android · Mac · Win · Linux apps",
        "Dark mode · EN + ES",
        "Enterprise security: SSO, RLS, audit logs",
        "100% refund in the first 30 days",
      ];

  return (
    <section className="relative isolate overflow-hidden">
      <FloatingBlobs variant="violet" />
      <div className="container-default section relative">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-3xl)] border border-[var(--border-glass)] bg-[var(--glass-strong)] p-10 backdrop-blur-[var(--blur-glass-strong)] backdrop-saturate-[160%] shadow-[var(--shadow-xl)] md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-100"
            style={{ background: "var(--gradient-card)" }}
          />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <span className="eyebrow">{dict.home.pricing.eyebrow}</span>
              <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
                {dict.home.pricing.title}
              </h2>
              <p className="text-[var(--fs-body-lg)] leading-relaxed text-[var(--fg-muted)]">
                {dict.home.pricing.sub}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-gradient font-display text-[clamp(64px,8vw,112px)] leading-none">
                  ${PRICING.perSeat}
                </span>
                <span className="text-[var(--fg-muted)]">
                  {isEs ? "/ usuario / mes" : "/ user / month"}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link href={`${lp}/pricing`}>
                  <Button size="lg" variant="primary">
                    {dict.home.pricing.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`${lp}/request-access`}>
                  <Button size="lg" variant="outline">
                    {dict.common.ctaPrimary}
                  </Button>
                </Link>
              </div>
            </div>

            <ul className="flex flex-col gap-3.5">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full shadow-[var(--shadow-button)]"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] text-[var(--fg-secondary)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
