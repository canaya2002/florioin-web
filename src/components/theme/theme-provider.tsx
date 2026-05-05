"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const themeSubscribers = new Set<() => void>();

function notifyThemeChange() {
  themeSubscribers.forEach((cb) => cb());
}

function subscribe(callback: () => void): () => void {
  themeSubscribers.add(callback);
  if (typeof window === "undefined") return () => themeSubscribers.delete(callback);
  // Also react if another tab updates `localStorage.theme`.
  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme") callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    themeSubscribers.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — ignore */
    }
    notifyThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
