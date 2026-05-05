import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/locales";
import { CUSTOMERS } from "@/lib/customers";
import { INDUSTRY_CONTENT } from "@/lib/industries";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Casos de éxito" : "Customer stories",
    description: isEs
      ? "Cómo equipos en LATAM y EE.UU. están usando FlorioIn para acelerar."
      : "How teams across LATAM and the US are using FlorioIn to accelerate.",
  };
}

export default async function CustomersIndexPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Casos de éxito" : "Customer stories"}
        title={
          isEs
            ? "Equipos reales. Resultados medibles."
            : "Real teams. Measurable outcomes."
        }
        description={
          isEs
            ? "Tres historias detalladas de cómo equipos están usando FlorioIn para reemplazar 3-5 herramientas y entregar más rápido."
            : "Three detailed stories of teams using FlorioIn to replace 3-5 tools and ship faster."
        }
      />

      <section className="container-default pb-24">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CUSTOMERS.map((customer) => (
            <li key={customer.slug}>
              <Link
                href={`${lp}/customers/${customer.slug}`}
                className="group flex h-full flex-col gap-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="primary">
                    {isEs
                      ? INDUSTRY_CONTENT[customer.industry].label.es
                      : INDUSTRY_CONTENT[customer.industry].label.en}
                  </Badge>
                  <ArrowUpRight className="h-5 w-5 text-[var(--fg-subtle)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[clamp(40px,5vw,72px)] leading-none tracking-tight text-gradient">
                    {customer.metric.en}
                  </span>
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  {isEs
                    ? customer.metricLabel.es
                    : customer.metricLabel.en}
                </p>

                <h3 className="font-display text-[var(--fs-h4)] leading-tight tracking-tight">
                  {customer.company}
                </h3>
                <p className="text-[15px] text-[var(--fg-muted)]">
                  {isEs ? customer.excerpt.es : customer.excerpt.en}
                </p>

                <div className="mt-auto border-t border-[var(--border)] pt-4 text-xs text-[var(--fg-muted)]">
                  {customer.size} · {customer.region}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
