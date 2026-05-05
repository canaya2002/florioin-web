"use client";

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/locales";

const STORAGE_KEY = "florioin-cookies-decision";
const EVENT = "florioin-cookies-change";

type CookieBannerProps = {
  locale: Locale;
};

const subscribe = (callback: () => void): (() => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getDecision = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
// On the server we treat the user as undecided so the banner is server-rendered.
const getServerDecision = (): string | null => null;

/**
 * Minimal cookie banner. Persists the user's choice to `localStorage` so it
 * never reappears once dismissed. We don't load analytics until the user
 * accepts, so the banner doubles as a consent gate.
 */
export function CookieBanner({ locale }: CookieBannerProps) {
  const decision = useSyncExternalStore(
    subscribe,
    getDecision,
    getServerDecision,
  );
  const isEs = locale === "es";

  function decide(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      window.dispatchEvent(new Event(EVENT));
    } catch {
      /* private mode — ignore */
    }
  }

  if (decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={isEs ? "Aviso de cookies" : "Cookie notice"}
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg)] p-5 shadow-[var(--shadow-xl)] md:left-auto md:right-6"
    >
      <div className="flex items-start gap-3">
        <Cookie
          aria-hidden
          className="h-5 w-5 shrink-0 text-[var(--primary)]"
        />
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-relaxed text-[var(--fg-secondary)]">
            {isEs ? (
              <>
                Usamos cookies estrictamente necesarias y, opcionalmente,
                analytics. Detalle en{" "}
                <Link
                  href={`/${locale}/legal/cookies`}
                  className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
                >
                  /legal/cookies
                </Link>
                .
              </>
            ) : (
              <>
                We use strictly necessary cookies and optional analytics.
                Details at{" "}
                <Link
                  href={`/${locale}/legal/cookies`}
                  className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
                >
                  /legal/cookies
                </Link>
                .
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => decide("accepted")}
            >
              {isEs ? "Aceptar" : "Accept"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => decide("rejected")}
            >
              {isEs ? "Solo necesarias" : "Necessary only"}
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => decide("rejected")}
          aria-label={isEs ? "Cerrar" : "Close"}
          className="ml-auto rounded-full p-1 text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
