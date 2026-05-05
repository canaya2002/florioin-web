import { ArrowRight, Check, Quote, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GradientPlaceholder } from "@/components/media/gradient-placeholder";
import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { INDUSTRIES, type Industry } from "@/lib/constants";
import { INDUSTRY_CONTENT } from "@/lib/industries";

type PageParams = {
  params: Promise<{ locale: string; industry: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; industry: string }[] = [];
  for (const locale of locales) {
    for (const industry of INDUSTRIES) {
      params.push({ locale, industry });
    }
  }
  return params;
}

function isIndustry(value: string): value is Industry {
  return (INDUSTRIES as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, industry } = await params;
  if (!isLocale(locale) || !isIndustry(industry)) {
    return { title: "Not found" };
  }
  const content = INDUSTRY_CONTENT[industry];
  const isEs = locale === "es";
  return {
    title: isEs ? content.label.es : content.label.en,
    description: isEs ? content.description.es : content.description.en,
  };
}

export default async function IndustryPage({ params }: PageParams) {
  const { locale, industry } = await params;
  if (!isLocale(locale)) notFound();
  if (!isIndustry(industry)) notFound();

  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const content = INDUSTRY_CONTENT[industry];
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={isEs ? content.label.es : content.label.en}
        title={isEs ? content.headline.es : content.headline.en}
        description={
          <p>{isEs ? content.description.es : content.description.en}</p>
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        secondaryCta={{
          href: `${lp}/solutions`,
          label: isEs ? "Ver todas las industrias" : "See all industries",
        }}
        visual={
          <div className="mx-auto max-w-5xl">
            <GradientPlaceholder
              className="aspect-[16/9] rounded-[var(--radius-xl)]"
              caption={
                isEs
                  ? `Workspace para ${content.label.es}`
                  : `Workspace for ${content.label.en}`
              }
            />
          </div>
        }
      />

      {/* Pain points */}
      <section className="container-wide section">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">
            {isEs ? "Los dolores que ya conoces" : "The pains you already know"}
          </span>
          <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs
              ? "Tres problemas que tu industria comparte"
              : "Three problems your industry shares"}
          </h2>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {content.painPoints.map((pain, i) => (
            <li
              key={i}
              className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-muted)] text-[var(--fg-muted)]"
              >
                <X className="h-5 w-5" />
              </span>
              <p className="text-[16px] leading-relaxed text-[var(--fg-secondary)]">
                {isEs ? pain.es : pain.en}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* How FlorioIn solves */}
      <section className="container-wide pb-24">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">
            {isEs ? "Cómo lo resuelve FlorioIn" : "How FlorioIn solves it"}
          </span>
          <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
            {isEs ? "Tres movimientos. Y todo cambia." : "Three moves. Everything shifts."}
          </h2>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {content.solutions.map((solution, i) => (
            <li
              key={i}
              className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7"
            >
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ background: "var(--gradient-hero)" }}
              >
                <Check className="h-5 w-5" />
              </span>
              <p className="text-[16px] leading-relaxed text-[var(--fg-secondary)]">
                {isEs ? solution.es : solution.en}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Quote */}
      <section className="container-default section">
        <figure className="relative mx-auto max-w-3xl rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-10 md:p-14">
          <Quote
            aria-hidden
            className="absolute right-8 top-8 h-12 w-12 text-[var(--primary)]/30"
          />
          <blockquote className="font-display text-[clamp(22px,2.6vw,32px)] leading-snug tracking-tight">
            “{isEs ? content.quote.text.es : content.quote.text.en}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5 text-sm">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full font-medium text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              {content.quote.author
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div className="flex flex-col">
              <span className="font-medium text-[var(--fg)]">
                {content.quote.author}
              </span>
              <span className="text-xs text-[var(--fg-muted)]">
                {(isEs ? content.quote.role.es : content.quote.role.en)} ·{" "}
                {content.quote.company}
              </span>
            </div>
          </figcaption>
        </figure>
      </section>

      {/* Template */}
      <section className="container-default pb-24">
        <div
          className="rounded-[var(--radius-2xl)] border border-[var(--border)] p-10 md:p-14"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">
                {isEs ? "Plantilla incluida" : "Template included"}
              </span>
              <h3 className="font-display text-[var(--fs-h3)] leading-tight tracking-tight">
                {isEs
                  ? "Tu workspace viene preconfigurado"
                  : "Your workspace ships pre-configured"}
              </h3>
              <p className="text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
                {isEs ? content.template.es : content.template.en}
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link href={`${lp}/request-access`}>
                <Button size="lg" variant="primary">
                  {dict.common.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={`${lp}/solutions`}
                className="text-sm text-[var(--fg-muted)] underline-offset-4 hover:underline"
              >
                {isEs ? "Ver otras industrias" : "See other industries"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
