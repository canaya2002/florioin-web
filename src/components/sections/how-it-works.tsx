import { Mic, Sparkles, CircleCheck } from "lucide-react";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import { Container } from "@/components/layout/container";
import type { Dictionary } from "@/i18n/get-dictionary";

type HowItWorksProps = {
  dict: Dictionary;
};

export function HowItWorks({ dict }: HowItWorksProps) {
  const steps = [
    {
      icon: Mic,
      title: dict.home.how.steps.speak.title,
      description: dict.home.how.steps.speak.description,
    },
    {
      icon: Sparkles,
      title: dict.home.how.steps.infer.title,
      description: dict.home.how.steps.infer.description,
    },
    {
      icon: CircleCheck,
      title: dict.home.how.steps.ship.title,
      description: dict.home.how.steps.ship.description,
    },
  ];

  return (
    <Container as="section" bleed>
      <div className="mx-auto mb-[var(--space-12)] max-w-[760px] text-center">
        <span className="eyebrow mb-[var(--space-3)] inline-block">
          {dict.home.how.eyebrow}
        </span>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.04em]">
          {dict.home.how.title}
        </h2>
      </div>

      <ol className="grid gap-[var(--space-5)] md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const number = `0${i + 1}`;
          return (
            <RevealOnScroll
              key={step.title}
              delay={i * 0.08}
              direction="up"
              distance={20}
              className="gcard flex h-full min-h-[240px] flex-col gap-[var(--space-4)] p-[var(--space-8)]"
            >
              <div className="flex items-center gap-[var(--space-3)]">
                <span className="font-mono text-[12px] tracking-[0.08em] text-[var(--fg-muted)]">
                  {number}
                </span>
                <span
                  aria-hidden
                  className="h-px flex-1"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--border-strong), transparent)",
                  }}
                />
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-[11px] border"
                  style={{
                    background: "rgba(168, 140, 255, 0.10)",
                    borderColor: "rgba(168, 140, 255, 0.25)",
                    color: "#6b4ad8",
                  }}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
              </div>
              <h3 className="font-display text-[24px] leading-[1.2] tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="text-[14.5px] leading-[1.55] text-[var(--fg-secondary)]">
                {step.description}
              </p>
            </RevealOnScroll>
          );
        })}
      </ol>
    </Container>
  );
}
