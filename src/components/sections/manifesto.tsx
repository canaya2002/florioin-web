import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";

type ManifestoProps = {
  dict: Dictionary;
};

export function Manifesto({ dict }: ManifestoProps) {
  const m = dict.home.manifesto;
  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <Container>
        <blockquote
          className="relative mx-auto m-0 max-w-[1100px] overflow-hidden bg-white px-[var(--space-8)] py-[var(--space-16)] text-center md:px-[var(--space-16)] md:py-[var(--space-20)]"
          style={{
            borderRadius: "96px 64px 84px 72px / 72px 84px 64px 96px",
          }}
        >
          {/* Colored halo behind the blockquote pebble */}
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(168,140,255,0.30), transparent 65%)",
            }}
          />
          <span className="eyebrow mb-[var(--space-4)] inline-block">
            {m.eyebrow}
          </span>
          <p className="m-0 font-display text-[clamp(32px,5vw,64px)] leading-[1.1] tracking-[-0.04em] text-[var(--fg)] [text-wrap:balance]">
            {m.bodyPrefix}{" "}
            <span className="text-gradient animate-gradient">
              {m.bodyHighlight}
            </span>
            .
            <br />
            {m.bodySuffix}
          </p>
          <footer className="mt-[var(--space-6)] text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-muted)]">
            — FlorioIn
          </footer>
        </blockquote>
      </Container>
    </section>
  );
}
