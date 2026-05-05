"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { Button } from "@/components/ui/button";
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
    <section className="relative overflow-hidden pb-16 pt-24 md:pt-32 lg:pt-40">
      {/* Ambient gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="container-default relative flex flex-col items-start gap-10 lg:items-center lg:text-center">
        <FadeIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-1.5 text-sm font-medium text-[var(--fg-secondary)]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse" />
            {dict.home.hero.eyebrow}
          </span>
        </FadeIn>

        <h1 className="font-display text-[var(--fs-display)] leading-[1.05] tracking-[-0.04em]">
          <TextReveal>{dict.home.hero.headline}</TextReveal>
        </h1>

        <SlideUp delay={0.4} className="max-w-2xl">
          <p className="text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
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
            className="hidden text-sm font-medium text-[var(--fg-muted)] underline-offset-4 hover:text-[var(--fg)] hover:underline md:inline-flex md:items-center md:gap-1"
          >
            {dict.common.ctaSignIn}
          </a>
        </SlideUp>

        <SlideUp delay={0.85} className="w-full">
          <div
            id="demo"
            className="relative mx-auto mt-10 max-w-5xl scroll-mt-24"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[var(--radius-2xl)] opacity-60 blur-3xl"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] shadow-[var(--shadow-xl)]">
              <GradientPlaceholder
                className="aspect-[16/9]"
                caption="Hero product demo · 2880×1620 · drop into public/videos/hero/"
              />
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
