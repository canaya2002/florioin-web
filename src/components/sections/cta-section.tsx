"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/animations/magnetic";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type CtaSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function CtaSection({ locale, dict }: CtaSectionProps) {
  const lp = `/${locale}`;
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  return (
    <Container as="section" ref={containerRef} className="py-[var(--space-16)] lg:py-[var(--space-24)]">
      <motion.div
        className="relative isolate overflow-hidden rounded-[var(--radius-2xl)] px-[var(--space-8)] py-[80px] text-white shadow-[var(--shadow-xl)] md:px-[var(--space-16)]"
        style={{ 
          background: "var(--gradient-hero)",
          scale,
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      >
        {/* Animated background elements */}
        <motion.div 
          className="pointer-events-none absolute inset-0"
          style={{ y: backgroundY }}
        >
          {/* Floating orbs */}
          <motion.div
            className="absolute -left-20 top-1/4 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-20 bottom-1/4 h-[250px] w-[250px] rounded-full bg-white/10 blur-3xl"
            animate={{
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Inset glass slab */}
        <motion.div
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
        />

        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 opacity-[0.03]" />

        {/* Content */}
        <div className="relative mx-auto flex max-w-[780px] flex-col items-center gap-[var(--space-4)] text-center">
          {/* Eyebrow */}
          <motion.span 
            className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_EXPO }}
          >
            <Sparkles className="h-4 w-4" />
            {locale === "es" ? "Listo para empezar" : "Ready to start"}
          </motion.span>

          {/* Headline with text reveal */}
          <motion.h2
            className="font-display leading-[1.04] tracking-[-0.045em] text-white"
            style={{
              fontSize: "clamp(44px, 6.5vw, 88px)",
              textShadow: "0 2px 4px rgba(40,30,80,0.15)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
          >
            {dict.home.finalCta.title}
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            className="max-w-[560px] text-[17px] leading-[1.55] text-white/95"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 0.95, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_EXPO }}
          >
            {dict.home.finalCta.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="mt-[var(--space-6)] flex flex-wrap items-center justify-center gap-[var(--space-4)]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT_EXPO }}
          >
            <Magnetic strength={0.15}>
              <Link href={`${lp}/request-access`}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="group bg-white text-[var(--fg)] shadow-[0_12px_28px_rgba(60,40,120,0.30)] transition-all duration-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(60,40,120,0.40)]"
                >
                  {dict.common.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.15}>
              <Link href={`${lp}/contact`}>
                <Button
                  size="lg"
                  variant="ghost"
                  className="group border border-white/55 bg-white/15 text-white backdrop-blur transition-all duration-300 hover:bg-white/25 hover:text-white"
                >
                  {locale === "es" ? "Habla con ventas" : "Talk to sales"}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Trust indicator */}
          <motion.p
            className="mt-[var(--space-4)] text-[13px] text-white/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {locale === "es" 
              ? "Sin tarjeta de credito requerida · Configura en 5 minutos"
              : "No credit card required · Set up in 5 minutes"}
          </motion.p>
        </div>
      </motion.div>
    </Container>
  );
}
