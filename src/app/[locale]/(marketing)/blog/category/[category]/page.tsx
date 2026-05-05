import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  type BlogCategory,
  getBlogPostsByCategory,
} from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type PageParams = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of locales) {
    for (const category of BLOG_CATEGORIES) {
      params.push({ locale, category });
    }
  }
  return params;
}

function isCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, category } = await params;
  if (!isCategory(category)) return { title: "Not found" };
  const isEs = locale === "es";
  const label = isEs
    ? BLOG_CATEGORY_LABELS[category].es
    : BLOG_CATEGORY_LABELS[category].en;
  return { title: `${label} · Blog` };
}

export default async function BlogCategoryPage({ params }: PageParams) {
  const { locale, category } = await params;
  if (!isLocale(locale)) notFound();
  if (!isCategory(category)) notFound();

  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;
  const posts = getBlogPostsByCategory(category).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const label = isEs
    ? BLOG_CATEGORY_LABELS[category].es
    : BLOG_CATEGORY_LABELS[category].en;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={label}
        description={
          isEs ? "Posts en esta categoría." : "Posts in this category."
        }
      />

      <section className="container-default pb-12">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href={`${lp}/blog`}
              className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-1.5 text-sm hover:border-[var(--primary)]/40"
            >
              {isEs ? "Todos" : "All"}
            </Link>
          </li>
          {BLOG_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                href={`${lp}/blog/category/${cat}`}
                className={
                  cat === category
                    ? "inline-flex rounded-full border border-[var(--primary)] bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)]"
                    : "inline-flex rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-1.5 text-sm hover:border-[var(--primary)]/40"
                }
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
        {posts.length === 0 ? (
          <p className="text-[var(--fg-muted)]">
            {isEs ? "Aún no hay posts aquí." : "No posts here yet."}
          </p>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`${lp}/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="primary">{label}</Badge>
                    <span className="text-xs text-[var(--fg-muted)]">
                      {formatDate(post.publishedAt, lang)}
                    </span>
                  </div>
                  <h3 className="font-display text-[var(--fs-h4)] leading-tight tracking-tight">
                    {isEs ? post.title.es : post.title.en}
                  </h3>
                  <p className="text-[15px] text-[var(--fg-muted)]">
                    {isEs ? post.excerpt.es : post.excerpt.en}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm text-[var(--fg-muted)]">
                    <span>{post.authorName}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
