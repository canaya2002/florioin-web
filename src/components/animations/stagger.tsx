"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the first child (s). */
  delayChildren?: number;
  /** Time between consecutive children (s). Spec recommends 0.08. */
  staggerChildren?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Stagger({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.08,
}: StaggerProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: reduced
            ? { staggerChildren: 0, delayChildren: 0 }
            : { staggerChildren, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  /** Pixels. Spec rule: keep ≤ 20. */
  distance?: number;
};

export function StaggerItem({
  children,
  className,
  distance = 16,
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const safeDistance = Math.min(distance, 20);
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: safeDistance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
