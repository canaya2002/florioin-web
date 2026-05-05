import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-secondary)]",
        primary:
          "border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)]",
        success:
          "border-[var(--success)]/20 bg-[var(--success)]/10 text-[var(--success)]",
        warning:
          "border-[var(--warning)]/20 bg-[var(--warning)]/10 text-[var(--warning)]",
        outline: "border-[var(--border-strong)] bg-transparent text-[var(--fg)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
