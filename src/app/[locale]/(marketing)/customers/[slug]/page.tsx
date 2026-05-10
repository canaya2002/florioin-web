import { ArrowLeft, Quote } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd, breadcrumbSchema } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { CUSTOMERS, getCustomerStory } from "@/lib/customers";
import { INDUSTRY_CONTENT } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type PageParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const c of CUSTOMERS) {
      params.push({ locale, slug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const story = getCustomerStory(slug);
  if (!story) return { title: "Not found" };
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: `/customers/${slug}`,
    title: `${story.company} · ${isEs ? "Caso de éxito" : "Customer story"}`,
    description: isEs ? story.excerpt.es : story.excerpt.en,
    ogType: "article",
    publishedTime: story.publishedAt,
  });
}

export default async function CustomerStoryPage({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const story = getCustomerStory(slug);
  if (!story) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `/${lang}` },
          { name: isEs ? "Casos de éxito" : "Customer stories", url: `/${lang}/customers` },
          {
            name: story.company,
            url: `/${lang}/customers/${story.slug}`,
          },
        ])}
      />
      <article className="container-default pb-12 pt-20 md:pt-28">
        <Link
          href={`${lp}/customers`}
          className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEs ? "Todos los casos" : "All stories"}
        </Link>

        <header className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="flex flex-col gap-5">
            <Badge variant="primary">
              {isEs
                ? INDUSTRY_CONTENT[story.industry].label.es
                : INDUSTRY_CONTENT[story.industry].label.en}
            </Badge>
            <h1 className="font-display text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.04em]">
              {story.company}
            </h1>
            <p className="text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
              {isEs ? story.excerpt.es : story.excerpt.en}
            </p>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Detail label={isEs ? "Tamaño" : "Size"} value={story.size} />
              <Detail label={isEs ? "Región" : "Region"} value={story.region} />
              <Detail
                label={isEs ? "Publicado" : "Published"}
                value={formatDate(story.publishedAt, lang)}
              />
            </dl>
          </div>
          <div
            className="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] p-8 text-center md:p-10"
            style={{ background: "var(--gradient-card)" }}
          >
            <span className="font-display text-[clamp(48px,6.5vw,80px)] leading-[0.95] tracking-[-0.04em] text-gradient">
              {story.metric.en}
            </span>
            <span className="text-[15px] text-[var(--fg-secondary)]">
              {isEs ? story.metricLabel.es : story.metricLabel.en}
            </span>
          </div>
        </header>

        <figure className="my-16 rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-10 md:p-14">
          <Quote
            aria-hidden
            className="mb-4 h-10 w-10 text-[var(--primary)]/40"
          />
          <blockquote className="font-display text-[clamp(20px,2.4vw,30px)] leading-snug tracking-tight">
            “{isEs ? story.quote.text.es : story.quote.text.en}”
          </blockquote>
          <figcaption className="mt-4 text-sm">
            <span className="font-medium text-[var(--fg)]">
              {story.quote.author}
            </span>{" "}
            <span className="text-[var(--fg-muted)]">
              · {isEs ? story.quote.role.es : story.quote.role.en} ·{" "}
              {story.company}
            </span>
          </figcaption>
        </figure>

        <div className="flex max-w-2xl flex-col gap-10">
          {story.body.map((section, i) => (
            <section key={i} className="flex flex-col gap-3">
              <h2 className="font-display text-[var(--fs-h3)] tracking-tight">
                {isEs ? section.heading.es : section.heading.en}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[17px] leading-relaxed text-[var(--fg-secondary)]"
                >
                  {isEs ? p.es : p.en}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
        {label}
      </dt>
      <dd className="mt-1 text-[var(--fg)]">{value}</dd>
    </div>
  );
}
