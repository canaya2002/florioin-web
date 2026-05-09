import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type CtaSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

export function CtaSection({ locale, dict }: CtaSectionProps) {
  const lp = `/${locale}`;
  return (
    <Container as="section" className="py-[var(--space-16)] lg:py-[var(--space-24)]">
      <div
        className="relative isolate overflow-hidden rounded-[var(--radius-2xl)] px-[var(--space-8)] py-[72px] text-white shadow-[var(--shadow-xl)] md:px-[var(--space-16)]"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Inset glass slab — the kit's signature treatment for the CTA banner */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[18px] rounded-[var(--radius-xl)] border border-white/50"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.22) 100%)",
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(255,255,255,0.18)",
          }}
        />

        <div className="relative mx-auto flex max-w-[780px] flex-col items-center gap-[var(--space-4)] text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] opacity-90">
            {locale === "es" ? "Listo para empezar" : "Ready to start"}
          </span>
          <h2
            className="font-display leading-[1.04] tracking-[-0.045em] text-white"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              textShadow: "0 1px 2px rgba(40,30,80,0.12)",
            }}
          >
            {dict.home.finalCta.title}
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-white/95">
            {dict.home.finalCta.sub}
          </p>
          <div className="mt-[var(--space-4)] flex flex-wrap items-center justify-center gap-[var(--space-3)]">
            <Link href={`${lp}/request-access`}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-[var(--fg)] shadow-[0_12px_28px_rgba(60,40,120,0.30)] hover:bg-white"
              >
                {dict.common.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`${lp}/contact`}>
              <Button
                size="lg"
                variant="ghost"
                className="border border-white/55 bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white"
              >
                {locale === "es" ? "Habla con ventas" : "Talk to sales"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
