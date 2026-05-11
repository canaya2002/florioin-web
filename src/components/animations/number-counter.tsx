"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type NumberCounterProps = {
  value: number;
  /** Duration in seconds */
  duration?: number;
  /** Decimal places to show */
  decimals?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "%", "+") */
  suffix?: string;
  className?: string;
  /** Format with commas */
  formatNumber?: boolean;
};

export function NumberCounter({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  formatNumber = true,
}: NumberCounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  
  const displayValue = useTransform(springValue, (latest) => {
    const formatted = latest.toFixed(decimals);
    if (formatNumber) {
      const parts = formatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    return formatted;
  });

  useEffect(() => {
    if (isInView && !reduced) {
      motionValue.set(value);
    } else if (reduced) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue, reduced]);

  if (reduced) {
    const formatted = formatNumber 
      ? value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : value.toFixed(decimals);
    return (
      <span className={className}>
        {prefix}{formatted}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

/* Animated percentage bar */
type PercentageBarProps = {
  value: number;
  /** Max value for the bar (default 100) */
  max?: number;
  className?: string;
  barClassName?: string;
  /** Show the percentage number */
  showValue?: boolean;
};

export function PercentageBar({
  value,
  max = 100,
  className,
  barClassName,
  showValue = true,
}: PercentageBarProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-[var(--c-pink)] via-[var(--c-violet)] to-[var(--c-cyan)]",
            barClassName
          )}
          initial={{ width: 0 }}
          animate={isInView || reduced ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: reduced ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
        />
      </div>
      {showValue && (
        <motion.span
          className="absolute -top-6 text-sm font-medium text-[var(--fg-muted)]"
          initial={{ opacity: 0, left: 0 }}
          animate={
            isInView || reduced
              ? { opacity: 1, left: `${percentage}%` }
              : { opacity: 0, left: 0 }
          }
          transition={{
            duration: reduced ? 0 : 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2,
          }}
          style={{ transform: "translateX(-50%)" }}
        >
          {value}%
        </motion.span>
      )}
    </div>
  );
}
