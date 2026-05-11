"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/animations/magnetic";
import { ParallaxLayer } from "@/components/animations/parallax-section";
import { TextReveal } from "@/components/animations/text-reveal";
import { Container } from "@/components/layout/container";
import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { Button } from "@/components/ui/button";
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

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero({ locale, dict }: HeroProps) {
  const lp = `/${locale}`;
  const isEs = locale === "es";
  const industries = isEs ? TRUST_INDUSTRIES_ES : TRUST_INDUSTRIES_EN;
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-[var(--space-20)] pt-[140px] lg:pb-[var(--space-32)] lg:pt-[180px]"
    >
      {/* Animated background blobs with parallax */}
      <motion.div 
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        {/* Primary gradient glow */}
        <div className="absolute left-1/2 top-0 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/4">
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: "radial-gradient(ellipse at center, rgba(168, 140, 255, 0.25) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Floating blobs */}
        <ParallaxLayer speed={0.3} className="absolute inset-0">
          <motion.div
            className="blob blob--pink absolute left-[10%] top-[20%] h-[400px] w-[400px]"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.5} className="absolute inset-0">
          <motion.div
            className="blob blob--violet absolute right-[15%] top-[10%] h-[500px] w-[500px]"
            animate={{
              x: [0, -50, 0],
              y: [0, 40, 0],
              scale: [1, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.7} className="absolute inset-0">
          <motion.div
            className="blob blob--cyan absolute bottom-[20%] left-[20%] h-[350px] w-[350px]"
            animate={{
              x: [0, 40, 0],
              y: [0, 50, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>

        {/* Subtle noise overlay */}
        <div className="noise-overlay absolute inset-0" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative flex flex-col items-center gap-[var(--space-8)] text-center">
          {/* Eyebrow pill with shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            <span className="eyebrow-pill shimmer group cursor-default transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
              <motion.span 
                className="dot" 
                aria-hidden
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Sparkles className="h-3.5 w-3.5 text-[var(--c-violet)]" />
              <span>{dict.home.hero.eyebrow}</span>
            </span>
          </motion.div>

          {/* Main headline with text reveal */}
          <motion.h1 
            className="mx-auto max-w-[1000px] font-display text-[clamp(44px,7vw,96px)] leading-[1.02] tracking-[-0.045em] text-[var(--fg)] [text-wrap:balance]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <TextReveal delay={0.3} staggerChildren={0.05}>
              {dict.home.hero.headlinePrefix}
            </TextReveal>{" "}
            <span className="relative inline-block">
              <motion.span 
                className="text-gradient-animated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO }}
              >
                {dict.home.hero.headlineHighlight}
              </motion.span>
              {/* Animated underline */}
              <motion.span
                className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-gradient-to-r from-[var(--c-pink)] via-[var(--c-violet)] to-[var(--c-cyan)]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1, ease: EASE_OUT_EXPO }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="max-w-[720px] text-[var(--fs-body-lg)] leading-[1.6] text-[var(--fg-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT_EXPO }}
          >
            {dict.home.hero.sub}
          </motion.p>

          {/* CTAs with magnetic effect */}
          <motion.div
            className="flex w-full flex-col items-stretch justify-center gap-[var(--space-4)] sm:w-auto sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT_EXPO }}
          >
            <Magnetic strength={0.15}>
              <Link href={`${lp}/request-access`} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="primary" 
                  className="glow-pulse group w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {dict.common.ctaPrimary}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.15}>
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="group w-full sm:w-auto"
              >
                <a href="#demo" className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--glass)] transition-colors duration-300 group-hover:bg-[var(--glass-strong)]">
                    <Play className="h-3.5 w-3.5 fill-current" />
                  </span>
                  {dict.home.hero.watchDemo}
                </a>
              </Button>
            </Magnetic>
            
            <motion.a
              href={APP_LOGIN_URL}
              className="hidden text-sm font-medium text-[var(--fg-muted)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-[var(--fg)] hover:underline md:inline-flex md:items-center md:gap-1"
              whileHover={{ x: 2 }}
            >
              {dict.common.ctaSignIn}
              <ArrowRight className="h-3 w-3" />
            </motion.a>
          </motion.div>

          {/* Demo video container with hover effects */}
          <motion.div
            className="mt-[var(--space-16)] w-full"
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 1.1, ease: EASE_OUT_EXPO }}
          >
            <motion.div
              id="demo"
              className="gcard-interactive relative mx-auto w-full max-w-[1120px] scroll-mt-32 p-[14px]"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              {/* Top highlight */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-[32px] top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
              />
              
              {/* Animated border on hover */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
                style={{
                  background: "linear-gradient(135deg, var(--c-pink), var(--c-violet), var(--c-cyan))",
                  padding: "1px",
                  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                whileHover={{ opacity: 0.6 }}
              />
              
              <GradientPlaceholder
                className="aspect-[16/10] rounded-[var(--radius-xl)]"
                variant="dawn"
                caption="Hero demo · drop into public/videos/hero/"
              />
              
              {/* Floating UI elements inside the demo */}
              <motion.div
                className="absolute -right-4 top-1/4 hidden lg:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="glass rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-lg)]">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--c-pink)] to-[var(--c-violet)]" />
                    <div className="space-y-1">
                      <div className="h-3 w-20 rounded bg-[var(--bg-muted)]" />
                      <div className="h-2 w-14 rounded bg-[var(--bg-muted)]" />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -left-4 bottom-1/4 hidden lg:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="glass rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-lg)]">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--c-cyan)] to-[var(--c-violet)]" />
                    <div className="h-3 w-16 rounded bg-[var(--bg-muted)]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Trust badges with stagger */}
          <motion.div 
            className="mx-auto mt-[var(--space-12)] flex max-w-[920px] flex-col items-center gap-[var(--space-4)] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-[var(--space-8)] sm:gap-y-[var(--space-3)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE_OUT_EXPO }}
          >
            <motion.span 
              className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              {dict.home.hero.trustLabel}
            </motion.span>
            <ul className="flex flex-wrap items-center justify-center gap-x-[var(--space-6)] gap-y-[var(--space-2)]">
              {industries.map((industry, i) => (
                <motion.li
                  key={industry}
                  className="font-display text-[15px] tracking-[-0.02em] text-[var(--fg-secondary)] transition-colors duration-300 hover:text-[var(--fg)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1.5 + i * 0.05,
                    ease: EASE_OUT_EXPO 
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {industry}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
