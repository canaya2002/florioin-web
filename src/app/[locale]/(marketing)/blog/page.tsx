import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/locales";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  BLOG_POSTS,
} from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: "Blog",
    description: isEs
      ? "Anuncios, guías de producto y casos de éxito de FlorioIn."
      : "FlorioIn announcements, product guides, and customer case studies.",
  };
}

export default async function BlogIndexPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;

  const sorted = [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          isEs
            ? "Cómo construimos. Cómo trabajan nuestros clientes. Qué aprendemos."
            : "How we build. How our customers work. What we learn."
        }
        description={
          isEs
            ? "Anuncios, guías de producto, casos de éxito y posts de ingeniería."
            : "Announcements, product guides, case studies, and engineering posts."
        }
      />

      <section className="container-default pb-12">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href={`${lp}/blog`}
              className="inline-flex rounded-full border border-[var(--primary)] bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)]"
            >
              {isEs ? "Todos" : "All"}
            </Link>
          </li>
          {BLOG_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                href={`${lp}/blog/category/${cat}`}
                className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-1.5 text-sm text-[var(--fg-secondary)] hover:border-[var(--primary)]/40 hover:text-[var(--fg)]"
              >
                {isEs
                  ? BLOG_CATEGORY_LABELS[cat].es
                  : BLOG_CATEGORY_LABELS[cat].en}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-default pb-24">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`${lp}/blog/${post.slug}`}
                className="group flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="primary">
                    {isEs
                      ? BLOG_CATEGORY_LABELS[post.category].es
                      : BLOG_CATEGORY_LABELS[post.category].en}
                  </Badge>
                  <span className="text-xs text-[var(--fg-muted)]">
                    {formatDate(post.publishedAt, lang)}
                  </span>
                </div>
                <h3 className="font-display text-[var(--fs-h4)] leading-tight tracking-tight">
                  {isEs ? post.title.es : post.title.en}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--fg-muted)]">
                  {isEs ? post.excerpt.es : post.excerpt.en}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm text-[var(--fg-muted)]">
                  <span>
                    {post.authorName} ·{" "}
                    {post.readMinutes} {isEs ? "min" : "min read"}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
