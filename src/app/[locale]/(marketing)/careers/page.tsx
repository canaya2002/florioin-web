import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/locales";
import { CAREERS } from "@/lib/careers";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Carreras" : "Careers",
    description: isEs
      ? "Únete a FlorioIn — un equipo pequeño construyendo una de las plataformas B2B más ambiciosas en LATAM."
      : "Join FlorioIn — a small team building one of the most ambitious B2B platforms in LATAM.",
  };
}

export default async function CareersIndexPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Trabaja con nosotros" : "Work with us"}
        title={
          isEs
            ? "Construye software que cambia cómo trabaja la gente"
            : "Build software that changes how people work"
        }
        description={
          isEs
            ? "FlorioIn es un equipo pequeño con un mandato grande. Buscamos personas que valoran el oficio sobre el ego, y la entrega sobre la perfección."
            : "FlorioIn is a small team with a big mandate. We hire people who value craft over ego, and shipping over perfection."
        }
      />

      <section className="container-default pb-16">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: { en: "Remote-first", es: "Remoto primero" },
              body: { en: "Async by default. CDMX hub for those who want it.", es: "Async por default. Hub en CDMX para quien lo quiera." },
            },
            {
              title: { en: "Real ownership", es: "Ownership real" },
              body: { en: "You own surfaces, not tickets.", es: "Eres dueño de superficies, no de tickets." },
            },
            {
              title: { en: "Compensation", es: "Compensación" },
              body: { en: "Above-market base + equity that means something.", es: "Base sobre mercado + equity que significa algo." },
            },
          ].map((perk) => (
            <div
              key={perk.title.en}
              className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg)] p-6"
            >
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {isEs ? perk.title.es : perk.title.en}
              </h3>
              <p className="mt-2 text-[15px] text-[var(--fg-muted)]">
                {isEs ? perk.body.es : perk.body.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-default pb-24">
        <h2 className="mb-6 font-display text-[var(--fs-h3)] tracking-tight">
          {isEs ? "Posiciones abiertas" : "Open positions"}
        </h2>
        <ul className="flex flex-col gap-3">
          {CAREERS.map((job) => (
            <li key={job.slug}>
              <Link
                href={`${lp}/careers/${job.slug}`}
                className="group flex flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)] md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="primary">
                      {isEs ? job.team.es : job.team.en}
                    </Badge>
                    <Badge variant="outline">
                      {isEs ? job.level.es : job.level.en}
                    </Badge>
                  </div>
                  <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                    {isEs ? job.title.es : job.title.en}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                    <MapPin className="h-4 w-4" aria-hidden />
                    {job.location} · {isEs ? job.type.es : job.type.en}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--fg-subtle)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
