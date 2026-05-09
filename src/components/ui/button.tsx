import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "transition-all duration-[var(--dur-base)] ease-[var(--ease-glass)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none isolate",
  ],
  {
    variants: {
      variant: {
        primary: [
          // Gradient is applied via inline style; here we add the glassy
          // overlay, soft shadow, and lift on hover.
          "text-[var(--primary-fg)] shadow-[var(--shadow-button)]",
          "hover:-translate-y-[1px] hover:shadow-[0_18px_36px_rgba(168,140,255,0.42),0_6px_14px_rgba(255,141,218,0.24),inset_0_1px_0_rgba(255,255,255,0.55)]",
          "active:translate-y-0 active:scale-[0.99]",
          // Inset white sheen highlight
          "before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.30)_0%,rgba(255,255,255,0)_55%)] before:opacity-90 before:pointer-events-none",
        ],
        secondary: [
          "bg-[var(--glass-strong)] text-[var(--fg)] backdrop-blur-[var(--blur-glass-soft)]",
          "border border-[var(--border-glass)] shadow-[var(--shadow-sm)]",
          "hover:-translate-y-[1px] hover:shadow-[var(--shadow-md)] hover:border-[var(--border-strong)]",
          "active:translate-y-0",
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
          "hover:bg-[var(--glass)] hover:border-[var(--primary)]/45 hover:-translate-y-[1px]",
          "active:translate-y-0",
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
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const useGradient = variant === "primary" || variant == null;
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        style={
          useGradient
            ? { background: "var(--gradient-hero)", ...style }
            : style
        }
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
