"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { GradientPlaceholder } from "./gradient-placeholder";

type LazyImageProps = Omit<ImageProps, "placeholder"> & {
  /** Optional inline base64 blur seed; falls back to a static gradient. */
  blurDataURL?: string;
  /** When true, show a gradient placeholder instead of the image (dev mode). */
  fallback?: boolean;
  fallbackLabel?: string;
};

// Pastel blur seed matching the FlorioIn Light Glass palette
// (pink #FF8DDA → cyan #38E4FF) — replaces the indigo seed from the
// pre-rebrand palette.
const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjRkY4RERBIiBzdG9wLW9wYWNpdHk9IjAuMzUiLz48c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iI0E4OENGRiIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzOEU0RkYiIHN0b3Atb3BhY2l0eT0iMC4yNSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==";

export function LazyImage({
  className,
  blurDataURL,
  fallback,
  fallbackLabel,
  alt,
  ...props
}: LazyImageProps) {
  const [errored, setErrored] = useState(false);

  if (fallback || errored) {
    return (
      <GradientPlaceholder
        label={fallbackLabel ?? alt}
        className={cn("aspect-[16/10]", className)}
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL ?? DEFAULT_BLUR}
      onError={() => setErrored(true)}
      className={cn(
        "rounded-[var(--radius-lg)] object-cover",
        "transition-opacity duration-700 ease-[var(--ease-out-expo)]",
        className,
      )}
    />
  );
}
