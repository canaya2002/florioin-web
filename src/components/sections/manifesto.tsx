import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";

type ManifestoProps = {
  dict: Dictionary;
};

export function Manifesto({ dict }: ManifestoProps) {
  const m = dict.home.manifesto;
  return (
    <Container as="section" bleed>
      <blockquote className="gcard mx-auto m-0 max-w-[1024px] px-[var(--space-12)] py-[var(--space-12)] text-center md:px-[56px]">
        <span className="eyebrow mb-[var(--space-4)] inline-block">
          {m.eyebrow}
        </span>
        <p className="m-0 font-display text-[clamp(28px,4vw,44px)] leading-[1.18] tracking-[-0.03em] text-[var(--fg)] [text-wrap:balance]">
          {m.bodyPrefix}{" "}
          <span className="text-gradient">{m.bodyHighlight}</span>.
          <br />
          {m.bodySuffix}
        </p>
      </blockquote>
    </Container>
  );
}
