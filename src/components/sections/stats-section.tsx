"use client";

import { CountUp } from "@/components/animations/count-up";
import { Stagger, StaggerItem } from "@/components/animations/stagger";
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
    <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)] py-20">
      <div className="container-default">
        <h2 className="mb-12 text-center font-display text-[var(--fs-h3)] tracking-tight">
          {dict.home.stats.title}
        </h2>
        <Stagger className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <StaggerItem key={i} className="flex flex-col items-center gap-2 text-center">
              <div className="font-display text-[clamp(48px,6vw,80px)] leading-none tracking-tight">
                <CountUp
                  to={stat.value}
                  format={stat.format}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-[15px] text-[var(--fg-muted)]">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
