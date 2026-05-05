import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "transition-all duration-[var(--dur-base)] ease-[var(--ease-out-expo)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-[var(--primary-fg)] shadow-[var(--shadow-md)]",
          "hover:shadow-[var(--shadow-lg)] hover:-translate-y-px active:translate-y-0",
        ],
        secondary: [
          "border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--fg)]",
          "hover:bg-[var(--bg-subtle)] hover:border-[var(--fg-subtle)]",
        ],
        ghost: ["text-[var(--fg)] hover:bg-[var(--bg-subtle)]"],
        link: [
          "text-[var(--primary)] underline-offset-4 hover:underline px-0 h-auto",
        ],
        outline: [
          "border border-[var(--border-strong)] bg-transparent text-[var(--fg)]",
          "hover:bg-[var(--bg-subtle)]",
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
