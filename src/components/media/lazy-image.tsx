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

const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCAxMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNjM2NkYxIiBzdG9wLW9wYWNpdHk9IjAuMyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzhCNUNGNiIgc3RvcC1vcGFjaXR5PSIwLjIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=";

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
