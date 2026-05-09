import { cn } from "@/lib/utils";

type Variant = "default" | "hero" | "subtle" | "violet" | "cyan";

type FloatingBlobsProps = {
  variant?: Variant;
  className?: string;
};

/**
 * Decorative pastel blobs that drift slowly behind a section.
 * Pure CSS, GPU friendly (transform/opacity only) and aria-hidden.
 *
 * Use sparingly — too many simultaneous large blurs hurt paint.
 */
export function FloatingBlobs({
  variant = "default",
  className,
}: FloatingBlobsProps) {
  const blobs =
    variant === "hero"
      ? [
          {
            cls: "blob blob--pink animate-drift-1",
            style: {
              width: "44vw",
              height: "44vw",
              top: "-12%",
              left: "-8%",
              opacity: 0.5,
            },
          },
          {
            cls: "blob blob--violet animate-drift-2",
            style: {
              width: "40vw",
              height: "40vw",
              top: "10%",
              right: "-10%",
              opacity: 0.45,
            },
          },
          {
            cls: "blob blob--cyan animate-drift-3",
            style: {
              width: "36vw",
              height: "36vw",
              bottom: "-15%",
              left: "30%",
              opacity: 0.4,
            },
          },
        ]
      : variant === "subtle"
        ? [
            {
              cls: "blob blob--violet animate-drift-1",
              style: {
                width: "32vw",
                height: "32vw",
                top: "10%",
                left: "10%",
                opacity: 0.3,
              },
            },
            {
              cls: "blob blob--cyan animate-drift-2",
              style: {
                width: "30vw",
                height: "30vw",
                bottom: "-10%",
                right: "5%",
                opacity: 0.28,
              },
            },
          ]
        : variant === "violet"
          ? [
              {
                cls: "blob blob--violet animate-drift-1",
                style: {
                  width: "38vw",
                  height: "38vw",
                  top: "-15%",
                  right: "-10%",
                  opacity: 0.45,
                },
              },
              {
                cls: "blob blob--magenta animate-drift-3",
                style: {
                  width: "30vw",
                  height: "30vw",
                  bottom: "-10%",
                  left: "-5%",
                  opacity: 0.35,
                },
              },
            ]
          : variant === "cyan"
            ? [
                {
                  cls: "blob blob--cyan animate-drift-2",
                  style: {
                    width: "40vw",
                    height: "40vw",
                    top: "10%",
                    left: "-10%",
                    opacity: 0.4,
                  },
                },
                {
                  cls: "blob blob--violet animate-drift-1",
                  style: {
                    width: "30vw",
                    height: "30vw",
                    bottom: "-15%",
                    right: "10%",
                    opacity: 0.32,
                  },
                },
              ]
            : [
                {
                  cls: "blob blob--pink animate-drift-1",
                  style: {
                    width: "32vw",
                    height: "32vw",
                    top: "-10%",
                    left: "10%",
                    opacity: 0.4,
                  },
                },
                {
                  cls: "blob blob--violet animate-drift-2",
                  style: {
                    width: "30vw",
                    height: "30vw",
                    top: "30%",
                    right: "-5%",
                    opacity: 0.35,
                  },
                },
                {
                  cls: "blob blob--cyan animate-drift-3",
                  style: {
                    width: "28vw",
                    height: "28vw",
                    bottom: "-10%",
                    left: "20%",
                    opacity: 0.32,
                  },
                },
              ];

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
