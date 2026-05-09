import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * 12-column bento grid. Rows are tall enough to host a meaningful card
 * even at the smallest size, and the grid collapses cleanly to a single
 * column on mobile so cards never look "half-empty".
 */
export const BentoGrid = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // gap matches --space-6 (24) on mobile and --space-8 (32) on desktop
      "grid gap-[var(--space-6)] lg:gap-[var(--space-8)]",
      // 1 col on mobile, 4 col on tablet, 12 col on desktop
      "grid-cols-1 sm:grid-cols-4 lg:grid-cols-12",
      // Row baseline matches small-card aspect-[4/3] minimum.
      "auto-rows-[minmax(240px,auto)] lg:auto-rows-[minmax(260px,auto)]",
      className,
    )}
    {...props}
  />
));
BentoGrid.displayName = "BentoGrid";
