"use client";

import { motion, useInView } from "framer-motion";
import { Mic, Sparkles, CircleCheck, ArrowRight } from "lucide-react";
import { useRef } from "react";

import { TiltCard } from "@/components/animations/magnetic";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";

type HowItWorksProps = {
  dict: Dictionary;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function HowItWorks({ dict }: HowItWorksProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: Mic,
      title: dict.home.how.steps.speak.title,
      description: dict.home.how.steps.speak.description,
      gradient: "from-[var(--c-pink)] to-[var(--c-magenta)]",
    },
    {
      icon: Sparkles,
      title: dict.home.how.steps.infer.title,
      description: dict.home.how.steps.infer.description,
      gradient: "from-[var(--c-violet)] to-[var(--c-pink)]",
    },
    {
      icon: CircleCheck,
      title: dict.home.how.steps.ship.title,
      description: dict.home.how.steps.ship.description,
      gradient: "from-[var(--c-cyan)] to-[var(--c-violet)]",
    },
  ];

  return (
    <Container as="section" ref={containerRef} bleed>
      <ScrollReveal variant="fade-up" className="mx-auto mb-[var(--space-16)] max-w-[760px] text-center">
        <motion.span 
          className="eyebrow-pill mb-[var(--space-4)] inline-flex"
          whileHover={{ scale: 1.02 }}
        >
          <span className="dot" aria-hidden />
          {dict.home.how.eyebrow}
        </motion.span>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em]">
          {dict.home.how.title}
        </h2>
      </ScrollReveal>

      {/* Connecting line between steps */}
      <div className="relative">
        {/* Animated progress line (desktop only) */}
        <motion.div
          className="absolute left-0 right-0 top-[120px] hidden h-[2px] md:block"
          style={{
            background: "linear-gradient(90deg, transparent, var(--border-glass) 10%, var(--border-glass) 90%, transparent)",
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--c-pink)] via-[var(--c-violet)] to-[var(--c-cyan)]"
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: EASE_OUT_EXPO }}
          />
        </motion.div>

        <ol className="relative grid gap-[var(--space-6)] md:grid-cols-3 md:gap-[var(--space-8)]">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const number = `0${i + 1}`;
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 + i * 0.15,
                  ease: EASE_OUT_EXPO 
                }}
              >
                <TiltCard maxRotation={6} scale={1.02}>
                  <div className="gcard-interactive flex h-full min-h-[280px] flex-col gap-[var(--space-5)] p-[var(--space-8)]">
                    {/* Step header */}
                    <div className="flex items-center gap-[var(--space-3)]">
                      <motion.span 
                        className="font-mono text-[12px] tracking-[0.08em] text-[var(--fg-muted)]"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                      >
                        {number}
                      </motion.span>
                      <motion.span
                        aria-hidden
                        className="h-px flex-1"
                        style={{
                          background: "linear-gradient(90deg, var(--border-strong), transparent)",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                      />
                      
                      {/* Animated icon */}
                      <motion.span
                        aria-hidden
                        className={`grid h-11 w-11 place-items-center rounded-[14px] border bg-gradient-to-br ${step.gradient} shadow-lg`}
                        style={{
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={isInView ? {
                          boxShadow: [
                            "0 0 0 0 rgba(168, 140, 255, 0)",
                            "0 0 20px 4px rgba(168, 140, 255, 0.3)",
                            "0 0 0 0 rgba(168, 140, 255, 0)",
                          ],
                        } : {}}
                        transition={{ 
                          boxShadow: { 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.3,
                            repeatDelay: 1 
                          },
                          scale: { duration: 0.2 },
                          rotate: { duration: 0.2 },
                        }}
                      >
                        <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                      </motion.span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display text-[26px] leading-[1.15] tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-[15px] leading-[1.6] text-[var(--fg-secondary)]">
                      {step.description}
                    </p>
                    
                    {/* Animated arrow indicator */}
                    <motion.div 
                      className="mt-auto flex items-center gap-2 text-[var(--primary)]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                    >
                      {i < steps.length - 1 && (
                        <>
                          <span className="text-sm font-medium">
                            {i === 0 ? "Then" : "Finally"}
                          </span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Container>
  );
}
