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
    const isInteractive = Boolean(href);

    const wrapperClass = cn(
      "group relative isolate flex h-full min-h-[240px] flex-col overflow-hidden",
      "rounded-[var(--radius-xl)] border border-[var(--border-glass)]",
      "bg-[var(--glass)] backdrop-blur-[var(--blur-glass)] backdrop-saturate-[140%]",
      "shadow-[var(--shadow-md)]",
      "transition-[transform,box-shadow,border-color] duration-[var(--duration-base)] ease-[var(--ease-in-out)]",
      // Interactive cards lift; informational cards only get a soft shadow boost.
      isInteractive
        ? [
            "cursor-pointer hover:-translate-y-1 active:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
            "hover:border-[var(--primary)]/40",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          ]
        : "hover:shadow-[var(--shadow-lg)]",
      sizeClasses[size],
      className,
    );

    const inner = (
      <>
        {/* Soft gradient fill */}
        {gradient && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-card)" }}
          />
        )}
        {/* Inset highlight at the top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
        {/* Hover sheen — only on interactive cards, only on devices with hover. */}
        {isInteractive && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-in-out)] group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background:
                "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
              mixBlendMode: "soft-light",
            }}
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
            "relative z-10 flex h-full flex-col",
            // Consistent padding tokens (24 mobile / 32 desktop).
            "p-[var(--space-6)] lg:p-[var(--space-8)]",
            visualPosition === "side" &&
              "sm:flex-row sm:items-center sm:gap-[var(--space-8)]",
            visualPosition === "above" && "justify-end",
          )}
        >
          {visual && visualPosition === "above" && (
            <div className="mb-6 flex-1">{visual}</div>
          )}
          <div
            className={cn(
              "flex flex-col gap-[var(--space-3)]",
              visualPosition === "side" && "sm:flex-1",
            )}
          >
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h3 className="font-display text-[clamp(20px,2.2vw,28px)] leading-tight tracking-tight text-[var(--fg)]">
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
                  "mt-[var(--space-6)] flex-1",
                  visualPosition === "side" && "sm:mt-0",
                )}
              >
                {visual}
              </div>
            )}

          {children}

          {ctaLabel && (
            <div className="mt-[var(--space-6)] inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]">
              {ctaLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-in-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
