"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { MediaSlot } from "@/components/media/media-slot";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type HeroCanvasProps = {
  locale: "es" | "en";
};

/**
 * 3D-feeling hero stage. The center asset is a MediaSlot — Carlos drops
 * the real workspace video/gif at `/public/media/hero/workspace.<ext>`.
 * Around it: ambient orbiting glass orbs at three depth planes that
 * react to cursor and scroll. No fake UI is rendered.
 */
export function HeroCanvas({ locale }: HeroCanvasProps) {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const isEs = locale === "es";

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [40, -60]);

  useEffect(() => {
    if (reduced) return;
    const el = root.current;
    if (!el) return;
    function move(e: PointerEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      px.set(nx);
      py.set(ny);
    }
    function leave() {
      px.set(0);
      py.set(0);
    }
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [px, py, reduced]);

  // Depth-driven cursor parallax — subtle on the media, stronger on the
  // orbs to sell the 3D feel.
  const tiltX = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  const planeMedia = {
    x: useTransform(sx, [-0.5, 0.5], [-6, 6]),
    y: useTransform(sy, [-0.5, 0.5], [-5, 5]),
  };
  const planeNear = {
    x: useTransform(sx, [-0.5, 0.5], [-32, 32]),
    y: useTransform(sy, [-0.5, 0.5], [-24, 24]),
  };
  const planeMid = {
    x: useTransform(sx, [-0.5, 0.5], [-18, 18]),
    y: useTransform(sy, [-0.5, 0.5], [-12, 12]),
  };

  return (
    <motion.div
      ref={root}
      className="relative mx-auto aspect-[16/10] w-full max-w-[1180px] [perspective:1800px]"
      style={reduced ? undefined : { y: scrollY }}
    >
      {/* Center underglow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-[8%] right-[8%] h-40 rounded-full opacity-70 blur-3xl"
        style={{ background: "var(--gradient-hero-soft)" }}
      />

      {/* Decorative floating orbs at three depths */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-2 hidden h-52 w-52 rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(255,141,218,0.55) 35%, rgba(255,141,218,0) 72%)",
          filter: "blur(1px)",
          ...(reduced ? {} : { x: planeNear.x, y: planeNear.y }),
        }}
      >
        <span
          className="block h-full w-full animate-orbit rounded-full"
          style={{
            ["--orbit-x" as string]: "32px",
            ["--orbit-y" as string]: "-26px",
            ["--orbit-duration" as string]: "17s",
          }}
        />
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-14 top-[28%] hidden h-44 w-44 rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(56,228,255,0.55) 35%, rgba(56,228,255,0) 72%)",
          filter: "blur(1px)",
          ...(reduced ? {} : { x: planeNear.x, y: planeNear.y }),
        }}
      >
        <span
          className="block h-full w-full animate-orbit rounded-full"
          style={{
            ["--orbit-x" as string]: "-26px",
            ["--orbit-y" as string]: "30px",
            ["--orbit-duration" as string]: "21s",
          }}
        />
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-[22%] hidden h-36 w-36 rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9), rgba(168,140,255,0.55) 35%, rgba(168,140,255,0) 72%)",
          filter: "blur(1px)",
          ...(reduced ? {} : { x: planeMid.x, y: planeMid.y }),
        }}
      >
        <span
          className="block h-full w-full animate-orbit rounded-full"
          style={{
            ["--orbit-x" as string]: "22px",
            ["--orbit-y" as string]: "-28px",
            ["--orbit-duration" as string]: "19s",
            animationDelay: "-4s",
          }}
        />
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-[-6%] right-[12%] hidden h-28 w-28 rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(242,91,216,0.50) 35%, rgba(242,91,216,0) 72%)",
          filter: "blur(1px)",
          ...(reduced ? {} : { x: planeMid.x, y: planeMid.y }),
        }}
      >
        <span
          className="block h-full w-full animate-orbit rounded-full"
          style={{
            ["--orbit-x" as string]: "-18px",
            ["--orbit-y" as string]: "-22px",
            ["--orbit-duration" as string]: "23s",
            animationDelay: "-2s",
          }}
        />
      </motion.span>

      {/* Center stage — the real asset goes here. Subtle 3D tilt + parallax */}
      <motion.div
        className="absolute inset-0 origin-center"
        style={
          reduced
            ? undefined
            : {
                x: planeMedia.x,
                y: planeMedia.y,
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 1800,
              }
        }
      >
        <MediaSlot
          name="hero/workspace"
          aspect="16/10"
          radius="var(--radius-2xl)"
          caption={
            isEs
              ? "Loop del workspace en acción (video o gif optimizado para LCP)"
              : "Workspace loop in action (LCP-friendly video or gif)"
          }
        />
      </motion.div>
    </motion.div>
  );
}
