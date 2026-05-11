import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string | ReactNode;
  description: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  visual?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared hero used by every interior page. Same Light Glass system as
 * the landing — pure white bg, floating glass orbs, no shadows, no
 * bordered containers. The H1 is unanimated so it stays the LCP
 * candidate on every page.
 */
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
        "relative isolate overflow-hidden bg-white",
        "pb-[var(--space-16)] pt-[140px] lg:pb-[var(--space-20)] lg:pt-[180px]",
        className,
      )}
    >
      <FloatingOrbs parallax={0.35} />
      <Container
        className={cn(
          "relative z-10 flex flex-col gap-[var(--space-6)]",
          isCenter && "items-center text-center",
        )}
      >
        {eyebrow && (
          <FadeIn delay={0.1} duration={0.4}>
            <span className="eyebrow-pill inline-flex">
              <span className="dot" aria-hidden />
              <span>{eyebrow}</span>
            </span>
          </FadeIn>
        )}
        <h1
          className={cn(
            "font-display text-[clamp(40px,6vw,84px)] leading-[1.02] tracking-[-0.05em] text-[var(--fg)] [text-wrap:balance]",
            isCenter ? "max-w-[980px]" : "max-w-4xl",
          )}
        >
          {title}
        </h1>
        <SlideUp
          delay={0.3}
          duration={0.5}
          distance={12}
          className={isCenter ? "max-w-2xl" : "max-w-3xl"}
        >
          <div className="text-[var(--fs-body-lg)] leading-relaxed text-[var(--fg-secondary)]">
            {description}
          </div>
        </SlideUp>
        {(primaryCta || secondaryCta) && (
          <SlideUp
            delay={0.45}
            duration={0.4}
            distance={8}
            className={cn(
              "flex w-full flex-wrap items-center gap-[var(--space-3)] sm:w-auto",
              isCenter && "justify-center",
            )}
          >
            {primaryCta && (
              <Link href={primaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {secondaryCta.label}
                </Button>
              </Link>
            )}
          </SlideUp>
        )}
        {visual && (
          <SlideUp
            delay={0.6}
            duration={0.7}
            distance={20}
            className="mt-[var(--space-6)] w-full"
          >
            {visual}
          </SlideUp>
        )}
      </Container>
    </section>
  );
}
