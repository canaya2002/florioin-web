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
      // `gradient` was the toggle for the old tinted card fill; the pebble
      // surface is always pure white now, so we drop it from props before
      // forwarding to the DOM.
      gradient,
      children,
      ...props
    },
    ref,
  ) => {
    // `gradient` is intentionally ignored — the pebble surface is always
    // pure white. The prop stays in the type for backward compatibility.
    void gradient;
    const isInteractive = Boolean(href);

    const wrapperClass = cn(
      "group relative isolate flex h-full min-h-[240px] flex-col overflow-hidden",
      // Pebble — flat white surface. No shadows, no borders. Hover is
      // a spring-feeling lift + micro-scale that uses the out-expo curve
      // for that "settles into place" premium feel.
      "rounded-[var(--radius-xl)] bg-white",
      "transition-[transform] duration-500 ease-[var(--ease-out-expo)] will-change-transform",
      isInteractive
        ? [
            "cursor-pointer hover:-translate-y-2 hover:scale-[1.012] active:-translate-y-0.5 active:scale-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          ]
        : "hover:-translate-y-1 hover:scale-[1.005]",
      sizeClasses[size],
      className,
    );

    const inner = (
      <>
        {/* Inset highlight at the top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent"
        />
        {/* Continuous slow sheen — alive, not just on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave motion-reduce:hidden"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
            animationDuration: "14s",
            animationDelay: "-3s",
            mixBlendMode: "soft-light",
          }}
        />
        {/* Hover sheen burst */}
        {isInteractive && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-in-out)] group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background:
                "radial-gradient(60% 50% at var(--mx,50%) var(--my,50%), rgba(168,140,255,0.18), transparent 65%)",
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
