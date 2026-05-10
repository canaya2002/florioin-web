import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import {
  RESOURCES,
  RESOURCE_TYPE_LABELS,
  getResource,
} from "@/lib/resources";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type PageParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const resource of RESOURCES) {
      params.push({ locale, slug: resource.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const resource = getResource(slug);
  if (!resource) return { title: "Not found" };
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: `/resources/${slug}`,
    title: isEs ? resource.title.es : resource.title.en,
    description: isEs ? resource.description.es : resource.description.en,
    ogType: "article",
    publishedTime: resource.publishedAt,
  });
}

export default async function ResourceDetailPage({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const resource = getResource(slug);
  if (!resource) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <article className="container-default pb-12 pt-20 md:pt-28">
        <Link
          href={`${lp}/resources`}
          className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEs ? "Todos los recursos" : "All resources"}
        </Link>

        <header className="flex flex-col gap-5">
          <Badge variant="primary">
            {isEs
              ? RESOURCE_TYPE_LABELS[resource.type].es
              : RESOURCE_TYPE_LABELS[resource.type].en}
          </Badge>
          <h1 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[1.05] tracking-[-0.04em]">
            {isEs ? resource.title.es : resource.title.en}
          </h1>
          <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
            {isEs ? resource.longDescription.es : resource.longDescription.en}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--fg-muted)]">
            <span>{formatDate(resource.publishedAt, lang)}</span>
            {resource.pageCount && (
              <span>
                · {resource.pageCount} {isEs ? "páginas" : "pages"}
              </span>
            )}
            {resource.duration && <span>· {resource.duration}</span>}
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={`${lp}/request-access`}>
              <Button size="lg" variant="primary">
                <Download className="h-4 w-4" />
                {isEs ? "Descargar" : "Download"}
              </Button>
            </Link>
            <span className="text-sm text-[var(--fg-muted)]">
              {isEs
                ? "Pedimos tu email para enviártelo."
                : "We'll ask for your email to send it over."}
            </span>
          </div>
        </header>

        <div className="mt-16 flex max-w-2xl flex-col gap-10">
          {resource.body.map((section, i) => (
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
