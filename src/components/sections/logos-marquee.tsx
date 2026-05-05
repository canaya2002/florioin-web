import { Marquee } from "@/components/media/marquee";
import type { Dictionary } from "@/i18n/get-dictionary";

type LogosMarqueeProps = {
  dict: Dictionary;
};

// Placeholder customer names. Once Carlos drops real logos into
// public/images/customers/, list them in src/lib/customers.ts and replace
// these with <Image>s.
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
    <section className="container-wide py-16">
      <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-[var(--fg-muted)]">
        {dict.home.logos.title}
      </p>
      <Marquee pauseOnHover>
        {PLACEHOLDER_LOGOS.map((name) => (
          <div
            key={name}
            className="flex h-16 shrink-0 items-center justify-center px-8"
          >
            <span className="font-display text-[clamp(20px,1.6vw,28px)] tracking-tight text-[var(--fg-muted)] opacity-70">
              {name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
