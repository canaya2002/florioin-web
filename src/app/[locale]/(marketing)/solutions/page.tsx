import { ArrowUpRight } from "lucide-react";
import {
  Banknote,
  Briefcase,
  Building2,
  Cpu,
  GraduationCap,
  HardHat,
  Heart,
  Landmark,
  type LucideIcon,
  Megaphone,
  Newspaper,
  PaintBucket,
  ShoppingBag,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { INDUSTRIES, type Industry } from "@/lib/constants";
import { INDUSTRY_CONTENT } from "@/lib/industries";

const ICON_MAP: Record<Industry, LucideIcon> = {
  legal: Landmark,
  marketing: Megaphone,
  consulting: Briefcase,
  "real-estate": Building2,
  healthcare: Heart,
  finance: Banknote,
  construction: HardHat,
  education: GraduationCap,
  nonprofit: Users,
  manufacturing: Wrench,
  retail: ShoppingBag,
  tech: Cpu,
  agency: PaintBucket,
  media: Newspaper,
  logistics: Truck,
};

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs ? "Soluciones por industria" : "Solutions by industry",
    description: isEs
      ? "FlorioIn personalizado para 15 industrias: legal, marketing, salud, finanzas, retail, tech y más."
      : "FlorioIn tailored for 15 industries: legal, marketing, healthcare, finance, retail, tech, and more.",
  };
}

export default async function SolutionsIndexPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";
  const lp = `/${lang}`;

  return (
    <>
      <PageHero
        eyebrow={dict.nav.solutions}
        title={
          isEs
            ? "FlorioIn, hecho para tu industria"
            : "FlorioIn, tailored for your industry"
        }
        description={
          isEs
            ? "Cada industria viene con su workspace preconfigurado: campos, plantillas, automatizaciones y vistas. Cero trabajo de configuración."
            : "Every industry ships with a pre-configured workspace: fields, templates, automations, and views. Zero configuration work."
        }
        primaryCta={{ href: `${lp}/request-access`, label: dict.common.ctaPrimary }}
        align="center"
      />

      <section className="container-wide section">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((slug) => {
            const content = INDUSTRY_CONTENT[slug];
            const Icon = ICON_MAP[slug];
            return (
              <li key={slug}>
                <Link
                  href={`${lp}/solutions/${slug}`}
                  className="group flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                      style={{ background: "var(--gradient-card)" }}
                    >
                      <Icon className="h-6 w-6 text-[var(--primary)]" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-[var(--fg-subtle)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-[var(--fs-h4)] leading-tight tracking-tight">
                      {isEs ? content.label.es : content.label.en}
                    </h3>
                    <p className="text-[15px] text-[var(--fg-muted)]">
                      {isEs ? content.tag.es : content.tag.en}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
