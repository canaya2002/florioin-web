"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  /** Seconds. Defaults to 0.4s — the spec eyebrow timing. */
  duration?: number;
};

// Canonical reveal easing (--ease-out-expo).
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function FadeIn({
  children,
  delay = 0,
  duration = 0.4,
  ...rest
}: FadeInProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
