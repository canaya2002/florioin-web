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

import { Container } from "@/components/layout/container";
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
  tint: string;
};

const META: Record<Industry, IndustryMeta> = {
  legal: { icon: Landmark, labelEn: "Legal", labelEs: "Despachos legales", tint: "#a88cff" },
  marketing: { icon: Megaphone, labelEn: "Marketing", labelEs: "Marketing", tint: "#ff8dda" },
  consulting: { icon: Briefcase, labelEn: "Consulting", labelEs: "Consultoría", tint: "#38e4ff" },
  "real-estate": { icon: Building2, labelEn: "Real estate", labelEs: "Inmobiliarias", tint: "#a88cff" },
  healthcare: { icon: Heart, labelEn: "Healthcare", labelEs: "Salud", tint: "#ff8dda" },
  finance: { icon: Pill, labelEn: "Finance", labelEs: "Finanzas", tint: "#34c79a" },
  construction: { icon: HardHat, labelEn: "Construction", labelEs: "Construcción", tint: "#f5b14a" },
  education: { icon: GraduationCap, labelEn: "Education", labelEs: "Educación", tint: "#79b8ff" },
  nonprofit: { icon: Users, labelEn: "Nonprofits", labelEs: "ONGs", tint: "#34c79a" },
  manufacturing: { icon: Wrench, labelEn: "Manufacturing", labelEs: "Manufactura", tint: "#a88cff" },
  retail: { icon: ShoppingBag, labelEn: "Retail", labelEs: "Retail", tint: "#ff8dda" },
  tech: { icon: Sparkles, labelEn: "Tech", labelEs: "Tech", tint: "#a88cff" },
  agency: { icon: PaintBucket, labelEn: "Agencies", labelEs: "Agencias", tint: "#f25bd8" },
  media: { icon: Newspaper, labelEn: "Media", labelEs: "Medios", tint: "#38e4ff" },
  logistics: { icon: Truck, labelEn: "Logistics", labelEs: "Logística", tint: "#79b8ff" },
};

// One unique radius per node. Values intentionally moderate (28–44px)
// — these cards are only ~150–200px wide so aggressive blob curves used
// to eat into the icon + label area. Mesh feel comes from the dotted
// background pattern, the colored halos behind, and the small asymmetric
// variation per node — not from extreme corners.
const RADII = [
  "32px 44px 36px 40px / 40px 36px 44px 32px",
  "44px 32px 40px 36px / 32px 40px 36px 44px",
  "36px 44px 32px 40px / 40px 32px 44px 36px",
  "40px 36px 44px 32px / 32px 44px 36px 40px",
  "44px 32px 40px 36px / 36px 40px 32px 44px",
  "32px 40px 44px 36px / 40px 32px 36px 44px",
  "40px 44px 32px 36px / 36px 32px 44px 40px",
  "36px 40px 44px 32px / 32px 44px 40px 36px",
  "44px 36px 40px 32px / 40px 32px 36px 44px",
  "32px 44px 36px 40px / 40px 36px 44px 32px",
  "40px 32px 44px 36px / 32px 44px 36px 40px",
  "36px 40px 32px 44px / 44px 32px 40px 36px",
  "44px 40px 32px 36px / 36px 32px 40px 44px",
  "32px 44px 40px 36px / 36px 40px 44px 32px",
  "40px 32px 44px 40px / 32px 40px 44px 36px",
];

