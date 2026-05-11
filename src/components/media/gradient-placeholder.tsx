import { cn } from "@/lib/utils";

type GradientPlaceholderProps = {
  label?: string;
  className?: string;
  /** A small caption describing what asset goes here. */
  caption?: string;
  variant?: "default" | "frosted" | "dawn" | "violet" | "cyan";
};

/**
 * Premium media shell used during development before real product imagery
 * exists. Once Carlos drops real assets in, swap this for `<LazyImage>`,
 * `<AutoplayVideo>`, or `<MediaShell>` with a poster.
 *
 * The look is Apple-like: pastel gradient, frosted highlight, soft grid,
 * a tiny glass label so engineers know what asset belongs where.
 */
export function GradientPlaceholder({
  label,
  className,
  caption,
  variant = "default",
}: GradientPlaceholderProps) {
  const gradient =
    variant === "violet"
      ? "linear-gradient(135deg, rgba(168,140,255,0.32) 0%, rgba(255,141,218,0.20) 60%, rgba(56,228,255,0.18) 100%)"
      : variant === "cyan"
        ? "linear-gradient(135deg, rgba(56,228,255,0.32) 0%, rgba(168,140,255,0.22) 60%, rgba(255,141,218,0.16) 100%)"
        : variant === "dawn"
          ? "linear-gradient(135deg, rgba(255,141,218,0.32) 0%, rgba(168,140,255,0.24) 50%, rgba(56,228,255,0.20) 100%)"
          : variant === "frosted"
            ? "linear-gradient(135deg, rgba(245,240,255,0.85) 0%, rgba(238,247,255,0.85) 100%)"
            : "linear-gradient(135deg, rgba(255,141,218,0.20) 0%, rgba(168,140,255,0.20) 50%, rgba(56,228,255,0.18) 100%)";
  return (
    <div
      className={cn(
        // Default aspect locks layout to prevent CLS even when callers forget
        // to pass `aspect-*`. Callers that supply their own ratio override it.
        "relative h-full w-full overflow-hidden rounded-[var(--radius-xl)]",
        "aspect-[16/10]",
        className,
      )}
      style={{
        background: gradient,
      }}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {/* Glass top highlight */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 35%)",
        }}
      />
      {/* Soft radial */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 28% 22%, rgba(255,255,255,0.55), transparent 55%)",
        }}
      />
      {/* Tiny dotted grid (much subtler than the previous square grid) */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(20, 24, 40, 0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
        }}
      />
      {/* Inset white border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[calc(var(--radius-xl)-1px)] ring-1 ring-inset ring-white/45"
      />
      {(label || caption) && (
        <div className="absolute bottom-3 left-3 right-3 inline-flex max-w-fit items-center gap-2 rounded-full border border-[var(--border-glass)] bg-white/55 px-3 py-1.5 text-[11px] font-medium text-[var(--fg)] backdrop-blur-md">
          {label && <span className="font-semibold">{label}</span>}
          {label && caption && <span aria-hidden className="opacity-30">·</span>}
          {caption && <span className="opacity-70">{caption}</span>}
        </div>
      )}
    </div>
  );
}
