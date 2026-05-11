"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 20 });
  const springY = useSpring(y, { stiffness: 240, damping: 20 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/* 3D Tilt effect on hover */
type TiltCardProps = {
  children: ReactNode;
  /** Max rotation in degrees */
  maxRotation?: number;
  /** Scale on hover */
  scale?: number;
  className?: string;
};

export function TiltCard({
  children,
  maxRotation = 8,
  scale = 1.02,
  className,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const springScale = useSpring(scaleValue, { stiffness: 200, damping: 20 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    rotateX.set((-mouseY / (rect.height / 2)) * maxRotation);
    rotateY.set((mouseX / (rect.width / 2)) * maxRotation);
    scaleValue.set(scale);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scaleValue.set(1);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

/* Spotlight effect that follows cursor */
type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(168, 140, 255, 0.15)",
}: SpotlightCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const opacity = useMotionValue(0);
  
  const springX = useSpring(spotlightX, { stiffness: 200, damping: 30 });
  const springY = useSpring(spotlightY, { stiffness: 200, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 200, damping: 30 });

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    spotlightX.set(x);
    spotlightY.set(y);
    opacity.set(1);
  }

  function handleLeave() {
    opacity.set(0);
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: springOpacity,
          background: `radial-gradient(600px circle at var(--x) var(--y), ${spotlightColor}, transparent 40%)`,
          // @ts-expect-error CSS custom properties
          "--x": springX.get() + "%",
          "--y": springY.get() + "%",
        }}
      />
      {children}
    </motion.div>
  );
}
