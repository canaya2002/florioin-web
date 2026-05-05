import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { TextReveal } from "@/components/animations/text-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  visual?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  visual,
  align = "left",
  className,
}: PageHeroProps) {
  const isCenter = align === "center";
  return (
    <section
      className={cn(
        "relative overflow-hidden pb-12 pt-20 md:pt-28",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div
        className={cn(
          "container-default relative flex flex-col gap-8",
          isCenter && "items-center text-center",
        )}
      >
        {eyebrow && (
          <FadeIn>
            <span className="eyebrow">{eyebrow}</span>
          </FadeIn>
        )}
        <h1 className="max-w-4xl font-display text-[clamp(48px,7vw,96px)] leading-[1.05] tracking-[-0.04em]">
          <TextReveal>{title}</TextReveal>
        </h1>
        <SlideUp delay={0.3} className={isCenter ? "max-w-2xl" : "max-w-3xl"}>
          <div className="text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
            {description}
          </div>
        </SlideUp>
        {(primaryCta || secondaryCta) && (
          <SlideUp
            delay={0.5}
            className={cn("flex flex-wrap items-center gap-3")}
          >
            {primaryCta && (
              <Link href={primaryCta.href}>
                <Button size="lg" variant="primary">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button size="lg" variant="outline">
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </SlideUp>
        )}
        {visual && (
          <SlideUp delay={0.7} className="mt-6 w-full">
            {visual}
          </SlideUp>
        )}
      </div>
    </section>
  );
}
