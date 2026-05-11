"use client";

import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type ParallaxLayerProps = {
  children: ReactNode;
  /** Speed multiplier. Positive = moves slower than scroll, negative = moves faster. 0.5 is subtle, 1 is dramatic. */
  speed?: number;
  /** Direction of movement */
  direction?: "vertical" | "horizontal";
  className?: string;
};

export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "vertical",
  className,
}: ParallaxLayerProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const range = 100 * speed;

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [range, -range]),
    springConfig
  );
  
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [range, -range]),
    springConfig
  );

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const motionStyle = direction === "vertical" 
    ? { y } 
    : { x };

  return (
    <motion.div 
      ref={ref} 
      style={motionStyle} 
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/* Multi-layer parallax section with foreground, midground, background */
type ParallaxSectionProps = {
  foreground?: ReactNode;
  midground?: ReactNode;
  background?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Intensity of the parallax effect */
  intensity?: "subtle" | "medium" | "dramatic";
};

const intensityMap = {
  subtle: { fg: 0.2, mg: 0.4, bg: 0.6 },
  medium: { fg: 0.3, mg: 0.6, bg: 0.9 },
  dramatic: { fg: 0.5, mg: 1, bg: 1.5 },
};

export function ParallaxSection({
  foreground,
  midground,
  background,
  children,
  className,
  intensity = "medium",
}: ParallaxSectionProps) {
  const speeds = intensityMap[intensity];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {background && (
        <div className="absolute inset-0 z-0">
          <ParallaxLayer speed={speeds.bg}>
            {background}
          </ParallaxLayer>
        </div>
      )}
      {midground && (
        <div className="absolute inset-0 z-10">
          <ParallaxLayer speed={speeds.mg}>
            {midground}
          </ParallaxLayer>
        </div>
      )}
      {children && (
        <div className="relative z-20">
          {children}
        </div>
      )}
      {foreground && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <ParallaxLayer speed={speeds.fg}>
            {foreground}
          </ParallaxLayer>
        </div>
      )}
    </div>
  );
}

/* Scroll-linked opacity for text reveals */
type ScrollOpacityProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollOpacity({ children, className }: ScrollOpacityProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity, y }} 
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/* Horizontal scroll section */
type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.67%"]);

  if (reduced) {
    return <div className={cn("overflow-x-auto", className)}>{children}</div>;
  }

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className={cn("flex", className)}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
