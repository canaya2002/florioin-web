import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        // Pill input. Soft off-white surface so the field is clearly
        // tap-able without using shadows or visible borders.
        "flex h-12 w-full rounded-full bg-[#fafbfc]",
        "px-5 py-2 text-[15px] text-[var(--fg)]",
        "placeholder:text-[var(--fg-subtle)]",
        "transition-[background-color,outline-color] duration-[var(--duration-fast)] ease-[var(--ease-in-out)]",
        // Hover — slightly more contrast so the field signals interactivity
        "hover:bg-[#f4f5f7]",
        // Focus — pastel ring (uses outline, not box-shadow)
        "focus-visible:outline-none focus-visible:bg-white",
        "focus-visible:[outline:3px_solid_rgba(168,140,255,0.45)] focus-visible:outline-offset-1",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-50",
        // File inputs
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Error / success — accent via outline (no shadow)
        "aria-[invalid=true]:[outline:2px_solid_var(--danger)]",
        "aria-[invalid=true]:focus-visible:[outline:3px_solid_rgba(240,107,120,0.35)]",
        "data-[state=success]:[outline:2px_solid_var(--success)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
