import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
    "backdrop-blur-[var(--blur-glass-soft)] transition-colors",
  ],
  {
    variants: {
      variant: {
        default:
          "border border-[var(--border-glass)] bg-[var(--glass)] text-[var(--fg-secondary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
        primary:
          "border border-[var(--primary)]/30 bg-[rgba(168,140,255,0.10)] text-[var(--primary)]",
        success:
          "border border-[var(--success)]/30 bg-[rgba(52,199,154,0.10)] text-[var(--success)]",
        warning:
          "border border-[var(--warning)]/30 bg-[rgba(245,177,74,0.12)] text-[var(--warning)]",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-[var(--fg)]",
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
