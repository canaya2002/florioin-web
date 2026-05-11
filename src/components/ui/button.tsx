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
    // Motion — soft spring-feeling out-expo curve. Slightly longer so the
    // lift "settles" rather than snapping.
    "transition-[transform,background-color,border-color,filter] duration-300 ease-[var(--ease-out-expo)] will-change-transform",
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
          "text-[var(--primary-fg)] border border-white/30",
          "hover:-translate-y-0.5 hover:brightness-[1.05] hover:scale-[1.02]",
        ],
        secondary: [
          "bg-[var(--glass-strong)] text-[var(--fg)] backdrop-blur-[var(--blur-glass-soft)]",
          "hover:-translate-y-0.5 hover:scale-[1.02]",
        ],
        ghost: [
          "text-[var(--fg)] hover:bg-[var(--glass)]",
          "hover:backdrop-blur-[var(--blur-glass-soft)] hover:-translate-y-0.5",
        ],
        link: [
          "text-[var(--primary)] underline-offset-4 hover:underline px-0 h-auto",
        ],
        outline: [
          "bg-[var(--glass-soft)] text-[var(--fg)]",
          "backdrop-blur-[var(--blur-glass-soft)]",
          "hover:bg-[var(--glass)] hover:-translate-y-0.5 hover:scale-[1.02]",
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
