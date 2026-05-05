import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-[var(--radius-md)] border border-[var(--border-strong)]",
        "bg-[var(--bg)] px-4 py-3 text-[15px] text-[var(--fg)]",
        "placeholder:text-[var(--fg-subtle)] resize-y",
        "transition-colors focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-[var(--danger)] aria-[invalid=true]:ring-[var(--danger)]/20",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
