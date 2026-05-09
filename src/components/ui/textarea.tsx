import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-[var(--radius-md)] border border-[var(--border-glass)]",
        "bg-[var(--glass-strong)] backdrop-blur-[var(--blur-glass-soft)]",
        "px-4 py-3 text-[15px] text-[var(--fg)]",
        "placeholder:text-[var(--fg-subtle)] resize-y",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
        "transition-all duration-[var(--dur-fast)] ease-[var(--ease-glass)]",
        "focus-visible:outline-none focus-visible:border-[var(--primary)]/50 focus-visible:ring-4 focus-visible:ring-[var(--primary)]/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:border-[var(--danger)] aria-[invalid=true]:ring-[var(--danger)]/20",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