export function IndustriesTeaser({ locale, dict }: IndustriesTeaserProps) {
  const lp = `/${locale}`;
  return (
    <Container size="wide" as="section" bleed className="bg-white">
      <div className="mx-auto mb-[var(--space-12)] flex max-w-[820px] flex-col items-center gap-[var(--space-3)] text-center">
        <span className="eyebrow">{dict.home.industries.eyebrow}</span>
        <h2 className="font-display text-[clamp(36px,5.5vw,72px)] leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">
          {dict.home.industries.title}
        </h2>
      </div>

      <div className="relative">
        {/* Dotted mesh background — pure decorative, behind everything */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-20 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(120, 140, 200, 0.28) 1px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            backgroundPosition: "0 0",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        {/* Soft connecting glow underneath — implies a network */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(40% 30% at 25% 30%, rgba(255,141,218,0.18), transparent 65%), radial-gradient(40% 30% at 75% 65%, rgba(56,228,255,0.18), transparent 65%), radial-gradient(40% 30% at 50% 90%, rgba(168,140,255,0.18), transparent 65%)",
          }}
        />

        {/* Network mesh lines — connect every node to its horizontal and
            vertical neighbors. Drawn at the visual center of each grid
            cell using a 5-col × 3-row layout (desktop). Hidden under
            sm breakpoint because the grid collapses to 2 cols. */}
        <MeshLines />

        <ul className="relative grid grid-cols-2 gap-[var(--space-5)] sm:grid-cols-3 lg:grid-cols-5 lg:gap-[var(--space-6)]">
          {INDUSTRIES.map((industry, i) => {
            const meta = META[industry];
            const Icon = meta.icon;
            const label = locale === "es" ? meta.labelEs : meta.labelEn;
            return (
              <li key={industry}>
                <Link
                  href={`${lp}/solutions/${industry}`}
                  className="group relative flex h-full min-h-[200px] flex-col items-start gap-[var(--space-3)] overflow-hidden bg-white p-[var(--space-6)] transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                  style={{ borderRadius: RADII[i % RADII.length] }}
                >
                  {/* Continuous sheen */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
                      animationDuration: "16s",
                      animationDelay: `${i * -1.2}s`,
                      mixBlendMode: "soft-light",
                    }}
                  />
                  {/* Tinted halo behind */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/2 -z-10 opacity-50 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${meta.tint}45, transparent 65%)`,
                    }}
                  />
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full text-white"
                    style={{
                      background: `linear-gradient(135deg, ${meta.tint}, var(--c-violet))`,
                    }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-[14.5px] font-semibold leading-tight text-[var(--fg)]">
                    {label}
                  </span>
                  <span className="mt-auto inline-flex items-center text-[var(--fg-subtle)]">
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-[transform,opacity] duration-[var(--duration-fast)] ease-[var(--ease-in-out)] group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}

/**
 * SVG mesh — connects every node center to its neighbors (right + below)
 * on a 5×3 grid (desktop) and 3×5 (tablet). Pure decorative, sits behind
 * the cards but on top of the dotted background. Lines have nodes at each
 * intersection (small dots) so the fabric reads as a network, not just
 * loose lines.
 */
function MeshLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[5] hidden h-full w-full sm:block"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      role="presentation"
    >
      <defs>
        <linearGradient id="mesh-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8dda" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#a88cff" stopOpacity="0.40" />
          <stop offset="100%" stopColor="#38e4ff" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="mesh-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a88cff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a88cff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Desktop layout: 5 cols × 3 rows. Cell centers at col 10/30/50/70/90,
          row 17/50/83. Each line connects horizontally and vertically. */}
      <g
        className="hidden lg:block"
        stroke="url(#mesh-line)"
        strokeWidth="0.18"
        fill="none"
        strokeLinecap="round"
      >
        {/* Horizontal lines per row */}
        {[17, 50, 83].map((y) => (
          <line key={`h-${y}`} x1="10" y1={y} x2="90" y2={y} />
        ))}
        {/* Vertical lines per column */}
        {[10, 30, 50, 70, 90].map((x) => (
          <line key={`v-${x}`} x1={x} y1="17" x2={x} y2="83" />
        ))}
        {/* Diagonals for extra fabric feel */}
        <line x1="10" y1="17" x2="90" y2="83" strokeOpacity="0.6" />
        <line x1="90" y1="17" x2="10" y2="83" strokeOpacity="0.6" />
      </g>

      {/* Tablet layout: 3 cols × 5 rows. */}
      <g
        className="hidden sm:block lg:hidden"
        stroke="url(#mesh-line)"
        strokeWidth="0.22"
        fill="none"
        strokeLinecap="round"
      >
        {[10, 30, 50, 70, 90].map((y) => (
          <line key={`h-${y}`} x1="15" y1={y} x2="85" y2={y} />
        ))}
        {[15, 50, 85].map((x) => (
          <line key={`v-${x}`} x1={x} y1="10" x2={x} y2="90" />
        ))}
      </g>

      {/* Mesh node dots at grid intersections — desktop 5×3 */}
      <g className="hidden lg:block" fill="url(#mesh-node)">
        {[17, 50, 83].flatMap((y) =>
          [10, 30, 50, 70, 90].map((x) => (
            <circle key={`d-${x}-${y}`} cx={x} cy={y} r="1.4" />
          )),
        )}
      </g>
      {/* Mesh node dots — tablet 3×5 */}
      <g className="hidden sm:block lg:hidden" fill="url(#mesh-node)">
        {[10, 30, 50, 70, 90].flatMap((y) =>
          [15, 50, 85].map((x) => (
            <circle key={`t-${x}-${y}`} cx={x} cy={y} r="1.7" />
          )),
        )}
      </g>
    </svg>
  );
}
