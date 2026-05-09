import { Container } from "@/components/layout/container";
import { Marquee } from "@/components/media/marquee";
import type { Dictionary } from "@/i18n/get-dictionary";

type LogosMarqueeProps = {
  dict: Dictionary;
};

const PLACEHOLDER_LOGOS = [
  "Atlas Legal",
  "Mercado Norte",
  "Pixel Studio",
  "Casa Verde",
  "Vitale Health",
  "Forge Capital",
  "Nido Inmobiliaria",
  "Brio Education",
  "Mapa Logística",
  "Lúdica Agency",
];

export function LogosMarquee({ dict }: LogosMarqueeProps) {
  return (
    <Container
      size="wide"
      as="section"
      className="py-[var(--space-16)] lg:py-[var(--space-20)]"
    >
      <p className="mb-[var(--space-8)] text-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--fg-muted)]">
        {dict.home.logos.title}
      </p>
      <Marquee pauseOnHover>
        {PLACEHOLDER_LOGOS.map((name) => (
          <div
            key={name}
            className="flex h-14 shrink-0 items-center justify-center px-[var(--space-8)]"
          >
            <span className="font-display text-[clamp(20px,1.6vw,28px)] tracking-tight text-[var(--fg-subtle)] opacity-80 transition-opacity duration-[var(--duration-fast)] hover:opacity-100">
              {name}
            </span>
          </div>
        ))}
      </Marquee>
    </Container>
  );
}
