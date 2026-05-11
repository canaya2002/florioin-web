"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Orb = {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  hue: "pink" | "violet" | "cyan" | "magenta";
  delay: number;
  orbitX: number;
  orbitY: number;
  duration: number;
  /** Parallax depth — 0 (far) to 1 (near). Drives scroll-bound Y travel. */
  depth: number;
};

const HUES = {
  pink: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(255,141,218,0.55) 35%, rgba(255,141,218,0.0) 72%)",
  violet:
    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(168,140,255,0.55) 35%, rgba(168,140,255,0.0) 72%)",
  cyan: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(56,228,255,0.55) 35%, rgba(56,228,255,0.0) 72%)",
  magenta:
    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(242,91,216,0.55) 35%, rgba(242,91,216,0.0) 72%)",
} as const;

const DEFAULT_ORBS: Orb[] = [
  { size: 200, top: "8%", left: "6%", hue: "pink", delay: 0, orbitX: 24, orbitY: -22, duration: 14, depth: 0.2 },
  { size: 160, top: "30%", right: "8%", hue: "violet", delay: -3, orbitX: -28, orbitY: 18, duration: 18, depth: 0.45 },
  { size: 120, top: "62%", left: "16%", hue: "cyan", delay: -5, orbitX: 18, orbitY: 24, duration: 22, depth: 0.65 },
  { size: 90, top: "12%", right: "26%", hue: "magenta", delay: -1, orbitX: -22, orbitY: -18, duration: 16, depth: 0.85 },
  { size: 70, top: "70%", right: "14%", hue: "cyan", delay: -7, orbitX: 16, orbitY: -22, duration: 19, depth: 0.95 },
  { size: 130, top: "84%", left: "60%", hue: "violet", delay: -2, orbitX: -20, orbitY: -28, duration: 17, depth: 0.35 },
];

type FloatingOrbsProps = {
  className?: string;
  /** Provide custom orb configurations. Defaults to a balanced six-orb set. */
  orbs?: Orb[];
  /** Strength of the scroll parallax effect. 0 = none, 1 = full. */
  parallax?: number;
};

/**
 * 3D-feeling floating glass orbs. Each orb has its own orbit timing,
 * hue, and parallax depth so they never sync up and the scene reads
 * organic and alive. The whole layer is pointer-events: none so it
 * doesn't interfere with content.
 */
export function FloatingOrbs({
  className,
  orbs = DEFAULT_ORBS,
  parallax = 0.4,
}: FloatingOrbsProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {orbs.map((orb, i) => (
        <OrbLayer
          key={i}
          orb={orb}
          parallax={parallax}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

function OrbLayer({
  orb,
  parallax,
  progress,
  reduced,
}: {
  orb: Orb;
  parallax: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const travel = parallax * orb.depth * 180;
  const y = useTransform(progress, [0, 1], [travel, -travel]);

  return (
    <motion.span
      className="absolute block"
      style={{
        width: orb.size,
        height: orb.size,
        top: orb.top,
        left: orb.left,
        right: orb.right,
        bottom: orb.bottom,
        ...(reduced ? {} : { y }),
      }}
    >
      <span
        className={reduced ? "block h-full w-full" : "animate-orbit block h-full w-full"}
        style={{
          ["--orbit-x" as string]: `${orb.orbitX}px`,
          ["--orbit-y" as string]: `${orb.orbitY}px`,
          ["--orbit-duration" as string]: `${orb.duration}s`,
          animationDelay: `${orb.delay}s`,
        }}
      >
        <span
          className={reduced ? "block h-full w-full rounded-full" : "animate-breathe block h-full w-full rounded-full"}
          style={{
            background: HUES[orb.hue],
            filter: "blur(2px)",
            animationDelay: `${orb.delay * 0.5}s`,
          }}
        />
      </span>
    </motion.span>
  );
}
