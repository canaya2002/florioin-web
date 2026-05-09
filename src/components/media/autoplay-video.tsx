"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { GradientPlaceholder } from "./gradient-placeholder";

type AutoplayVideoProps = {
  /** Path to MP4 source (H.264). Required. */
  src?: string;
  /** Path to WebM source (VP9). Optional but recommended for smaller files. */
  webmSrc?: string;
  /** Static poster shown until the first frame loads. Required when src is set. */
  poster?: string;
  className?: string;
  /** Aspect ratio class (defaults to 16/10 to match bento card visuals). */
  aspect?: string;
  caption?: string;
  /** When true, render gradient placeholder instead (use until real videos exist). */
  fallback?: boolean;
};

/**
 * IntersectionObserver-driven autoplay video. Plays when ≥ 25% in viewport,
 * pauses when out. Always muted/loop/playsInline. Reduces to a static poster
 * (or placeholder) when prefers-reduced-motion is set.
 */
export function AutoplayVideo({
  src,
  webmSrc,
  poster,
  className,
  aspect = "aspect-[16/10]",
  caption,
  fallback,
}: AutoplayVideoProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (!src || reduced || !ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          node.play().catch(() => {
            /* autoplay blocked — leave paused */
          });
        } else {
          node.pause();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [src, reduced]);

  if (fallback || !src || errored) {
    return (
      <GradientPlaceholder
        className={cn(aspect, "w-full", className)}
        caption={caption ?? "Demo video coming soon"}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={cn(
        "w-full rounded-[var(--radius-xl)] border border-[var(--border-glass)] object-cover shadow-[var(--shadow-md)]",
        aspect,
        className,
      )}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={!reduced}
      preload="none"
      aria-hidden={!caption}
      onError={() => setErrored(true)}
      aria-label={caption}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
