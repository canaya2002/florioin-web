import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { BLOG_CATEGORY_LABELS, BLOG_POSTS, getBlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type PageParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not found" };
  const isEs = locale === "es";
  return {
    title: isEs ? post.title.es : post.title.en,
    description: isEs ? post.excerpt.es : post.excerpt.en,
  };
}

export default async function BlogPostPage({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();

  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <article className="container-default pt-20 pb-16 md:pt-28">
        <Link
          href={`${lp}/blog`}
          className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEs ? "Volver al blog" : "Back to blog"}
        </Link>

        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">
              {isEs
                ? BLOG_CATEGORY_LABELS[post.category].es
                : BLOG_CATEGORY_LABELS[post.category].en}
            </Badge>
            <span className="text-sm text-[var(--fg-muted)]">
              {formatDate(post.publishedAt, lang)} ·{" "}
              {post.readMinutes} {isEs ? "min de lectura" : "min read"}
            </span>
          </div>
          <h1 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[1.05] tracking-[-0.04em]">
            {isEs ? post.title.es : post.title.en}
          </h1>
          <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
            {isEs ? post.excerpt.es : post.excerpt.en}
          </p>
          <div className="flex items-center gap-3 border-t border-[var(--border)] pt-6 text-sm">
            <span
              aria-hidden
              className="inline-flex h-10 w-10 items-center justify-center rounded-full font-medium text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              {post.authorName
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div className="flex flex-col">
              <span className="font-medium text-[var(--fg)]">
                {post.authorName}
              </span>
              <span className="text-xs text-[var(--fg-muted)]">
                {isEs ? post.authorRole.es : post.authorRole.en}
              </span>
            </div>
          </div>
        </header>

        <div className="prose-custom mt-16 flex max-w-2xl flex-col gap-10">
          {post.body.map((section, i) => (
            <section key={i} className="flex flex-col gap-4">
              {section.heading && (
                <h2 className="font-display text-[var(--fs-h3)] leading-tight tracking-tight">
                  {isEs ? section.heading.es : section.heading.en}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="text-[17px] leading-[1.7] text-[var(--fg-secondary)]"
                >
                  {isEs ? p.es : p.en}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link href={`${lp}/request-access`}>
            <Button size="lg" variant="primary">
              {dict.common.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`${lp}/blog`}>
            <Button size="lg" variant="outline">
              {isEs ? "Más posts" : "More posts"}
            </Button>
          </Link>
        </div>
      </article>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
