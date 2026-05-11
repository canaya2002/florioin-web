"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { forwardRef, type HTMLAttributes, type ReactNode, type PointerEvent, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export type BentoSize =
  | "small" /*  4col × 1row */
  | "wide" /*   8col × 1row */
  | "tall" /*   4col × 2row */
  | "large" /*  8col × 2row */
  | "full" /*  12col × 1row */
  | "xl" /*    8col × 3row */;

const sizeClasses: Record<BentoSize, string> = {
  small: "lg:col-span-4 lg:row-span-1",
  wide: "sm:col-span-4 lg:col-span-8 lg:row-span-1",
  tall: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  large: "sm:col-span-4 lg:col-span-8 lg:row-span-2",
  full: "sm:col-span-4 lg:col-span-12 lg:row-span-1",
  xl: "sm:col-span-4 lg:col-span-8 lg:row-span-3",
};

type BentoCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  size?: BentoSize;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  visual?: ReactNode;
  href?: string;
  ctaLabel?: string;
  visualPosition?: "background" | "below" | "above" | "side";
  gradient?: boolean;
  /** Enable 3D tilt effect on hover */
  tilt?: boolean;
  /** Enable spotlight effect on hover */
  spotlight?: boolean;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      className,
      size = "small",
      eyebrow,
      title,
      description,
      visual,
      href,
      ctaLabel,
      visualPosition = "background",
      gradient = false,
      tilt = true,
      spotlight = true,
      children,
      ...props
    },
    ref,
  ) => {
    const reduced = useReducedMotion();
    const isInteractive = Boolean(href);
    const cardRef = useRef<HTMLDivElement>(null);
    
    // 3D Tilt effect
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const scale = useMotionValue(1);
    
    // Spotlight effect
    const spotlightX = useMotionValue(50);
    const spotlightY = useMotionValue(50);
    const spotlightOpacity = useMotionValue(0);
    
    // Spring physics
    const springConfig = { stiffness: 200, damping: 25 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    const springScale = useSpring(scale, springConfig);
    const springSpotlightX = useSpring(spotlightX, springConfig);
    const springSpotlightY = useSpring(spotlightY, springConfig);
    const springSpotlightOpacity = useSpring(spotlightOpacity, { stiffness: 300, damping: 30 });

    function handleMouseMove(e: PointerEvent<HTMLDivElement>) {
      if (reduced || !cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Tilt effect (max 6 degrees)
      if (tilt) {
        rotateX.set((-mouseY / (rect.height / 2)) * 6);
        rotateY.set((mouseX / (rect.width / 2)) * 6);
        scale.set(1.02);
      }
      
      // Spotlight effect
      if (spotlight) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        spotlightX.set(x);
        spotlightY.set(y);
        spotlightOpacity.set(1);
      }
    }

    function handleMouseLeave() {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
      spotlightOpacity.set(0);
    }

    const wrapperClass = cn(
      "group relative isolate flex h-full min-h-[240px] flex-col overflow-hidden",
      "rounded-[var(--radius-xl)] border border-[var(--border-glass)]",
      "bg-[var(--glass)] backdrop-blur-[var(--blur-glass)] backdrop-saturate-[140%]",
      "shadow-[var(--shadow-md)]",
      isInteractive
        ? [
            "cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
          ]
        : "",
      sizeClasses[size],
      className,
    );

    const inner = (
      <>
        {/* Animated gradient border on hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0"
          style={{
            background: "linear-gradient(135deg, var(--c-pink), var(--c-violet), var(--c-cyan))",
            padding: "1px",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            opacity: springSpotlightOpacity,
          }}
        />
        
        {/* Spotlight effect */}
        {spotlight && !reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              opacity: springSpotlightOpacity,
              background: `radial-gradient(500px circle at ${springSpotlightX.get()}% ${springSpotlightY.get()}%, rgba(168, 140, 255, 0.12), transparent 40%)`,
            }}
          />
        )}
        
        {/* Soft gradient fill */}
        {gradient && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-card)" }}
          />
        )}
        
        {/* Inset highlight at the top edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
        
        {/* Hover sheen */}
        {isInteractive && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-base)] ease-[var(--ease-in-out)] group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background:
                "linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%)",
              mixBlendMode: "soft-light",
            }}
          />
        )}
        
        {visual && visualPosition === "background" && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
          >
            {visual}
          </div>
        )}
        
        <div
          className={cn(
            "relative z-10 flex h-full flex-col",
            "p-[var(--space-6)] lg:p-[var(--space-8)]",
            visualPosition === "side" &&
              "sm:flex-row sm:items-center sm:gap-[var(--space-8)]",
            visualPosition === "above" && "justify-end",
          )}
        >
          {visual && visualPosition === "above" && (
            <motion.div 
              className="mb-6 flex-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {visual}
            </motion.div>
          )}
          
          <div
            className={cn(
              "flex flex-col gap-[var(--space-3)]",
              visualPosition === "side" && "sm:flex-1",
            )}
          >
            {eyebrow && (
              <motion.span 
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                {eyebrow}
              </motion.span>
            )}
            {title && (
              <motion.h3 
                className="font-display text-[clamp(20px,2.2vw,28px)] leading-tight tracking-tight text-[var(--fg)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
              >
                {title}
              </motion.h3>
            )}
            {description && (
              <motion.p 
                className="max-w-prose text-[15px] leading-relaxed text-[var(--fg-muted)]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT_EXPO }}
              >
                {description}
              </motion.p>
            )}
          </div>

          {visual &&
            (visualPosition === "below" || visualPosition === "side") && (
              <motion.div
                className={cn(
                  "mt-[var(--space-6)] flex-1",
                  visualPosition === "side" && "sm:mt-0",
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
              >
                {visual}
              </motion.div>
            )}

          {children}

          {ctaLabel && (
            <motion.div 
              className="mt-[var(--space-6)] inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {ctaLabel}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-in-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </motion.div>
          )}
        </div>
      </>
    );

    const motionProps = {
      style: tilt && !reduced ? {
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d" as const,
        perspective: 1000,
      } : {},
      onPointerMove: handleMouseMove,
      onPointerLeave: handleMouseLeave,
      transition: { duration: 0.4, ease: EASE_OUT_EXPO },
    };

    if (href) {
      return (
        <motion.div
          ref={cardRef}
          {...motionProps}
          className="will-change-transform"
        >
          <Link href={href} className={wrapperClass} ref={ref as never}>
            {inner}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.article 
        ref={cardRef}
        className={cn(wrapperClass, "will-change-transform")} 
        {...motionProps}
        {...props}
      >
        {inner}
      </motion.article>
    );
  },
);
BentoCard.displayName = "BentoCard";
