"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SlideUpProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
};

export function SlideUp({
  children,
  delay = 0,
  distance = 24,
  duration = 0.6,
  ...rest
}: SlideUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
