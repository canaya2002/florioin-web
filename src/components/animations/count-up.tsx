"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
  suffix?: string;
  prefix?: string;
};

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  className,
  format = (n) => Math.round(n).toLocaleString(),
  suffix,
  prefix,
}: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const count = useMotionValue(reduced ? to : from);
  const display = useTransform(count, (v) => format(v));

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, count, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
