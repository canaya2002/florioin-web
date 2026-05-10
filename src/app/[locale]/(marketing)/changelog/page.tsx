import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { isLocale, type Locale } from "@/i18n/locales";
import {
  CHANGELOG,
  CHANGELOG_TAG_COLORS,
  CHANGELOG_TAG_LABELS,
} from "@/lib/changelog";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "/changelog",
    title: "Changelog",
    description: isEs
      ? "Cada release de FlorioIn — qué cambia, qué mejora, qué se arregla."
      : "Every FlorioIn release — what's new, what's improved, what's fixed.",
  });
}

export default async function ChangelogIndexPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title={
          isEs ? "Cada release. Cada cambio." : "Every release. Every change."
        }
        description={
          isEs
            ? "Anuncios, mejoras de performance, arreglos y notas de seguridad."
            : "Announcements, perf wins, fixes, and security notes."
        }
      />

      <section className="container-default pb-24">
        <div className="flex flex-col gap-12">
          {CHANGELOG.map((entry) => (
            <article
              key={entry.version}
              className="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-8 md:flex-row md:p-10"
            >
              <div className="flex shrink-0 flex-col gap-1 md:w-44">
                <Link
                  href={`${lp}/changelog/${entry.version}`}
                  className="font-display text-[var(--fs-h3)] tracking-tight hover:text-[var(--primary)]"
                >
                  v{entry.version}
                </Link>
                <span className="text-sm text-[var(--fg-muted)]">
                  {formatDate(entry.releasedAt, lang)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                  {isEs ? entry.title.es : entry.title.en}
                </h3>
                <p className="text-[15px] text-[var(--fg-muted)]">
                  {isEs ? entry.summary.es : entry.summary.en}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {entry.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]">
                      <span
                        className="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white"
                        style={{
                          backgroundColor: CHANGELOG_TAG_COLORS[item.tag],
                        }}
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
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
