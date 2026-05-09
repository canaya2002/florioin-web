"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { TextReveal } from "@/components/animations/text-reveal";
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

/**
 * Hero choreography (total ≈ 1.4s):
 *   eyebrow  100ms  · 400ms · y8
 *   h1       200ms  · 600ms · y16
 *   subcopy  350ms  · 500ms · y12
 *   ctas     500ms  · 400ms · y8
 *   visual   600ms  · 800ms · scale 0.96 → 1
 *
 * All entries use --ease-out-expo. Background blobs are continuous
 * ambient motion; they do not enter, they're already drifting.
 */
export function Hero({ locale, dict }: HeroProps) {
  const lp = `/${locale}`;
  return (
    <section
      className={[
        "relative isolate overflow-hidden",
        // 80–96 mobile / 96–128 desktop top padding so the headline
        // never hugs the nav.
        "pb-[var(--space-16)] pt-[var(--space-20)] lg:pt-[var(--space-32)]",
      ].join(" ")}
    >
      {/* Pastel ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80%]"
        style={{ background: "var(--gradient-glow)" }}
      />
      <FloatingBlobs variant="hero" />

      <Container className="relative flex flex-col items-start gap-[var(--space-8)] lg:items-center lg:text-center">
        <FadeIn delay={0.1} duration={0.4}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glass)] bg-[var(--glass-strong)] px-4 py-1.5 text-sm font-medium text-[var(--fg-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-[var(--blur-glass-soft)]">
            <Sparkles aria-hidden className="h-3.5 w-3.5 text-[var(--accent)]" />
            {dict.home.hero.eyebrow}
          </span>
        </FadeIn>

        {/* Hero H1 uses --fs-h1 (40–80px) not --fs-display (56–112px) — the
            display size overflows long Spanish headlines on 375px viewports. */}
        <h1 className="font-display text-[var(--fs-h1)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)]">
          <TextReveal>{dict.home.hero.headline}</TextReveal>
        </h1>

        <SlideUp delay={0.35} duration={0.5} distance={12} className="max-w-2xl">
          <p className="text-[var(--fs-body-lg)] leading-relaxed text-[var(--fg-muted)]">
            {dict.home.hero.sub}
          </p>
        </SlideUp>

        <SlideUp
          delay={0.5}
          duration={0.4}
          distance={8}
          className="flex w-full flex-wrap items-center gap-[var(--space-3)] sm:w-auto"
        >
          <Link href={`${lp}/request-access`} className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              {dict.common.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto"
          >
            <a href="#demo">
              <Play className="h-4 w-4" />
              {dict.common.ctaSecondary}
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
          delay={0.6}
          duration={0.8}
          distance={20}
          className="w-full"
        >
          <div
            id="demo"
            className="relative mx-auto mt-[var(--space-8)] w-full max-w-5xl scroll-mt-24"
          >
            {/* Pastel halo behind the glass shell — clipped by section overflow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[var(--radius-2xl)] opacity-50 blur-3xl"
              style={{ background: "var(--gradient-hero)" }}
            />
            {/* Glass shell — LCP target is the poster inside, not a video. */}
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-glass)] bg-[var(--glass-strong)] p-[var(--space-2)] shadow-[var(--shadow-xl)] backdrop-blur-[var(--blur-glass)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <GradientPlaceholder
                className="aspect-[16/9]"
                variant="dawn"
                caption="Hero demo · drop into public/videos/hero/"
              />
            </div>
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}
