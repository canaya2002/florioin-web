"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  words: string[];
  intervalMs?: number;
  className?: string;
};

export function RotatingText({
  words,
  intervalMs = 2400,
  className,
}: RotatingTextProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduced, words.length, intervalMs]);

  return (
    <span
      className={cn("inline-block align-baseline", className)}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={reduced ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
