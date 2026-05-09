"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { GradientPlaceholder } from "./gradient-placeholder";

type MediaShellProps = {
  /** Optional MP4 source. When omitted (or fallback=true), renders a poster
   *  or pretty placeholder — never blocks LCP with a video. */
  src?: string;
  /** Optional WebM source for browsers that prefer it. */
  webmSrc?: string;
  /** Path to the poster image. Required for any video to avoid CLS / black flash. */
  poster?: string;
  /** Force the placeholder. */
  fallback?: boolean;
  /** Aspect ratio class. Defaults to 16/9 — matches hero & feature cards. */
  aspect?: string;
  className?: string;
  caption?: string;
  /** "violet" | "cyan" | "dawn" — used by the placeholder shown until a video
   *  is dropped in. */
  variant?: "default" | "violet" | "cyan" | "dawn" | "frosted";
  /** Decorative content (HUD chrome, logos) drawn on top of the media. */
  children?: ReactNode;
  /** When true, video stays paused until user interacts. Defaults to false on
   *  desktop (autoplay-on-visible) and true on small screens. */
  clickToPlay?: boolean;
};

/**
 * Premium media shell. Designed so the page never pays for a video until the
 * user is about to see it.
 *
 * Behavior:
 *  - Server renders the glass shell + poster only, never a <video>.
 *  - On mount, an IntersectionObserver waits until the shell is ~near the
 *    viewport, and only then mounts the <video> with `preload="none"`.
 *  - Reduced motion + small mobile screens stay on the poster permanently.
 *  - Aspect ratio is reserved with CSS, so swapping placeholder ↔ video
 *    causes zero layout shift.
 */
export function MediaShell({
  src,
  webmSrc,
  poster,
  fallback,
  aspect = "aspect-[16/9]",
  className,
  caption,
  variant = "dawn",
  children,
  clickToPlay,
}: MediaShellProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [errored, setErrored] = useState(false);
  const [paused, setPaused] = useState(true);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const requireClick = clickToPlay ?? isMobile;

  // Wait until the shell is close to the viewport before mounting <video>.
  useEffect(() => {
    if (!src || reduced || errored) return;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          setNear(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [src, reduced, errored]);

  // When the video is in view (and not click-to-play), play it.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced || requireClick) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          v.play()
            .then(() => setPaused(false))
            .catch(() => {
              /* autoplay blocked */
            });
        } else {
          v.pause();
          setPaused(true);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [near, reduced, requireClick]);

  const showPlaceholder = fallback || !src || errored;

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-glass)]",
        "bg-[var(--glass)] backdrop-blur-[var(--blur-glass)] shadow-[var(--shadow-md)]",
        aspect,
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />

      {showPlaceholder ? (
        <GradientPlaceholder
          className="absolute inset-0 h-full w-full"
          caption={caption ?? "Drop video into public/videos/ to replace"}
          variant={variant}
        />
      ) : near ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          autoPlay={!reduced && !requireClick}
          onError={() => setErrored(true)}
          aria-hidden={!caption}
          aria-label={caption}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // Poster-only paint until the user is near. No bytes spent.
        <div
          className="h-full w-full"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Click-to-play overlay (small screens / opt-in) */}
      {!showPlaceholder && requireClick && paused && (
        <button
          type="button"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            v.play().then(() => setPaused(false));
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/15"
          aria-label="Play video"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--fg)] shadow-[var(--shadow-lg)]"
            aria-hidden
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}

      {children && <div className="absolute inset-0 z-20">{children}</div>}
    </div>
  );
}
