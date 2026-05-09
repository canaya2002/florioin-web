"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { TextReveal } from "@/components/animations/text-reveal";
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

export function Hero({ locale, dict }: HeroProps) {
  const lp = `/${locale}`;
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-28 md:pt-36 lg:pt-44">
      {/* Pastel ambient glow at the top of the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80%]"
        style={{ background: "var(--gradient-glow)" }}
      />
      {/* Slow drifting pastel blobs */}
      <FloatingBlobs variant="hero" />

      <div className="container-default relative flex flex-col items-start gap-10 lg:items-center lg:text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-glass)] bg-[var(--glass-strong)] px-4 py-1.5 text-sm font-medium text-[var(--fg-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-[var(--blur-glass-soft)]">
            <Sparkles
              aria-hidden
              className="h-3.5 w-3.5 text-[var(--accent)]"
            />
            {dict.home.hero.eyebrow}
          </span>
        </FadeIn>

        <h1 className="font-display text-[var(--fs-display)] leading-[1.05] tracking-[-0.04em] text-[var(--fg)]">
          <TextReveal>{dict.home.hero.headline}</TextReveal>
        </h1>

        <SlideUp delay={0.4} className="max-w-2xl">
          <p className="text-[var(--fs-body-lg)] leading-relaxed text-[var(--fg-muted)]">
            {dict.home.hero.sub}
          </p>
        </SlideUp>

        <SlideUp delay={0.6} className="flex flex-wrap items-center gap-3">
          <Link href={`${lp}/request-access`}>
            <Button size="lg" variant="primary">
              {dict.common.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" asChild>
            <a href="#demo">
              <Play className="h-4 w-4" />
              {dict.common.ctaSecondary}
            </a>
          </Button>
          <a
            href={APP_LOGIN_URL}
            className="hidden text-sm font-medium text-[var(--fg-muted)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:underline md:inline-flex md:items-center md:gap-1"
          >
            {dict.common.ctaSignIn}
          </a>
        </SlideUp>

        <SlideUp delay={0.85} className="w-full">
          <div
            id="demo"
            className="relative mx-auto mt-12 max-w-5xl scroll-mt-24"
          >
            {/* Pastel halo behind the glass shell */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[var(--radius-3xl)] opacity-50 blur-3xl"
              style={{ background: "var(--gradient-hero)" }}
            />
            {/* Glass shell — the hero's product window. LCP target is the
                poster inside, not a video, so the page paints fast. */}
            <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-glass)] bg-[var(--glass-strong)] p-2 shadow-[var(--shadow-xl)] backdrop-blur-[var(--blur-glass)]">
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
      </div>
    </section>
  );
}
