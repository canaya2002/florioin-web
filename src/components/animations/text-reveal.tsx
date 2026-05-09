"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function TextReveal({
  children,
  className,
  delay = 0.2,
  staggerChildren = 0.04,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = useMemo(() => children.split(" "), [children]);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren, delayChildren: delay },
        },
      }}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: EASE_OUT_EXPO },
              },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
