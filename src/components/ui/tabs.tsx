"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--glass)] backdrop-blur-[var(--blur-glass-soft)] p-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium",
      "ring-offset-[var(--bg)] transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-[var(--fg)] data-[state=active]:shadow-[var(--shadow-sm)] data-[state=active]:border data-[state=active]:border-[var(--border-glass)]",
      "data-[state=inactive]:text-[var(--fg-muted)] data-[state=inactive]:hover:text-[var(--fg)]",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 ring-offset-[var(--bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
