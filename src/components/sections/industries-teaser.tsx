import { ArrowUpRight } from "lucide-react";
import {
  Briefcase,
  Building2,
  GraduationCap,
  HardHat,
  Heart,
  Landmark,
  Megaphone,
  Newspaper,
  PaintBucket,
  Pill,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";
import { INDUSTRIES, type Industry } from "@/lib/constants";

type IndustriesTeaserProps = {
  locale: Locale;
  dict: Dictionary;
};

type IndustryMeta = {
  icon: ComponentType<{ className?: string }>;
  labelEn: string;
  labelEs: string;
};

const META: Record<Industry, IndustryMeta> = {
  legal: { icon: Landmark, labelEn: "Legal", labelEs: "Despachos legales" },
  marketing: { icon: Megaphone, labelEn: "Marketing", labelEs: "Marketing" },
  consulting: { icon: Briefcase, labelEn: "Consulting", labelEs: "Consultoría" },
  "real-estate": {
    icon: Building2,
    labelEn: "Real estate",
    labelEs: "Inmobiliarias",
  },
  healthcare: { icon: Heart, labelEn: "Healthcare", labelEs: "Salud" },
  finance: { icon: Pill, labelEn: "Finance", labelEs: "Finanzas" },
  construction: {
    icon: HardHat,
    labelEn: "Construction",
    labelEs: "Construcción",
  },
  education: {
    icon: GraduationCap,
    labelEn: "Education",
    labelEs: "Educación",
  },
  nonprofit: { icon: Users, labelEn: "Nonprofits", labelEs: "ONGs" },
  manufacturing: {
    icon: Wrench,
    labelEn: "Manufacturing",
    labelEs: "Manufactura",
  },
  retail: { icon: ShoppingBag, labelEn: "Retail", labelEs: "Retail" },
  tech: { icon: Sparkles, labelEn: "Tech", labelEs: "Tech" },
  agency: { icon: PaintBucket, labelEn: "Agencies", labelEs: "Agencias" },
  media: { icon: Newspaper, labelEn: "Media", labelEs: "Medios" },
  logistics: { icon: Truck, labelEn: "Logistics", labelEs: "Logística" },
};

export function IndustriesTeaser({ locale, dict }: IndustriesTeaserProps) {
  const lp = `/${locale}`;
  return (
    <section className="container-wide section">
      <div className="mb-12 flex flex-col items-start gap-3 lg:items-center lg:text-center">
        <span className="eyebrow">{dict.home.industries.eyebrow}</span>
        <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
          {dict.home.industries.title}
        </h2>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {INDUSTRIES.map((industry) => {
          const meta = META[industry];
          const Icon = meta.icon;
          const label = locale === "es" ? meta.labelEs : meta.labelEn;
          return (
            <li key={industry}>
              <Link
                href={`${lp}/solutions/${industry}`}
                className="group flex h-full flex-col items-start gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg)] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]"
              >
                <Icon
                  aria-hidden
                  className="h-6 w-6 text-[var(--primary)] transition-transform group-hover:scale-110"
                />
                <span className="text-sm font-medium text-[var(--fg)]">
                  {label}
                </span>
                <span className="ml-auto inline-flex items-center text-[var(--fg-subtle)]">
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
