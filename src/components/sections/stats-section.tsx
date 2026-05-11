"use client";

import { CountUp } from "@/components/animations/count-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type StatsSectionProps = {
  locale: Locale;
  dict: Dictionary;
};

export function StatsSection({ locale, dict }: StatsSectionProps) {
  const isEs = locale === "es";

  const stats = [
    {
      value: 10,
      suffix: "×",
      label: isEs ? "más rápido organizando" : "faster organizing work",
      sub: isEs ? "vs stack típico" : "vs typical stack",
      tint: "#ff8dda",
    },
    {
      value: 200,
      suffix: "+",
      label: isEs ? "integraciones disponibles" : "integrations available",
      sub: "API · webhooks · Zapier",
      tint: "#a88cff",
    },
    {
      value: 3,
      prefix: "$",
      label: isEs ? "USD / usuario / mes" : "USD / user / month",
      sub: isEs ? "sin tiers, sin trucos" : "no tiers, no tricks",
      tint: "#38e4ff",
    },
    {
      value: 99.99,
      suffix: "%",
      format: (n: number) => n.toFixed(2),
      label: isEs ? "uptime SLA" : "uptime SLA",
      sub: isEs ? "edge multi-región" : "multi-region edge",
      tint: "#f25bd8",
    },
  ];

  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <Container>
        <div className="mb-[var(--space-12)] text-center">
          <span className="eyebrow mb-2 inline-block">
            {isEs ? "Números reales" : "Real numbers"}
          </span>
          <h2 className="font-display text-[clamp(36px,5.5vw,72px)] leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">
            {dict.home.stats.title}
          </h2>
        </div>
        <Stagger
          className="grid grid-cols-2 gap-[var(--space-10)] sm:grid-cols-4"
          staggerChildren={0.1}
        >
          {stats.map((stat, i) => (
            <StaggerItem
              key={i}
              className="relative flex flex-col items-center gap-2 text-center"
            >
              {/* Floating tinted halo behind each number */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 -z-10 h-32 w-32 -translate-x-1/2 -translate-y-6 rounded-full opacity-50 blur-3xl animate-breathe"
                style={{
                  background: `radial-gradient(circle, ${stat.tint}55, transparent 65%)`,
                  animationDelay: `${i * -1.4}s`,
                }}
              />
              <div
                className="font-display text-[clamp(64px,7vw,116px)] leading-[0.9] tracking-[-0.055em]"
                style={{
                  background: `linear-gradient(135deg, ${stat.tint}, var(--c-violet))`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <CountUp
                  to={stat.value}
                  format={stat.format}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-[15px] font-medium leading-snug text-[var(--fg)]">
                {stat.label}
              </p>
              <p className="text-[11.5px] font-mono uppercase tracking-[0.14em] text-[var(--fg-muted)]">
                {stat.sub}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
