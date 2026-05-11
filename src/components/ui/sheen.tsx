/**
 * Decorative diagonal sheen band that sweeps continuously across the
 * parent pebble. Place inside a `relative overflow-hidden` container.
 * Auto-paused on mobile + reduced-motion via animations.css.
 */
type SheenProps = {
  delay?: number;
  duration?: number;
};

export function Sheen({ delay = 0, duration = 6 }: SheenProps) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
      style={{
        background:
          "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        mixBlendMode: "soft-light",
      }}
    />
  );
}
