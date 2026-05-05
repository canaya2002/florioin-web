import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

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
    <section className="container-default section">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg)] p-8 shadow-[var(--shadow-lg)] md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: "var(--gradient-card)" }}
        />
        <div className="relative grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{dict.home.pricing.eyebrow}</span>
            <h2 className="font-display text-[var(--fs-h2)] leading-tight tracking-tight">
              {dict.home.pricing.title}
            </h2>
            <p className="text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
              {dict.home.pricing.sub}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[clamp(56px,7vw,96px)] leading-none">
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

          <ul className="flex flex-col gap-3">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <Check className="h-3 w-3 text-white" />
                </span>
                <span className="text-[15px] text-[var(--fg-secondary)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
