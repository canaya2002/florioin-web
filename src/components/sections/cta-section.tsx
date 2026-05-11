import { ArrowRight, Sparkles } from "lucide-react";
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
  const isEs = locale === "es";
  return (
    <section className="bg-white">
      <Container as="div" className="py-[var(--space-16)] lg:py-[var(--space-24)]">
        {/* Single morphing gradient blob — content sits directly on it.
            No nested rectangle, no underglow, no shadow. Px-based corners
            so content stays clearly inside the visible curve. */}
        <div
          className="relative isolate overflow-hidden px-[var(--space-8)] py-[88px] text-white animate-morph md:px-[var(--space-16)]"
          style={{
            background: "var(--gradient-hero)",
            borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
          }}
        >
          {/* Continuous sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
              animationDuration: "10s",
              mixBlendMode: "soft-light",
            }}
          />

          <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-[var(--space-5)] text-center">
            <span
              aria-hidden
              className="grid h-14 w-14 place-items-center rounded-full bg-white/25 text-white backdrop-blur animate-breathe"
            >
              <Sparkles className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] opacity-95">
              {isEs ? "Listo para empezar" : "Ready to start"}
            </span>
            <h2
              className="font-display leading-[1.02] tracking-[-0.05em] text-white [text-wrap:balance]"
              style={{ fontSize: "clamp(36px, 6vw, 88px)" }}
            >
              {dict.home.finalCta.title}
            </h2>
            <p className="max-w-[640px] text-[17px] leading-[1.55] text-white/95">
              {dict.home.finalCta.sub}
            </p>
            <div className="mt-[var(--space-4)] flex flex-wrap items-center justify-center gap-[var(--space-3)]">
              <Link href={`${lp}/request-access`}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-[var(--fg)] hover:bg-white"
                >
                  {dict.common.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white"
              >
                <a href="mailto:carlos@florioin.com">
                  {isEs ? "Habla con ventas" : "Talk to sales"}
                </a>
              </Button>
            </div>
            <div className="mt-[var(--space-3)] flex flex-wrap items-center justify-center gap-x-[var(--space-6)] gap-y-2 text-[12.5px] font-medium text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                {isEs ? "Activación < 24 h" : "Live in < 24 h"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                {isEs ? "Migración asistida" : "Assisted migration"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                {isEs ? "Cancela cuando quieras" : "Cancel anytime"}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
