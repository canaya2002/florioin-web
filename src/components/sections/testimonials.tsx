import { Quote } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/animations/stagger";
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
    <section className="container-default section">
      <h2 className="mb-12 max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
        {dict.home.testimonials.title}
      </h2>
      <Stagger className="grid gap-6 md:grid-cols-3" staggerChildren={0.12}>
        {items.map((item) => (
          <StaggerItem
            key={item.author}
            className="relative flex flex-col gap-6 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-8"
          >
            <Quote
              aria-hidden
              className="h-7 w-7 text-[var(--primary)]/60"
            />
            <p className="text-[17px] leading-relaxed text-[var(--fg-secondary)]">
              {item.quote}
            </p>
            <div className="mt-auto flex items-center gap-3 border-t border-[var(--border)] pt-4">
              <div
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full font-medium text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                {item.author
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[var(--fg)]">
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
    </section>
  );
}
