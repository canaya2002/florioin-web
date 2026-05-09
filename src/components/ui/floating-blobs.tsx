import { cn } from "@/lib/utils";

type Variant = "default" | "hero" | "subtle" | "violet" | "cyan";

type FloatingBlobsProps = {
  variant?: Variant;
  className?: string;
};

type BlobConfig = {
  cls: string;
  style: React.CSSProperties;
};

const VARIANTS: Record<Variant, BlobConfig[]> = {
  hero: [
    {
      cls: "blob blob--pink animate-drift-1",
      style: {
        width: "min(44vw, 520px)",
        height: "min(44vw, 520px)",
        top: "-12%",
        left: "-8%",
        opacity: 0.5,
      },
    },
    {
      cls: "blob blob--violet animate-drift-2",
      style: {
        width: "min(40vw, 480px)",
        height: "min(40vw, 480px)",
        top: "10%",
        right: "-10%",
        opacity: 0.45,
      },
    },
    {
      cls: "blob blob--cyan animate-drift-3",
      style: {
        width: "min(36vw, 440px)",
        height: "min(36vw, 440px)",
        bottom: "-15%",
        left: "30%",
        opacity: 0.4,
      },
    },
  ],
  subtle: [
    {
      cls: "blob blob--violet animate-drift-1",
      style: {
        width: "min(32vw, 380px)",
        height: "min(32vw, 380px)",
        top: "10%",
        left: "10%",
        opacity: 0.3,
      },
    },
    {
      cls: "blob blob--cyan animate-drift-2",
      style: {
        width: "min(30vw, 360px)",
        height: "min(30vw, 360px)",
        bottom: "-10%",
        right: "5%",
        opacity: 0.28,
      },
    },
  ],
  violet: [
    {
      cls: "blob blob--violet animate-drift-1",
      style: {
        width: "min(38vw, 460px)",
        height: "min(38vw, 460px)",
        top: "-15%",
        right: "-10%",
        opacity: 0.45,
      },
    },
    {
      cls: "blob blob--magenta animate-drift-3",
      style: {
        width: "min(30vw, 360px)",
        height: "min(30vw, 360px)",
        bottom: "-10%",
        left: "-5%",
        opacity: 0.35,
      },
    },
  ],
  cyan: [
    {
      cls: "blob blob--cyan animate-drift-2",
      style: {
        width: "min(40vw, 480px)",
        height: "min(40vw, 480px)",
        top: "10%",
        left: "-10%",
        opacity: 0.4,
      },
    },
    {
      cls: "blob blob--violet animate-drift-1",
      style: {
        width: "min(30vw, 360px)",
        height: "min(30vw, 360px)",
        bottom: "-15%",
        right: "10%",
        opacity: 0.32,
      },
    },
  ],
  default: [
    {
      cls: "blob blob--pink animate-drift-1",
      style: {
        width: "min(32vw, 380px)",
        height: "min(32vw, 380px)",
        top: "-10%",
        left: "10%",
        opacity: 0.4,
      },
    },
    {
      cls: "blob blob--violet animate-drift-2",
      style: {
        width: "min(30vw, 360px)",
        height: "min(30vw, 360px)",
        top: "30%",
        right: "-5%",
        opacity: 0.35,
      },
    },
    {
      cls: "blob blob--cyan animate-drift-3",
      style: {
        width: "min(28vw, 340px)",
        height: "min(28vw, 340px)",
        bottom: "-10%",
        left: "20%",
        opacity: 0.32,
      },
    },
  ],
};

/**
 * Decorative pastel blobs that drift slowly behind a section.
 * - All sizes capped with `min(vw, px)` so blobs never push past the viewport
 *   width (no horizontal scroll).
 * - On mobile, the parent `animate-drift-*` rules in animations.css already
 *   pause animation; the blob still renders as a soft static gradient.
 * - Always aria-hidden + pointer-events: none.
 */
export function FloatingBlobs({
  variant = "default",
  className,
}: FloatingBlobsProps) {
  const blobs = VARIANTS[variant];
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {blobs.map((b, i) => (
        <span key={i} className={b.cls} style={b.style} />
      ))}
    </div>
  );
}
