import { ArrowUpRight, BookOpen, FileType2, GraduationCap, Video } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { isLocale, type Locale } from "@/i18n/locales";
import {
  RESOURCES,
  RESOURCE_TYPE_LABELS,
  type ResourceType,
} from "@/lib/resources";
import { pageMetadata } from "@/lib/seo";
import type { LucideIcon } from "lucide-react";

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  ebook: BookOpen,
  template: FileType2,
  guide: GraduationCap,
  webinar: Video,
};

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "/resources",
    title: isEs ? "Recursos" : "Resources",
    description: isEs
      ? "eBooks, plantillas, guías y webinars para sacar más de tu equipo."
      : "eBooks, templates, guides, and webinars to get more from your team.",
  });
}

export default async function ResourcesIndexPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={isEs ? "Recursos" : "Resources"}
        title={
          isEs
            ? "Cosas útiles. Gratis. Sin formularios largos."
            : "Useful stuff. Free. No long forms."
        }
        description={
          isEs
            ? "eBooks, plantillas y guías para equipos que quieren mejor productividad sin reinventar todo."
            : "eBooks, templates, and guides for teams who want better productivity without reinventing everything."
        }
      />

      <section className="container-default pb-24">
        <ul className="grid gap-8 md:grid-cols-2">
          {RESOURCES.map((resource) => {
            const Icon = TYPE_ICON[resource.type];
            return (
              <li key={resource.slug}>
                <Link
                  href={`${lp}/resources/${resource.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                      style={{ background: "var(--gradient-card)" }}
                    >
                      <Icon className="h-6 w-6 text-[var(--primary)]" />
                    </span>
                    <Badge variant="primary">
                      {isEs
                        ? RESOURCE_TYPE_LABELS[resource.type].es
                        : RESOURCE_TYPE_LABELS[resource.type].en}
                    </Badge>
                  </div>
                  <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                    {isEs ? resource.title.es : resource.title.en}
                  </h3>
                  <p className="text-[15px] text-[var(--fg-muted)]">
                    {isEs ? resource.description.es : resource.description.en}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm text-[var(--fg-muted)]">
                    <span>
                      {resource.pageCount
                        ? `${resource.pageCount} ${isEs ? "páginas" : "pages"}`
                        : resource.duration ?? ""}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
