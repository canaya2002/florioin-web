import { Quote, Star } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type TestimonialsProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Testimonials({ locale, dict }: TestimonialsProps) {
  const isEs = locale === "es";

  const items = [
    {
      quote: isEs
        ? "FlorioIn nos eliminó cuatro herramientas. El equipo dejó de saltar entre apps y por fin decide rápido."
        : "FlorioIn replaced four tools for us. The team stopped switching between apps and finally moves fast.",
      author: "María Reyes",
      role: isEs ? "Directora de Operaciones" : "Director of Operations",
      company: "Atlas Legal",
      metric: isEs ? "−4 apps · +38% throughput" : "−4 apps · +38% throughput",
      tint: "#ff8dda",
    },
    {
      quote: isEs
        ? "El Co-Piloto entiende nuestro contexto mejor que la mayoría de mis empleados nuevos. Es un cambio de nivel."
        : "Co-Pilot understands our context better than most of my new hires. It's a step-change.",
      author: "Juan Martínez",
      role: "CEO",
      company: "Mercado Norte",
      metric: isEs ? "9 h / persona / semana" : "9 h / person / week",
      tint: "#a88cff",
    },
    {
      quote: isEs
        ? "Pasamos de tres apps de tareas + Slack + Notion a sólo FlorioIn. Cuesta $3 por seat y entrega más."
        : "We went from three task apps + Slack + Notion to just FlorioIn. It's $3 a seat and does more.",
      author: "Laura Hernández",
      role: isEs ? "Líder de producto" : "Head of Product",
      company: "Pixel Studio",
      metric: isEs ? "$137 / seat ahorrado" : "$137 / seat saved",
      tint: "#38e4ff",
    },
  ];

  const radii = [
    "60px 96px 64px 80px / 80px 64px 96px 60px",
    "96px 60px 80px 64px / 60px 80px 64px 96px",
    "72px 96px 60px 84px / 84px 60px 96px 72px",
  ];

  return (
    <Container as="section" bleed className="bg-white">
      <div className="mx-auto mb-[var(--space-12)] max-w-[860px] text-center">
        <span className="eyebrow mb-[var(--space-3)] inline-block">
          {isEs ? "Lo dicen ellos" : "From the field"}
        </span>
        <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
          {dict.home.testimonials.title}
        </h2>
      </div>
      <Stagger
        className="grid gap-[var(--space-8)] md:grid-cols-3"
        staggerChildren={0.1}
      >
        {items.map((item, i) => (
          <StaggerItem
            key={item.author}
            className="group relative flex h-full flex-col gap-[var(--space-5)] overflow-hidden bg-white p-[var(--space-8)] transition-transform duration-[var(--duration-base)] hover:-translate-y-2"
            style={{ borderRadius: radii[i % radii.length] }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                animationDuration: "14s",
                animationDelay: `${i * -2.4}s`,
                mixBlendMode: "soft-light",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1/3 -z-10 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
              style={{
                background: `radial-gradient(55% 50% at 50% 0%, ${item.tint}30, transparent 65%)`,
              }}
            />

            <div className="flex items-center justify-between">
              <Quote aria-hidden className="h-8 w-8 text-[var(--primary)]/55" />
              <div className="flex items-center gap-0.5 text-[var(--accent)]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-current"
                    strokeWidth={0}
                  />
                ))}
              </div>
            </div>
            <p className="text-[17px] leading-relaxed text-[var(--fg)]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-[var(--space-2)]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#fafbfc] px-3 py-1 text-[11px] font-semibold text-[var(--fg)]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: item.tint }}
                />
                {item.metric}
              </span>
              <div className="flex items-center gap-[var(--space-3)]">
                <div
                  aria-hidden
                  className="grid h-11 w-11 place-items-center rounded-full font-semibold text-white"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  {item.author
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </div>
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
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
