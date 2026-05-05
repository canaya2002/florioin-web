"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to whatever observability service is wired up.
    console.error(error);
  }, [error]);

  return (
    <div className="container-default flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <span
        aria-hidden
        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-subtle)]"
      >
        <AlertTriangle className="h-7 w-7 text-[var(--warning)]" />
      </span>
      <h1 className="font-display text-[clamp(36px,4.5vw,64px)] leading-tight tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
        We hit an unexpected error. The team has been notified. You can try
        again, or head back home.
      </p>
      {error.digest && (
        <code className="rounded-md bg-[var(--bg-subtle)] px-3 py-1 font-mono text-xs text-[var(--fg-muted)]">
          ref: {error.digest}
        </code>
      )}
      <div className="flex items-center gap-3">
        <Button onClick={reset} size="lg" variant="primary">
          Try again
        </Button>
      </div>
    </div>
  );
}
