import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Max-width band. `default` = 1280px, `wide` = 1440px, `narrow` = 768px. */
  size?: "narrow" | "default" | "wide";
  /** Render as a `<section>` to gain the section vertical rhythm. */
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  /** Apply the section vertical padding (`section` class). */
  bleed?: boolean;
};

const sizeMap = {
  narrow: "max-w-[760px]",
  default: "container-default",
  wide: "container-wide",
} as const;

/**
 * Single source of truth for page horizontal rhythm. Every section should
 * wrap its content in a Container so padding (24/48/64) and max-width stay
 * synchronized across the site.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", as = "div", bleed, ...props }, ref) => {
    const Comp = as as "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          size === "narrow" && "mx-auto px-[var(--section-px)] w-full",
          size !== "narrow" && sizeMap[size],
          bleed && "section",
          className,
        )}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";
