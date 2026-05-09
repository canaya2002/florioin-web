"use client";

import { CountUp } from "@/components/animations/count-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { Container } from "@/components/layout/container";
import { FloatingBlobs } from "@/components/ui/floating-blobs";
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
    },
    {
      value: 200,
      suffix: "+",
      label: isEs ? "integraciones disponibles" : "integrations available",
    },
    {
      value: 3,
      prefix: "$",
      label: isEs ? "USD / usuario / mes" : "USD / user / month",
    },
    {
      value: 99.99,
      suffix: "%",
      format: (n: number) => n.toFixed(2),
      label: isEs ? "uptime SLA" : "uptime SLA",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden py-[var(--space-16)] lg:py-[var(--space-20)]">
      <FloatingBlobs variant="cyan" />
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-glass)] bg-[var(--glass)] px-[var(--space-6)] py-[var(--space-12)] backdrop-blur-[var(--blur-glass)] backdrop-saturate-[140%] shadow-[var(--shadow-lg)] md:px-[var(--space-12)] md:py-[var(--space-16)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
          />
          <h2 className="mb-[var(--space-12)] text-center font-display text-[var(--fs-h3)] tracking-tight">
            {dict.home.stats.title}
          </h2>
          <Stagger
            className="grid grid-cols-2 gap-[var(--space-8)] sm:grid-cols-4"
            staggerChildren={0.08}
          >
            {stats.map((stat, i) => (
              <StaggerItem
                key={i}
                className="flex flex-col items-center gap-[var(--space-2)] text-center"
              >
                <div className="text-gradient font-display text-[clamp(40px,5vw,72px)] leading-[1] tracking-tight">
                  <CountUp
                    to={stat.value}
                    format={stat.format}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-[15px] leading-snug text-[var(--fg-muted)]">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
