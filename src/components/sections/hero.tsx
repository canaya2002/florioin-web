"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { Container } from "@/components/layout/container";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { Button } from "@/components/ui/button";
import { FloatingBlobs } from "@/components/ui/floating-blobs";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { APP_LOGIN_URL } from "@/lib/constants";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

const TRUST_INDUSTRIES_EN = [
  "Logistics",
  "Manufacturing",
  "Pro services",
  "Hospitality",
  "Health",
  "Construction",
  "Retail",
];
const TRUST_INDUSTRIES_ES = [
  "Logística",
  "Manufactura",
  "Servicios pro",
  "Hospitalidad",
  "Salud",
  "Construcción",
  "Retail",
];

export function Hero({ locale, dict }: HeroProps) {
  const lp = `/${locale}`;
  const isEs = locale === "es";
  const industries = isEs ? TRUST_INDUSTRIES_ES : TRUST_INDUSTRIES_EN;

  return (
    <section className="relative isolate overflow-hidden pb-[var(--space-20)] pt-[140px] lg:pb-[var(--space-24)] lg:pt-[180px]">
      <FloatingBlobs variant="hero" />

      <Container className="relative flex flex-col items-center gap-[var(--space-8)] text-center">
        <FadeIn delay={0.1} duration={0.4}>
          <span className="eyebrow-pill">
            <span className="dot" aria-hidden />
            <span>{dict.home.hero.eyebrow}</span>
          </span>
        </FadeIn>

        {/* H1 renders without wrapper animation so it's the LCP candidate
            immediately — no opacity:0 → 1 transition gating the metric. */}
        <h1 className="mx-auto max-w-[980px] font-display text-[clamp(40px,6.5vw,88px)] leading-[1.04] tracking-[-0.045em] text-[var(--fg)] [text-wrap:balance]">
          {dict.home.hero.headlinePrefix}{" "}
          <span className="text-gradient">
            {dict.home.hero.headlineHighlight}
          </span>
        </h1>

        <SlideUp delay={0.4} duration={0.5} distance={12} className="max-w-[680px]">
          <p className="text-[var(--fs-body-lg)] leading-[1.55] text-[var(--fg-secondary)]">
            {dict.home.hero.sub}
          </p>
        </SlideUp>

        <SlideUp
          delay={0.55}
          duration={0.4}
          distance={8}
          className="flex w-full flex-col items-stretch justify-center gap-[var(--space-3)] sm:w-auto sm:flex-row sm:items-center"
        >
          <Link href={`${lp}/request-access`} className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              {dict.common.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="w-full sm:w-auto"
          >
            <a href="#demo">
              <Play className="h-4 w-4" />
              {dict.home.hero.watchDemo}
            </a>
          </Button>
          <a
            href={APP_LOGIN_URL}
            className="hidden text-sm font-medium text-[var(--fg-muted)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-[var(--fg)] hover:underline md:inline-flex md:items-center md:gap-1"
          >
            {dict.common.ctaSignIn}
          </a>
        </SlideUp>

        <SlideUp
          delay={0.7}
          duration={0.8}
          distance={20}
          className="mt-[var(--space-12)] w-full"
        >
          <div
            id="demo"
            className="relative mx-auto w-full max-w-[1120px] scroll-mt-32 rounded-[var(--radius-2xl)] border border-[var(--border-glass)] bg-[var(--glass-soft)] p-[14px] shadow-[var(--shadow-xl)] backdrop-blur-[var(--blur-glass-strong)] backdrop-saturate-[150%]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[32px] top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent"
            />
            <GradientPlaceholder
              className="aspect-[16/10] rounded-[var(--radius-xl)]"
              variant="dawn"
              caption="Hero demo · drop into public/videos/hero/"
            />
          </div>
        </SlideUp>

        <FadeIn delay={0.9} duration={0.5}>
          <div className="mx-auto mt-[var(--space-8)] flex max-w-[920px] flex-col items-center gap-[var(--space-4)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-[var(--space-8)] sm:gap-y-[var(--space-3)]">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              {dict.home.hero.trustLabel}
            </span>
            <ul className="flex flex-wrap items-center justify-center gap-x-[var(--space-6)] gap-y-[var(--space-2)]">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="font-display text-[15px] tracking-[-0.02em] text-[var(--fg-secondary)]"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
