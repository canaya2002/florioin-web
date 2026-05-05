"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";

type ThemeToggleProps = {
  className?: string;
  ariaLabel?: string;
};

export function ThemeToggle({
  className,
  ariaLabel = "Toggle theme",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className={className}
    >
      <Sun
        className="h-5 w-5 dark:hidden"
        aria-hidden
        data-active={theme === "light"}
      />
      <Moon
        className="hidden h-5 w-5 dark:block"
        aria-hidden
        data-active={theme === "dark"}
      />
    </Button>
  );
}
