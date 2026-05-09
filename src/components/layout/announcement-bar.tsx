import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type AnnouncementBarProps = {
  message: string;
  ctaLabel?: string;
  href?: string;
  className?: string;
};

export function AnnouncementBar({
  message,
  ctaLabel,
  href,
  className,
}: AnnouncementBarProps) {
  const content = (
    <span className="flex items-center justify-center gap-3 text-[13px] font-medium">
      <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
      <span>{message}</span>
      {ctaLabel && (
        <span className="inline-flex items-center gap-1 text-[var(--primary)] underline-offset-4 hover:underline">
          {ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </span>
  );

  return (
    <div
      className={cn(
        "relative w-full border-b border-[var(--border-glass)] bg-[var(--glass-strong)] py-2 text-[var(--fg-secondary)] backdrop-blur-[var(--blur-glass-soft)]",
        className,
      )}
    >
      {href ? (
        <a href={href} className="block">
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </div>
  );
}
