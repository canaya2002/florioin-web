import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section className="container-default py-24">
      <div
        className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border)] p-10 text-center md:p-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5), transparent 50%)",
          }}
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-white">
          <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-tight tracking-tight">
            {dict.home.finalCta.title}
          </h2>
          <p className="text-[var(--fs-body-lg)] text-white/80">
            {dict.home.finalCta.sub}
          </p>
          <Link href={`${lp}/request-access`}>
            <Button
              size="xl"
              variant="secondary"
              className="bg-white text-[var(--fg)] shadow-[var(--shadow-lg)] hover:bg-white"
            >
              {dict.common.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
