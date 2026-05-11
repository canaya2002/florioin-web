import { cn } from "@/lib/utils";

type Aspect =
  | "16/10"
  | "16/9"
  | "4/3"
  | "3/2"
  | "1/1"
  | "5/4"
  | "9/16"
  | "21/9";

type MediaSlotProps = {
  /**
   * Logical asset name — exact filename (without extension) Carlos should
   * drop into `/public/media/<name>.<ext>`. Shown as a small corner chip
   * so the placeholder reads as a decorative shape, not as content.
   *
   * Examples:
   *   "hero/workspace"       → /public/media/hero/workspace.mp4
   *   "bento/copilot"        → /public/media/bento/copilot.webp
   */
  name: string;
  /** Aspect ratio. Defaults to 16/10 (matches the hero canvas). */
  aspect?: Aspect;
  /** Optional caption — only shown when expanded view is enabled. */
  caption?: string;
  /** Override border radius for tiles whose shape needs to be specific. */
  radius?: string;
  /** Suggested file format(s) — shown only when expanded. */
  formats?: string;
  className?: string;
};

const ASPECT_CLASSES: Record<Aspect, string> = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "5/4": "aspect-[5/4]",
  "9/16": "aspect-[9/16]",
  "21/9": "aspect-[21/9]",
};

/**
 * Asset placeholder. Renders an organic, pastel-tinted shape labeled
 * with the exact filename in a small corner chip — so the slot reads
 * as decorative pastel space, not as content. Once the real asset
 * ships in `/public/media/<name>.<ext>`, this can be swapped for an
 * `<Image>` or `<video>` of the same dimensions — the slot's aspect
 * ratio guarantees zero CLS.
 *
 * NO shadows by design.
 */
export function MediaSlot({
  name,
  aspect = "16/10",
  radius = "64px 96px 60px 84px / 84px 60px 96px 64px",
  className,
}: MediaSlotProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        ASPECT_CLASSES[aspect],
        className,
      )}
      style={{ borderRadius: radius }}
    >
      {/* Pastel media-slot fill */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,141,218,0.28) 0%, rgba(168,140,255,0.24) 50%, rgba(56,228,255,0.22) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 60% at 30% 25%, rgba(255,255,255,0.55), transparent 60%)",
        }}
      />
      {/* Continuous sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-[-30%] -left-1/3 w-2/3 animate-sheen-wave"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
          animationDuration: "12s",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Small corner dev chip — minimal so the placeholder reads as
          space, not as content. Removed once the asset is dropped in. */}
      <span className="absolute bottom-3 left-3 rounded-full bg-white/75 px-2 py-0.5 font-mono text-[10px] text-[var(--fg-muted)] backdrop-blur">
        {name}
      </span>
    </div>
  );
}
