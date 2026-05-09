import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Card — translucent glass surface used everywhere. Defaults are calm
 * (subtle blur, soft shadow, no transform on hover). To make a card feel
 * clickable, wrap it in a Link/button or pass `data-interactive` so it
 * lifts and gains a stronger shadow on hover.
 */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border-glass)]",
        "bg-[var(--glass)] backdrop-blur-[var(--blur-glass)] backdrop-saturate-[140%]",
        "shadow-[var(--shadow-md)]",
        "transition-[box-shadow,transform,border-color] duration-[var(--duration-base)] ease-[var(--ease-in-out)]",
        // Only interactive cards lift; default cards just shadow-up.
        "hover:shadow-[var(--shadow-lg)]",
        "data-[interactive=true]:cursor-pointer data-[interactive=true]:hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col gap-[var(--space-2)] p-[var(--space-6)] md:p-[var(--space-8)]",
      className,
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-[var(--fs-h4)] leading-tight tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[15px] leading-relaxed text-[var(--fg-muted)]",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-[var(--space-6)] pb-[var(--space-6)] md:px-[var(--space-8)] md:pb-[var(--space-8)]", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-[var(--space-3)] px-[var(--space-6)] pb-[var(--space-6)] md:px-[var(--space-8)] md:pb-[var(--space-8)]",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
