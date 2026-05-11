import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import { MediaSlot } from "@/components/media/media-slot";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/locales";

type HowItWorksProps = {
  dict: Dictionary;
  /** Kept for forward compatibility — not used after icons were removed. */
  locale?: Locale;
};

const RADII = [
  "64px 88px 60px 80px / 80px 60px 88px 64px",
  "88px 60px 80px 64px / 60px 80px 64px 88px",
  "72px 96px 60px 84px / 84px 60px 96px 72px",
];

const HALOS = [
  "radial-gradient(circle, rgba(255,141,218,0.30), transparent 65%)",
  "radial-gradient(circle, rgba(168,140,255,0.30), transparent 65%)",
  "radial-gradient(circle, rgba(56,228,255,0.30), transparent 65%)",
];

const STEP_ASSETS = ["how/step-1", "how/step-2", "how/step-3"];

export function HowItWorks({ dict }: HowItWorksProps) {
  const steps = [
    {
      title: dict.home.how.steps.speak.title,
      description: dict.home.how.steps.speak.description,
    },
    {
      title: dict.home.how.steps.infer.title,
      description: dict.home.how.steps.infer.description,
    },
    {
      title: dict.home.how.steps.ship.title,
      description: dict.home.how.steps.ship.description,
    },
  ];

  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <Container>
        <div className="mx-auto mb-[var(--space-12)] max-w-[860px] text-center">
          <span className="eyebrow mb-[var(--space-3)] inline-block">
            {dict.home.how.eyebrow}
          </span>
          <h2 className="font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em]">
            {dict.home.how.title}
          </h2>
        </div>

        <div className="relative">
          {/* Flow line behind the three pebbles */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[10%] right-[10%] top-[140px] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,141,218,0.45), rgba(168,140,255,0.55), rgba(56,228,255,0.45), transparent)",
            }}
          />
          <ol className="relative grid gap-[var(--space-8)] md:grid-cols-3">
            {steps.map((step, i) => {
              const number = `0${i + 1}`;
              return (
                <RevealOnScroll
                  key={step.title}
                  delay={i * 0.08}
                  direction="up"
                  distance={20}
                  duration={0.7}
                  className="relative flex h-full flex-col gap-[var(--space-5)] overflow-hidden bg-white p-[var(--space-8)] transition-transform duration-[var(--duration-base)] hover:-translate-y-1.5"
                  style={{ borderRadius: RADII[i] }}
                >
                  {/* Colored halo behind the pebble */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1/3 -z-10 opacity-60 blur-3xl"
                    style={{ background: HALOS[i] }}
                  />

                  {/* Step number — the focal point now that icons are gone */}
                  <div className="flex items-center gap-[var(--space-4)]">
                    <span
                      className="font-display text-[clamp(56px,5vw,80px)] leading-[0.85] tracking-[-0.05em] animate-breathe"
                      style={{
                        background: "var(--gradient-hero)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animationDelay: `${i * -1.4}s`,
                      }}
                    >
                      {number}
                    </span>
                    <span
                      aria-hidden
                      className="h-px flex-1"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(150,170,200,0.45), transparent)",
                      }}
                    />
                  </div>

                  <h3 className="font-display text-[clamp(22px,2.4vw,28px)] leading-[1.15] tracking-[-0.03em]">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.55] text-[var(--fg-secondary)]">
                    {step.description}
                  </p>
                  <div className="mt-auto">
                    <MediaSlot
                      name={STEP_ASSETS[i]}
                      aspect="3/2"
                      radius={
                        i === 0
                          ? "40px 56px 36px 48px / 48px 36px 56px 40px"
                          : i === 1
                            ? "56px 40px 48px 36px / 40px 48px 36px 56px"
                            : "48px 36px 56px 40px / 36px 56px 40px 48px"
                      }
                    />
                  </div>
                </RevealOnScroll>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
