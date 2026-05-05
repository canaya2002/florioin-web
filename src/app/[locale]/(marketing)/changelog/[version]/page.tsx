import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import {
  CHANGELOG,
  CHANGELOG_TAG_COLORS,
  CHANGELOG_TAG_LABELS,
  getChangelogEntry,
} from "@/lib/changelog";
import { formatDate } from "@/lib/utils";

type PageParams = { params: Promise<{ locale: string; version: string }> };

export async function generateStaticParams() {
  const params: { locale: string; version: string }[] = [];
  for (const locale of locales) {
    for (const entry of CHANGELOG) {
      params.push({ locale, version: entry.version });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, version } = await params;
  const entry = getChangelogEntry(version);
  if (!entry) return { title: "Not found" };
  const isEs = locale === "es";
  return {
    title: `v${version} · ${isEs ? entry.title.es : entry.title.en}`,
    description: isEs ? entry.summary.es : entry.summary.en,
  };
}

export default async function ChangelogEntryPage({ params }: PageParams) {
  const { locale, version } = await params;
  if (!isLocale(locale)) notFound();
  const entry = getChangelogEntry(version);
  if (!entry) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <article className="container-default pb-12 pt-20 md:pt-28">
        <Link
          href={`${lp}/changelog`}
          className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEs ? "Todos los releases" : "All releases"}
        </Link>

        <header className="flex flex-col gap-4">
          <span className="eyebrow">v{entry.version}</span>
          <h1 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[1.05] tracking-[-0.04em]">
            {isEs ? entry.title.es : entry.title.en}
          </h1>
          <span className="text-sm text-[var(--fg-muted)]">
            {formatDate(entry.releasedAt, lang)}
          </span>
          <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
            {isEs ? entry.summary.es : entry.summary.en}
          </p>
        </header>

        <ul className="mt-12 flex max-w-2xl flex-col gap-3">
          {entry.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] p-4 text-[15px]"
            >
              <span
                className="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white"
                style={{ backgroundColor: CHANGELOG_TAG_COLORS[item.tag] }}
              >
                {isEs
                  ? CHANGELOG_TAG_LABELS[item.tag].es
                  : CHANGELOG_TAG_LABELS[item.tag].en}
              </span>
              <span className="text-[var(--fg-secondary)]">
                {isEs ? item.text.es : item.text.en}
              </span>
            </li>
          ))}
        </ul>
      </article>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
