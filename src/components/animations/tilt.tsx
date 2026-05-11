"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. Defaults to 5 — premium, never garish. */
  max?: number;
  /** Optional fixed perspective override, in px. */
  perspective?: number;
};

/**
 * Lightweight 3D tilt-on-hover. Sets `--rx` / `--ry` CSS variables on a
 * child with the `.tilt-3d` class (defined in animations.css) so the
 * actual transform is plain CSS and runs on the compositor.
 *
 * Respects prefers-reduced-motion: returns a plain wrapper with no effect.
 */
export function Tilt({
  children,
  className,
  max = 5,
  perspective = 1200,
}: TiltProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const child = el.firstElementChild as HTMLElement | null;
    if (!child) return;
    child.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    child.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
  }

  function handleLeave() {
    const child = ref.current?.firstElementChild as HTMLElement | null;
    if (!child) return;
    child.style.setProperty("--rx", "0deg");
    child.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </div>
  );
}
