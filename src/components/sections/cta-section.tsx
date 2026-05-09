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
        className="relative isolate overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-glass)] p-[var(--space-8)] text-center shadow-[var(--shadow-xl)] md:p-[var(--space-16)] lg:p-[var(--space-20)]"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Soft white inner highlight at the top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/60"
        />
        {/* Frosted radial wash to brighten the centre */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.65), transparent 55%)",
          }}
        />
        {/* Static frosted halo — no animation, keeps the CTA calm. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-[var(--space-6)] text-white">
          <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-tight tracking-tight">
            {dict.home.finalCta.title}
          </h2>
          <p className="text-[var(--fs-body-lg)] leading-relaxed text-white/85">
            {dict.home.finalCta.sub}
          </p>
          <Link href={`${lp}/request-access`}>
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-[var(--fg)] shadow-[0_18px_42px_rgba(0,0,0,0.18)] hover:bg-white"
            >
              {dict.common.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
