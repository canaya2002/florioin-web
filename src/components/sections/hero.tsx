"use client";

import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";
import { Magnetic } from "@/components/animations/magnetic";
import { SlideUp } from "@/components/animations/slide-up";
import { HeroCanvas } from "@/components/sections/hero-canvas";
import { Button } from "@/components/ui/button";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { track } from "@/lib/analytics";
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
    <section className="relative isolate overflow-hidden bg-white pb-[var(--space-20)] pt-[140px] lg:pb-[var(--space-24)] lg:pt-[180px]">
      {/* Floating glass orbs as the ONLY ambient layer — pastel lives
          inside them, the page stays pure white. */}
      <FloatingOrbs parallax={0.5} />

      <div className="container-wide relative z-10 flex flex-col items-center gap-[var(--space-8)] text-center">
        <FadeIn delay={0.05} duration={0.4}>
          <Link
            href={`${lp}/changelog`}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--fg-secondary)] transition-transform hover:-translate-y-0.5"
          >
            <span
              aria-hidden
              className="grid h-4 w-4 place-items-center rounded-full text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <Sparkles className="h-2.5 w-2.5" />
            </span>
            <span>{dict.home.hero.eyebrow}</span>
            <span aria-hidden className="h-3 w-px bg-[var(--fg-subtle)]/30" />
            <span className="font-mono text-[10.5px] text-[var(--fg-muted)]">
              v1.0
            </span>
            <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-[var(--duration-fast)] group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        </FadeIn>

        <h1 className="mx-auto max-w-[1080px] font-display text-[clamp(46px,7.5vw,108px)] leading-[1.02] tracking-[-0.052em] text-[var(--fg)] [text-wrap:balance]">
          {dict.home.hero.headlinePrefix}{" "}
          <span className="text-gradient animate-gradient">
            {dict.home.hero.headlineHighlight}
          </span>
        </h1>

        <SlideUp delay={0.35} duration={0.5} distance={12} className="max-w-[720px]">
          <p className="text-[var(--fs-body-lg)] leading-[1.55] text-[var(--fg-secondary)]">
            {dict.home.hero.sub}
          </p>
        </SlideUp>

        <SlideUp
          delay={0.5}
          duration={0.4}
          distance={8}
          className="flex w-full flex-col items-stretch justify-center gap-[var(--space-3)] sm:w-auto sm:flex-row sm:items-center"
        >
          <Magnetic strength={0.18}>
            <Link
              href={`${lp}/request-access`}
              className="w-full sm:w-auto"
              onClick={() =>
                track("cta.request_access_click", { location: "hero" })
              }
            >
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                {dict.common.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </Magnetic>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="w-full sm:w-auto"
          >
            <a
              href="#demo"
              onClick={() =>
                track("cta.watch_demo_click", { location: "hero" })
              }
            >
              <Play className="h-4 w-4" />
              {dict.home.hero.watchDemo}
            </a>
          </Button>
          <a
            href={APP_LOGIN_URL}
            onClick={() => track("outbound.app_login_click", {})}
            className="hidden text-sm font-medium text-[var(--fg-muted)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-[var(--fg)] hover:underline md:inline-flex md:items-center md:gap-1"
          >
            {dict.common.ctaSignIn}
          </a>
        </SlideUp>

        <FadeIn delay={0.65} duration={0.4}>
          <div className="flex items-center gap-3 text-[11.5px] font-medium text-[var(--fg-muted)]">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 rounded-full bg-[#34c79a] opacity-40 animate-pulse-dot" />
              <span className="h-1 w-1 rounded-full bg-[#34c79a]" />
            </span>
            {isEs
              ? "Activación en menos de 24 horas · Sin tarjeta para empezar"
              : "Live in under 24 hours · No card to start"}
          </div>
        </FadeIn>

        <SlideUp
          delay={0.75}
          duration={0.8}
          distance={28}
          className="mt-[var(--space-12)] w-full"
        >
          <div id="demo" className="scroll-mt-32">
            <HeroCanvas locale={isEs ? "es" : "en"} />
          </div>
        </SlideUp>

        <FadeIn delay={0.95} duration={0.5}>
          <div className="mx-auto mt-[var(--space-16)] flex max-w-[920px] flex-col items-center gap-[var(--space-4)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-[var(--space-8)] sm:gap-y-[var(--space-3)]">
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
      </div>
    </section>
  );
}
