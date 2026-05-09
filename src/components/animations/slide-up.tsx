"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SlideUpProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  /** Pixels. Spec rule: keep ≤ 20. */
  distance?: number;
  /** Seconds. */
  duration?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function SlideUp({
  children,
  delay = 0,
  distance = 16,
  duration = 0.5,
  ...rest
}: SlideUpProps) {
  const reduced = useReducedMotion();
  // Spec rule: distance must be ≤ 20px — clamp defensively.
  const safeDistance = Math.min(distance, 20);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: safeDistance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
