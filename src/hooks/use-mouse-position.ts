"use client";

import { useState, useEffect, useCallback } from "react";

type MousePosition = {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
};

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

/* Hook for tracking mouse position relative to an element */
export function useRelativeMousePosition(elementRef: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0, y: 0, isHovering: false });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x, y, isHovering: true });
  }, [elementRef]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0, isHovering: false });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [elementRef, handleMouseMove, handleMouseLeave]);

  return position;
}
