"use client";

import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";

import { ParallaxLayer } from "@/components/animations/parallax-section";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { TiltCard } from "@/components/animations/magnetic";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type TestimonialsProps = {
  locale: Locale;
  dict: Dictionary;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Testimonials({ locale, dict }: TestimonialsProps) {
  const isEs = locale === "es";
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const items = [
    {
      quote: isEs
        ? "FlorioIn nos elimino cuatro herramientas. El equipo dejo de saltar entre apps y por fin decide rapido."
        : "FlorioIn replaced four tools for us. The team stopped switching between apps and finally moves fast.",
      author: "Maria Reyes",
      role: isEs ? "Directora de Operaciones" : "Director of Operations",
      company: "Atlas Legal",
      rating: 5,
    },
    {
      quote: isEs
        ? "El Co-Piloto entiende nuestro contexto mejor que la mayoria de mis empleados nuevos. Es un cambio de nivel."
        : "Co-Pilot understands our context better than most of my new hires. It's a step-change.",
      author: "Juan Martinez",
      role: "CEO",
      company: "Mercado Norte",
      rating: 5,
    },
    {
      quote: isEs
        ? "Pasamos de tres apps de tareas + Slack + Notion a solo FlorioIn. Cuesta $3 por seat y entrega mas."
        : "We went from three task apps + Slack + Notion to just FlorioIn. It's $3 a seat and does more.",
      author: "Laura Hernandez",
      role: isEs ? "Lider de producto" : "Head of Product",
      company: "Pixel Studio",
      rating: 5,
    },
  ];

  return (
    <section ref={containerRef} className="section relative isolate overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxLayer speed={0.4} className="absolute inset-0">
          <motion.div
            className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(255, 141, 218, 0.2) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </ParallaxLayer>
      </div>

      <Container>
        <ScrollReveal variant="fade-up" className="mx-auto mb-[var(--space-16)] max-w-[760px] text-center">
          <motion.span 
            className="eyebrow-pill mb-[var(--space-4)] inline-flex"
            whileHover={{ scale: 1.02 }}
          >
            <span className="dot" aria-hidden />
            {isEs ? "Testimonios" : "Testimonials"}
          </motion.span>
          <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.035em]">
            {dict.home.testimonials.title}
          </h2>
        </ScrollReveal>

        <div className="grid gap-[var(--space-6)] md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2 + index * 0.15,
                ease: EASE_OUT_EXPO 
              }}
            >
              <TiltCard maxRotation={6} scale={1.02} className="h-full">
                <div className="gcard-interactive group relative flex h-full flex-col gap-[var(--space-6)] p-[var(--space-8)]">
                  {/* Top highlight */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  />
                  
                  {/* Quote icon with animation */}
                  <motion.div
                    initial={{ rotate: -10, opacity: 0.5 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Quote
                      aria-hidden
                      className="h-8 w-8 text-[var(--primary)]/55"
                    />
                  </motion.div>
                  
                  {/* Star rating */}
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.4 + index * 0.1 + i * 0.05,
                          ease: EASE_OUT_EXPO 
                        }}
                      >
                        <Star className="h-4 w-4 fill-[var(--c-pink)] text-[var(--c-pink)]" />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Quote text */}
                  <p className="text-[17px] leading-relaxed text-[var(--fg-secondary)]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  
                  {/* Author info */}
                  <div className="mt-auto flex items-center gap-[var(--space-3)] border-t border-[var(--border-glass)] pt-[var(--space-4)]">
                    <motion.div
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-full font-semibold text-white shadow-[var(--shadow-button)]"
                      style={{ background: "var(--gradient-hero)" }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.author
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[var(--fg)]">
                        {item.author}
                      </span>
                      <span className="text-xs text-[var(--fg-muted)]">
                        {item.role} · {item.company}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
