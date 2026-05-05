import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * 12-column bento grid that collapses to 4 columns on tablet and 1 on mobile.
 * Compose with `<BentoCard>` whose `size` prop controls col/row span.
 */
export const BentoGrid = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid auto-rows-[minmax(220px,auto)] gap-6",
      "grid-cols-1 sm:grid-cols-4 lg:grid-cols-12 lg:gap-10",
      className,
    )}
    {...props}
  />
));
BentoGrid.displayName = "BentoGrid";
