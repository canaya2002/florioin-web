import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        // Multiline counterpart of Input. Soft off-white surface, no
        // visible border, organic radius so the field doesn't read as
        // a hard rectangle.
        "flex min-h-[140px] w-full rounded-[28px] bg-[#fafbfc]",
        "px-5 py-3.5 text-[15px] text-[var(--fg)]",
        "placeholder:text-[var(--fg-subtle)] resize-y",
        "transition-[background-color,outline-color] duration-[var(--duration-fast)] ease-[var(--ease-in-out)]",
        "hover:bg-[#f4f5f7]",
        "focus-visible:outline-none focus-visible:bg-white",
        "focus-visible:[outline:3px_solid_rgba(168,140,255,0.45)] focus-visible:outline-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:[outline:2px_solid_var(--danger)]",
        "aria-[invalid=true]:focus-visible:[outline:3px_solid_rgba(240,107,120,0.35)]",
        "data-[state=success]:[outline:2px_solid_var(--success)]",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
