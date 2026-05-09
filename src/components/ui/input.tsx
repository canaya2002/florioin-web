import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-glass)]",
        "bg-[var(--glass-strong)] backdrop-blur-[var(--blur-glass-soft)]",
        "px-4 py-2 text-[15px] text-[var(--fg)]",
        "placeholder:text-[var(--fg-subtle)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
        "transition-all duration-[var(--dur-fast)] ease-[var(--ease-glass)]",
        "focus-visible:outline-none focus-visible:border-[var(--primary)]/50 focus-visible:ring-4 focus-visible:ring-[var(--primary)]/15",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "aria-[invalid=true]:border-[var(--danger)] aria-[invalid=true]:ring-[var(--danger)]/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
