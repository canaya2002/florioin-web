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
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
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
                className="group relative flex h-full flex-col items-start gap-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-glass)] bg-[var(--glass)] p-5 backdrop-blur-[var(--blur-glass-soft)] shadow-[var(--shadow-sm)] transition-all duration-[var(--dur-base)] ease-[var(--ease-glass)] hover:-translate-y-1 hover:border-[var(--primary)]/45 hover:shadow-[var(--shadow-md)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                />
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-glass)] backdrop-blur-[var(--blur-glass-soft)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168,140,255,0.20), rgba(56,228,255,0.14))",
                  }}
                >
                  <Icon
                    aria-hidden
                    className="h-5 w-5 text-[var(--primary)] transition-transform duration-[var(--dur-base)] ease-[var(--ease-spring)] group-hover:scale-110"
                    strokeWidth={1.6}
                  />
                </span>
                <span className="text-sm font-semibold text-[var(--fg)]">
                  {label}
                </span>
                <span className="mt-auto inline-flex items-center text-[var(--fg-subtle)]">
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-[var(--dur-base)] ease-[var(--ease-glass)] group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
