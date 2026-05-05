import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BrowserMockupProps = {
  children: ReactNode;
  url?: string;
  className?: string;
  innerClassName?: string;
};

export function BrowserMockup({
  children,
  url = "florioin.app",
  className,
  innerClassName,
}: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg)]",
        "shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-subtle)] px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="ml-auto rounded-md bg-[var(--bg)] px-3 py-1 text-xs text-[var(--fg-muted)] font-mono">
          {url}
        </span>
        <span className="invisible flex gap-1.5 sm:visible">
          <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
          <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
          <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
        </span>
      </div>
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}
