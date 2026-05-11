"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MoveRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Locale } from "@/i18n/locales";
import { PRICING } from "@/lib/constants";

type StackReplacementProps = {
  locale: Locale;
};

const STACK = [
  { name: "Asana", category: { en: "Tasks", es: "Tareas" }, cost: 24.99 },
  { name: "Notion", category: { en: "Docs", es: "Docs" }, cost: 15 },
  { name: "Slack", category: { en: "Chat", es: "Chat" }, cost: 12.5 },
  { name: "Loom", category: { en: "Video", es: "Video" }, cost: 12.5 },
  { name: "Zapier", category: { en: "Automations", es: "Automatizaciones" }, cost: 49 },
  { name: "ChatGPT Team", category: { en: "AI", es: "IA" }, cost: 25 },
  { name: "Calendly", category: { en: "Scheduling", es: "Agenda" }, cost: 12 },
  { name: "Google Forms+", category: { en: "Forms", es: "Forms" }, cost: 10 },
];

export function StackReplacement({ locale }: StackReplacementProps) {
  const isEs = locale === "es";
  const lp = `/${locale}`;
  const totalOld = STACK.reduce((sum, app) => sum + app.cost, 0);
  const savings = totalOld - PRICING.perSeat;
  const savingsPct = Math.round((savings / totalOld) * 100);

  return (
    <section
      id="stack"
      className="section relative isolate overflow-hidden bg-white scroll-mt-24"
    >
      <Container>
        <div className="mb-[var(--space-12)] flex flex-col items-start gap-[var(--space-4)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow-pill mb-[var(--space-4)] inline-flex">
              <span className="dot" aria-hidden />
              <span>{isEs ? "Reemplaza tu stack" : "Replace your stack"}</span>
            </span>
            <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]">
              {isEs ? (
                <>
                  Una factura.{" "}
                  <span className="text-gradient">Ocho herramientas menos.</span>
                </>
              ) : (
                <>
                  One invoice.{" "}
                  <span className="text-gradient">Eight fewer tools.</span>
                </>
              )}
            </h2>
            <p className="mt-[var(--space-4)] text-[var(--fs-body-lg)] text-[var(--fg-secondary)]">
              {isEs
                ? `FlorioIn reemplaza el stack que ya estás pagando. Mismo trabajo, ${savingsPct}% menos costo, cero context-switching.`
                : `FlorioIn replaces the stack you're already paying for. Same work, ${savingsPct}% lower cost, zero context-switching.`}
            </p>
          </div>
          <Link href={`${lp}/pricing`} className="shrink-0">
            <Button size="lg" variant="outline">
              {isEs ? "Ver pricing" : "See pricing"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-[var(--space-10)] lg:grid-cols-[1.3fr_1fr]">
          {/* Old stack — flowing pill cloud, no shadows */}
          <RevealOnScroll
            direction="left"
            distance={24}
            duration={0.7}
            className="relative flex flex-col gap-[var(--space-6)]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[20px] tracking-tight">
                {isEs ? "Lo que reemplazas" : "What you replace"}
              </h3>
              <span className="lozenge px-3 py-1 text-xs font-medium text-[var(--fg-muted)]">
                {isEs ? "stack típico" : "typical stack"}
              </span>
            </div>

            <ul className="flex flex-wrap gap-3">
              {STACK.map((app, i) => (
                <li
                  key={app.name}
                  className="lozenge group flex animate-breathe items-center gap-3 px-4 py-2.5 transition-transform duration-[var(--duration-base)] hover:-translate-y-1"
                  style={{
                    animationDelay: `${i * -0.6}s`,
                    animationDuration: `${7 + (i % 3)}s`,
                  }}
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i % 3 === 0
                          ? "#ff8dda"
                          : i % 3 === 1
                            ? "#a88cff"
                            : "#38e4ff",
                    }}
                  />
                  <span className="font-display text-[15px] leading-tight tracking-tight text-[var(--fg)] line-through decoration-[var(--danger)]/55 decoration-2 underline-offset-2">
                    {app.name}
                  </span>
                  <span className="text-[11.5px] text-[var(--fg-muted)]">
                    ${app.cost}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--fg-subtle)]">
                    {isEs ? app.category.es : app.category.en}
                  </span>
                </li>
              ))}
            </ul>

            <div className="lozenge flex items-baseline justify-between gap-4 px-6 py-4">
              <span className="text-[13px] font-medium uppercase tracking-wider text-[var(--fg-muted)]">
                {isEs ? "Total stack actual" : "Current stack total"}
              </span>
              <span className="font-display text-[clamp(32px,4vw,52px)] leading-none tracking-tight text-[var(--fg-secondary)] line-through decoration-[var(--danger)]/40 decoration-2">
                ${totalOld.toFixed(2)}
              </span>
            </div>
          </RevealOnScroll>

          {/* FlorioIn replacement — the morphing gradient IS the container.
              No outer white wrapper, no shadow, no rectangle hiding behind it. */}
          <RevealOnScroll
            direction="right"
            distance={24}
            duration={0.7}
            className="relative flex items-center justify-center"
          >
            <FlorioInBlob
              isEs={isEs}
              savings={savings}
              perSeat={PRICING.perSeat}
            />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

