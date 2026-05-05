import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)]",
        "bg-[var(--bg)] px-4 py-2 text-[15px] text-[var(--fg)]",
        "placeholder:text-[var(--fg-subtle)]",
        "transition-colors focus-visible:outline-none focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20",
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
