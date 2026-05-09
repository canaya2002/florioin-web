"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type RevealOnScrollProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Pixels. Spec rule: keep ≤ 20. */
  distance?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const directionToOffset = (
  direction: RevealOnScrollProps["direction"],
  distance: number,
) => {
  switch (direction) {
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "none":
      return { x: 0, y: 0 };
    case "up":
    default:
      return { x: 0, y: distance };
  }
};

export function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  distance = 20,
  ...rest
}: RevealOnScrollProps) {
  const reduced = useReducedMotion();
  const safeDistance = Math.min(distance, 20);
  const offset = directionToOffset(direction, safeDistance);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay,
        ease: EASE_OUT_EXPO,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