function FlorioInBlob({
  isEs,
  savings,
  perSeat,
}: {
  isEs: boolean;
  savings: number;
  perSeat: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Subtle scroll-bound float — the blob drifts ~24px through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return (
    <motion.div
      ref={ref}
      className="w-full max-w-[480px]"
      style={reduced ? undefined : { y: blobY }}
    >
      {/* The blob IS the surface. No inner rectangle, no underglow halo,
          no shadow. Single morphing gradient shape with px-based corners
          so content stays clearly inside the visible curve. */}
      <div
        className="relative isolate flex flex-col gap-5 overflow-hidden px-10 py-12 text-white animate-morph md:px-12"
        style={{
          background: "var(--gradient-hero)",
          borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
        }}
      >
        {/* Continuous sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
            animationDuration: "9s",
            mixBlendMode: "soft-light",
          }}
        />

        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/25 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-[13px] font-semibold uppercase tracking-wider">
            FlorioIn
          </span>
          <span className="ml-auto rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-mono backdrop-blur">
            {isEs ? "Una factura" : "One invoice"}
          </span>
        </div>

        <p className="text-[15px] leading-snug text-white/95">
          {isEs
            ? "Tasks, Docs, Chat, AI, Forms, Automations, Video — todo dentro."
            : "Tasks, Docs, Chat, AI, Forms, Automations, Video — all inside."}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="font-display text-[clamp(64px,8vw,104px)] leading-[0.88] tracking-[-0.05em] text-white animate-breathe">
            ${perSeat}
          </span>
          <span className="font-display text-[clamp(16px,1.5vw,22px)] leading-none tracking-tight text-white/90">
            USD
          </span>
        </div>
        <p className="-mt-3 text-[13px] text-white/85">
          {isEs ? "por usuario / mes" : "per seat / month"}
        </p>

        {/* Savings — flex column with no fixed-width pill, so it can't
            push text outside the blob's organic shape. */}
        <div className="flex flex-col gap-1.5 rounded-[32px] bg-white/18 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-white">
              {isEs ? "Ahorras / seat / mes" : "You save / seat / month"}
            </span>
            <span className="inline-flex items-center gap-1 font-display text-[clamp(20px,2vw,26px)] leading-none tracking-tight text-white">
              <MoveRight className="h-3.5 w-3.5" />${savings.toFixed(2)}
            </span>
          </div>
          <p className="text-[11.5px] leading-snug text-white/80">
            {isEs
              ? `~$${(savings * 50 * 12).toLocaleString()} al año en un equipo de 50`
              : `~$${(savings * 50 * 12).toLocaleString()} a year on a 50-person team`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
