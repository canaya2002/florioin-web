import { ArrowRight, CircleCheck } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
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
    <section className="relative isolate overflow-hidden section">
      <FloatingBlobs variant="violet" />
      <Container className="relative">
        <div className="mx-auto mb-[var(--space-10)] max-w-[760px] text-center">
          <span className="eyebrow mb-[var(--space-3)] inline-block">
            {dict.home.pricing.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em]">
            <span className="text-gradient">${PRICING.perSeat}</span>{" "}
            {isEs
              ? "por usuario. Por mes. Para siempre."
              : "per seat. Per month. Forever."}
          </h2>
          <p className="mx-auto mt-[var(--space-4)] max-w-[560px] text-[18px] leading-[1.55] text-[var(--fg-secondary)]">
            {dict.home.pricing.sub}
          </p>
        </div>

        <div className="gcard mx-auto grid max-w-[780px] items-center gap-[var(--space-8)] p-[var(--space-8)] md:grid-cols-[1fr_1px_1fr] md:px-[36px] md:py-[32px]">
          <div>
            <div className="flex items-baseline gap-[10px]">
              <span
                className="font-display text-[96px] leading-none tracking-[-0.05em]"
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
                "linear-gradient(180deg, transparent, var(--border-strong), transparent)",
            }}
          />

          <ul className="flex flex-col gap-[var(--space-3)]">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-center gap-[10px] text-[14.5px] text-[var(--fg-secondary)]"
              >
                <span
                  aria-hidden
                  className="grid h-5 w-5 place-items-center rounded-full"
                  style={{
                    background: "rgba(52, 199, 154, 0.18)",
                    color: "#1f8a5b",
                  }}
                >
                  <CircleCheck className="h-[14px] w-[14px]" strokeWidth={2} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
