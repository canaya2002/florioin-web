import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // Layout
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "isolate select-none",
    // Motion — fast (150ms) hover/focus per spec
    "transition-[transform,box-shadow,background-color,border-color,filter] duration-[var(--duration-fast)] ease-[var(--ease-in-out)]",
    // Focus ring (3px ring at 2px offset, brand color)
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--primary)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    // Active feedback (scale 0.98 per spec)
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-[var(--primary-fg)] shadow-[var(--shadow-button)]",
          "hover:-translate-y-px hover:brightness-[1.05]",
          "hover:shadow-[0_18px_36px_rgba(168,140,255,0.42),0_6px_14px_rgba(255,141,218,0.24),inset_0_1px_0_rgba(255,255,255,0.55)]",
          // White inset sheen highlight
          "before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0)_55%)] before:opacity-90 before:pointer-events-none",
          // One-shot diagonal sheen on hover. Lives inside ::after, only
          // animates on hover, no infinite loops. Hidden under reduced-motion.
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:overflow-hidden",
          "[&]:hover:after:bg-[var(--gradient-button-sheen,transparent)]",
        ],
        secondary: [
          "bg-[var(--glass-strong)] text-[var(--fg)] backdrop-blur-[var(--blur-glass-soft)]",
          "border border-[var(--border-glass)] shadow-[var(--shadow-sm)]",
          "hover:-translate-y-px hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)]",
        ],
        ghost: [
          "text-[var(--fg)] hover:bg-[var(--glass)]",
          "hover:backdrop-blur-[var(--blur-glass-soft)]",
        ],
        link: [
          "text-[var(--primary)] underline-offset-4 hover:underline px-0 h-auto",
        ],
        outline: [
          "border border-[var(--border-strong)] bg-[var(--glass-soft)] text-[var(--fg)]",
          "backdrop-blur-[var(--blur-glass-soft)]",
          "hover:bg-[var(--glass)] hover:border-[var(--primary)]/45 hover:-translate-y-px",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** When true, renders a spinner and disables the button while keeping its
     *  width. Pair with disabled when you also want pointer-events off. */
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      style,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const useGradient = variant === "primary" || variant == null;
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          loading && "cursor-wait",
          className,
        )}
        style={
          useGradient
            ? { background: "var(--gradient-hero)", ...style }
            : style
        }
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            <span className="sr-only">Loading…</span>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
