import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] relative overflow-hidden",
        // Lavender-tinted glass surface so the skeleton is actually visible
        // against the white-ish page background.
        "bg-[rgba(168,140,255,0.10)] border border-[var(--border)]",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/55 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}
