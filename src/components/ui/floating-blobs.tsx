/**
 * After the "pure white only" feedback, section-wide pastel washes are
 * gone. This component is a no-op kept so existing call sites keep
 * compiling without a sweeping import diff. For ambient color, use
 * `<FloatingOrbs />` *inside* a contained visual (hero canvas, product
 * mock) rather than under a section.
 */
type Variant = "default" | "hero" | "subtle" | "violet" | "cyan";

export type FloatingBlobsProps = {
  variant?: Variant;
  className?: string;
};

export function FloatingBlobs(props?: FloatingBlobsProps): null {
  // Reference the param so the linter doesn't flag it; the value is
  // intentionally unused — pastel washes are gone.
  void props;
  return null;
}
