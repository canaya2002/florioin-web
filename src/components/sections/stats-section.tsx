"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { NumberCounter } from "@/components/animations/number-counter";
import { ParallaxLayer } from "@/components/animations/parallax-section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type StatsSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function StatsSection({ locale, dict }: StatsSectionProps) {
  const isEs = locale === "es";
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const stats = [
    {
      value: 10,
      suffix: "x",
      label: isEs ? "mas rapido organizando" : "faster organizing work",
      color: "var(--c-pink)",
    },
    {
      value: 200,
      suffix: "+",
      label: isEs ? "integraciones disponibles" : "integrations available",
      color: "var(--c-violet)",
    },
    {
      value: 3,
      prefix: "$",
      label: isEs ? "USD / usuario / mes" : "USD / user / month",
      color: "var(--c-cyan)",
    },
    {
      value: 99.99,
      suffix: "%",
      decimals: 2,
      label: isEs ? "uptime SLA" : "uptime SLA",
      color: "var(--c-magenta)",
    },
  ];

  return (
    <section ref={containerRef} className="section relative isolate overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxLayer speed={0.3} className="absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
            style={{
              background: "radial-gradient(ellipse at center, rgba(56, 228, 255, 0.15) 0%, transparent 60%)",
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>
      </div>

      <Container>
        <motion.div 
          className="gcard-interactive relative overflow-hidden px-[var(--space-6)] py-[var(--space-12)] md:px-[var(--space-12)] md:py-[var(--space-20)]"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          {/* Animated gradient background pulse */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 50% 50%, var(--c-violet), transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <ScrollReveal variant="fade-up" className="relative z-10">
            <h2 className="mb-[var(--space-12)] text-center font-display text-[var(--fs-h3)] tracking-tight">
              {dict.home.stats.title}
            </h2>
          </ScrollReveal>

          <div className="relative z-10 grid grid-cols-2 gap-[var(--space-8)] sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-[var(--space-3)] text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + i * 0.1,
                  ease: EASE_OUT_EXPO 
                }}
              >
                {/* Stat value with gradient */}
                <motion.div 
                  className="text-gradient-animated font-display text-[clamp(48px,6vw,80px)] leading-[1] tracking-tight"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <NumberCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                    duration={2.5}
                  />
                </motion.div>
                
                {/* Label */}
                <motion.p 
                  className="text-[15px] leading-snug text-[var(--fg-muted)]"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  {stat.label}
                </motion.p>
                
                {/* Animated underline */}
                <motion.div
                  className="h-0.5 rounded-full"
                  style={{ background: stat.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "40px" } : { width: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease: EASE_OUT_EXPO }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
