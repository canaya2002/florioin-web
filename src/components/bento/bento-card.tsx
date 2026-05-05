"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BentoSize =
  | "small" /*  4col × 1row */
  | "wide" /*   8col × 1row */
  | "tall" /*   4col × 2row */
  | "large" /*  8col × 2row */
  | "full" /*  12col × 1row */
  | "xl" /*    8col × 3row */;

const sizeClasses: Record<BentoSize, string> = {
  small: "lg:col-span-4 lg:row-span-1",
  wide: "sm:col-span-4 lg:col-span-8 lg:row-span-1",
  tall: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  large: "sm:col-span-4 lg:col-span-8 lg:row-span-2",
  full: "sm:col-span-4 lg:col-span-12 lg:row-span-1",
  xl: "sm:col-span-4 lg:col-span-8 lg:row-span-3",
};

type BentoCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  size?: BentoSize;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  visual?: ReactNode;
  href?: string;
  ctaLabel?: string;
  visualPosition?: "background" | "below" | "above" | "side";
  gradient?: boolean;
};

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      size = "small",
      eyebrow,
      title,
      description,
      visual,
      href,
      ctaLabel,
      visualPosition = "background",
      gradient = false,
      children,
      ...props
    },
    ref,
  ) => {
    const wrapperClass = cn(
      "group relative flex h-full flex-col overflow-hidden",
      "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)]",
      "shadow-[var(--shadow-sm)] transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
      "hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:border-[var(--primary)]/40",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
      sizeClasses[size],
      className,
    );

    const inner = (
      <>
        {gradient && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "var(--gradient-card)" }}
          />
        )}
        {visual && visualPosition === "background" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
          >
            {visual}
          </div>
        )}
        <div
          className={cn(
            "relative z-10 flex h-full flex-col p-6 lg:p-8",
            visualPosition === "side" && "sm:flex-row sm:items-center sm:gap-8",
            visualPosition === "above" && "justify-end",
          )}
        >
          {visual && visualPosition === "above" && (
            <div className="mb-6 flex-1">{visual}</div>
          )}
          <div
            className={cn(
              "flex flex-col gap-2",
              visualPosition === "side" && "sm:flex-1",
            )}
          >
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h3 className="font-display text-[clamp(22px,2.4vw,32px)] leading-tight tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="max-w-prose text-[15px] leading-relaxed text-[var(--fg-muted)]">
                {description}
              </p>
            )}
          </div>

          {visual &&
            (visualPosition === "below" || visualPosition === "side") && (
              <div
                className={cn(
                  "mt-6 flex-1",
                  visualPosition === "side" && "sm:mt-0 sm:flex-1",
                )}
              >
                {visual}
              </div>
            )}

          {children}

          {ctaLabel && (
            <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)]">
              {ctaLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </div>
          )}
        </div>
      </>
    );

    if (href) {
      return (
        <Link href={href} className={wrapperClass} ref={ref as never}>
          {inner}
        </Link>
      );
    }

    return (
      <article ref={ref} className={wrapperClass} {...props}>
        {inner}
      </article>
    );
  },
);
BentoCard.displayName = "BentoCard";
