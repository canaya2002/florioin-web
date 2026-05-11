"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { track } from "@/lib/analytics";

/**
 * Fires `scroll.depth_25/50/75/100` once per page session when the user
 * crosses the corresponding scroll-depth milestone. Resets when the path
 * changes (SPA navigations).
 *
 * Mount once near the root (e.g., in the marketing layout) — it watches
 * window scroll and self-cleans listeners.
 */
const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = (typeof MILESTONES)[number];

export function ScrollDepthTracker() {
  const pathname = usePathname();
  const fired = useRef<Set<Milestone>>(new Set());

  useEffect(() => {
    fired.current.clear();

    function compute(): number {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 100;
      return Math.min(100, (window.scrollY / scrollable) * 100);
    }

    function onScroll() {
      const depth = compute();
      for (const m of MILESTONES) {
        if (depth >= m && !fired.current.has(m)) {
          fired.current.add(m);
          const eventName = `scroll.depth_${m}` as const;
          track(eventName, { path: pathname });
        }
      }
    }

    // Fire immediately for pages shorter than viewport
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
