import { Quote } from "lucide-react";

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

  // Placeholder data — Carlos will swap with real quotes once gathered.
  const items = [
    {
      quote: isEs
        ? "FlorioIn nos eliminó cuatro herramientas. El equipo dejó de saltar entre apps y por fin decide rápido."
        : "FlorioIn replaced four tools for us. The team stopped switching between apps and finally moves fast.",
      author: "María Reyes",
      role: isEs ? "Directora de Operaciones" : "Director of Operations",
      company: "Atlas Legal",
    },
    {
      quote: isEs
        ? "El Co-Piloto entiende nuestro contexto mejor que la mayoría de mis empleados nuevos. Es un cambio de nivel."
        : "Co-Pilot understands our context better than most of my new hires. It's a step-change.",
      author: "Juan Martínez",
      role: "CEO",
      company: "Mercado Norte",
    },
    {
      quote: isEs
        ? "Pasamos de tres apps de tareas + Slack + Notion a sólo FlorioIn. Cuesta $3 por seat y entrega más."
        : "We went from three task apps + Slack + Notion to just FlorioIn. It's $3 a seat and does more.",
      author: "Laura Hernández",
      role: isEs ? "Líder de producto" : "Head of Product",
      company: "Pixel Studio",
    },
  ];

  return (
    <Container as="section" bleed>
      <h2 className="mb-[var(--space-12)] max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
        {dict.home.testimonials.title}
      </h2>
      <Stagger
        className="grid gap-[var(--space-6)] md:grid-cols-3"
        staggerChildren={0.08}
      >
        {items.map((item) => (
          <StaggerItem
            key={item.author}
            className="group relative flex h-full flex-col gap-[var(--space-6)] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-glass)] bg-[var(--glass)] p-[var(--space-8)] backdrop-blur-[var(--blur-glass)] shadow-[var(--shadow-md)] transition-[box-shadow] duration-[var(--duration-base)] ease-[var(--ease-in-out)] hover:shadow-[var(--shadow-lg)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
            />
            <Quote
              aria-hidden
              className="h-8 w-8 text-[var(--primary)]/55"
            />
            <p className="text-[17px] leading-relaxed text-[var(--fg-secondary)]">
              {item.quote}
            </p>
            <div className="mt-auto flex items-center gap-[var(--space-3)] border-t border-[var(--border-glass)] pt-[var(--space-4)]">
              <div
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white shadow-[var(--shadow-button)]"
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
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}
