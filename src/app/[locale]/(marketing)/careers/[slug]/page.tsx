import { ArrowLeft, Check, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { CAREERS, getCareer } from "@/lib/careers";

type PageParams = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const job of CAREERS) {
      params.push({ locale, slug: job.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageParams) {
  const { locale, slug } = await params;
  const job = getCareer(slug);
  if (!job) return { title: "Not found" };
  const isEs = locale === "es";
  return {
    title: `${isEs ? job.title.es : job.title.en} · Careers`,
    description: isEs ? job.summary.es : job.summary.en,
  };
}

export default async function CareerJobPage({ params }: PageParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const job = getCareer(slug);
  if (!job) notFound();
  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;
  const subject = encodeURIComponent(
    `Application: ${isEs ? job.title.es : job.title.en}`,
  );

  return (
    <article className="container-default pb-24 pt-20 md:pt-28">
      <Link
        href={`${lp}/careers`}
        className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
      >
        <ArrowLeft className="h-4 w-4" />
        {isEs ? "Todas las posiciones" : "All positions"}
      </Link>

      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">{isEs ? job.team.es : job.team.en}</Badge>
          <Badge variant="outline">{isEs ? job.level.es : job.level.en}</Badge>
        </div>
        <h1 className="font-display text-[clamp(40px,5.5vw,80px)] leading-[1.05] tracking-[-0.04em]">
          {isEs ? job.title.es : job.title.en}
        </h1>
        <p className="flex items-center gap-2 text-[var(--fg-muted)]">
          <MapPin className="h-4 w-4" aria-hidden /> {job.location} ·{" "}
          {isEs ? job.type.es : job.type.en}
        </p>
        <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
          {isEs ? job.summary.es : job.summary.en}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a href={`mailto:carlos@florioin.com?subject=${subject}`}>
            <Button size="lg" variant="primary">
              {isEs ? "Aplicar" : "Apply"}
              <Sparkles className="h-4 w-4" />
            </Button>
          </a>
          <a
            href={`mailto:carlos@florioin.com?subject=${subject}`}
            className="text-sm text-[var(--fg-muted)] underline-offset-4 hover:underline"
          >
            carlos@florioin.com
          </a>
        </div>
      </header>

      <div className="mt-16 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-12">
          <Section
            title={isEs ? "Sobre el equipo" : "About the team"}
            body={isEs ? job.about.es : job.about.en}
          />
          <CheckList
            title={isEs ? "Qué vas a hacer" : "What you'll do"}
            items={job.responsibilities.map((r) => (isEs ? r.es : r.en))}
          />
          <CheckList
            title={isEs ? "Qué necesitas" : "What we need"}
            items={job.requirements.map((r) => (isEs ? r.es : r.en))}
          />
          {job.bonus.length > 0 && (
            <CheckList
              title={isEs ? "Bonus" : "Nice to have"}
              items={job.bonus.map((b) => (isEs ? b.es : b.en))}
              dim
            />
          )}
        </div>

        <aside className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
          <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
            {isEs ? "Cómo aplicar" : "How to apply"}
          </h3>
          <p className="mt-3 text-[15px] text-[var(--fg-muted)]">
            {isEs
              ? "Mándanos un email con tu CV o LinkedIn y un párrafo sobre por qué este rol. Sin formularios largos."
              : "Send us an email with your CV or LinkedIn and a paragraph about why this role. No long forms."}
          </p>
          <a
            href={`mailto:carlos@florioin.com?subject=${subject}`}
            className="mt-4 inline-block font-medium text-[var(--primary)] underline-offset-4 hover:underline"
          >
            carlos@florioin.com
          </a>
        </aside>
      </div>
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-[var(--fs-h3)] tracking-tight">
        {title}
      </h2>
      <p className="text-[17px] leading-relaxed text-[var(--fg-secondary)]">
        {body}
      </p>
    </section>
  );
}

function CheckList({
  title,
  items,
  dim,
}: {
  title: string;
  items: string[];
  dim?: boolean;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-[var(--fs-h3)] tracking-tight">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[15px] text-[var(--fg-secondary)]"
          >
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{
                background: dim ? "var(--bg-muted)" : "var(--gradient-hero)",
                color: dim ? "var(--fg-muted)" : "white",
              }}
            >
              <Check className="h-3 w-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
