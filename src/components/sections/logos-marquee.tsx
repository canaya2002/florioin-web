"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/media/marquee";
import type { Dictionary } from "@/i18n/get-dictionary";

type LogosMarqueeProps = {
  dict: Dictionary;
};

const PLACEHOLDER_LOGOS = [
  "Atlas Legal",
  "Mercado Norte",
  "Pixel Studio",
  "Casa Verde",
  "Vitale Health",
  "Forge Capital",
  "Nido Inmobiliaria",
  "Brio Education",
  "Mapa Logistica",
  "Ludica Agency",
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function LogosMarquee({ dict }: LogosMarqueeProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  return (
    <Container size="wide" as="section" ref={containerRef} bleed>
      <ScrollReveal variant="fade-up">
        <motion.p 
          className="mb-[var(--space-10)] text-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--fg-muted)]"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          {dict.home.logos.title}
        </motion.p>
      </ScrollReveal>

      {/* First row - scrolls left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        
        <Marquee pauseOnHover>
          {PLACEHOLDER_LOGOS.map((name, index) => (
            <motion.div
              key={name}
              className="flex h-16 shrink-0 items-center justify-center px-[var(--space-10)]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="glass rounded-full px-6 py-3 font-display text-[clamp(18px,1.5vw,24px)] tracking-tight text-[var(--fg-secondary)] opacity-80 transition-all duration-300 hover:opacity-100 hover:shadow-[var(--shadow-md)]">
                {name}
              </span>
            </motion.div>
          ))}
        </Marquee>
      </motion.div>

      {/* Second row - scrolls right (reversed) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative mt-[var(--space-4)]"
      >
        {/* Gradient fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        
        <Marquee pauseOnHover reverse>
          {[...PLACEHOLDER_LOGOS].reverse().map((name, index) => (
            <motion.div
              key={`reverse-${name}`}
              className="flex h-16 shrink-0 items-center justify-center px-[var(--space-10)]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="glass rounded-full px-6 py-3 font-display text-[clamp(18px,1.5vw,24px)] tracking-tight text-[var(--fg-secondary)] opacity-80 transition-all duration-300 hover:opacity-100 hover:shadow-[var(--shadow-md)]">
                {name}
              </span>
            </motion.div>
          ))}
        </Marquee>
      </motion.div>
    </Container>
  );
}
