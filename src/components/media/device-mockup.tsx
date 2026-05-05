import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DeviceMockupProps = {
  variant: "iphone" | "ipad" | "macbook";
  children: ReactNode;
  className?: string;
};

/**
 * Pure-CSS device frames. Wrap a screenshot or video in the appropriate
 * variant. iPhone/iPad have rounded notch-style; MacBook is laptop with stand.
 */
export function DeviceMockup({
  variant,
  children,
  className,
}: DeviceMockupProps) {
  if (variant === "iphone") {
    return (
      <div
        className={cn(
          "relative mx-auto aspect-[9/19] w-full max-w-[280px] rounded-[44px] border-[10px] border-[#0a0a0b] bg-[#0a0a0b] shadow-[var(--shadow-xl)]",
          className,
        )}
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0a0a0b]" />
        <div className="overflow-hidden rounded-[34px] bg-[var(--bg-subtle)] h-full">
          {children}
        </div>
      </div>
    );
  }

  if (variant === "ipad") {
    return (
      <div
        className={cn(
          "relative mx-auto aspect-[3/4] w-full max-w-md rounded-[28px] border-[12px] border-[#0a0a0b] bg-[#0a0a0b] shadow-[var(--shadow-xl)]",
          className,
        )}
      >
        <div className="overflow-hidden rounded-[18px] bg-[var(--bg-subtle)] h-full">
          {children}
        </div>
      </div>
    );
  }

  // MacBook
  return (
    <div className={cn("mx-auto w-full", className)}>
      <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-t-[10px] border-[8px] border-[#0a0a0b] bg-[#0a0a0b] shadow-[var(--shadow-xl)]">
        <div className="overflow-hidden bg-[var(--bg-subtle)] h-full">
          {children}
        </div>
      </div>
      <div className="relative mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-b-[12px] bg-gradient-to-b from-[#0a0a0b] to-[#27272a]" />
      <div className="relative mx-auto h-1 w-[60%] rounded-b-[6px] bg-[#0a0a0b]" />
    </div>
  );
}
