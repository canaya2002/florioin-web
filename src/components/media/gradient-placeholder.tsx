import { cn } from "@/lib/utils";

type GradientPlaceholderProps = {
  label?: string;
  className?: string;
  /** A small caption describing what asset goes here. */
  caption?: string;
};

/**
 * Used during development before real product imagery exists. Once Carlos
 * drops real assets in, swap this for `<LazyImage>` or `<AutoplayVideo>`.
 */
export function GradientPlaceholder({
  label,
  className,
  caption,
}: GradientPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[var(--radius-lg)]",
        "border border-[var(--border)]",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.16) 50%, rgba(236,72,153,0.14) 100%)",
      }}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {(label || caption) && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-0.5 rounded-md bg-black/30 p-2 text-[11px] font-medium text-white/90 backdrop-blur-sm">
          {label && <span>{label}</span>}
          {caption && <span className="opacity-70">{caption}</span>}
        </div>
      )}
    </div>
  );
}
