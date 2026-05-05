import { Mic, Sparkles, CircleCheck } from "lucide-react";

import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
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
    <section className="container-default section">
      <div className="mb-12 flex flex-col items-start gap-3 lg:items-center lg:text-center">
        <span className="eyebrow">{dict.home.how.eyebrow}</span>
        <h2 className="max-w-3xl font-display text-[var(--fs-h2)] leading-tight tracking-tight">
          {dict.home.how.title}
        </h2>
      </div>

      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <RevealOnScroll
              key={step.title}
              delay={i * 0.15}
              direction="up"
              className="relative flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-8"
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--gradient-hero)" }}
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-[var(--fs-h3)] leading-none text-[var(--fg-subtle)]">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {step.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--fg-muted)]">
                {step.description}
              </p>
            </RevealOnScroll>
          );
        })}
      </ol>
    </section>
  );
}
