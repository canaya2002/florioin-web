import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { FeatureWall } from "@/components/sections/feature-wall";
import { FeaturesBento } from "@/components/sections/features-bento";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IndustriesTeaser } from "@/components/sections/industries-teaser";
import { LogosMarquee } from "@/components/sections/logos-marquee";
import { Manifesto } from "@/components/sections/manifesto";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { StackReplacement } from "@/components/sections/stack-replacement";
import { StatsSection } from "@/components/sections/stats-section";
import { UseCasesByTeam } from "@/components/sections/use-cases-by-team";
import { WorkIsBroken } from "@/components/sections/work-is-broken";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "",
    title: isEs
      ? "FlorioIn — El SO de tu empresa, con IA"
      : "FlorioIn — The OS of your business, with AI",
    description: isEs
      ? "Tareas, documentos, bandeja unificada y un Co-Piloto de IA en una sola plataforma. $3 USD por usuario al mes. Activación en menos de 24 horas."
      : "Tasks, docs, unified inbox, and an AI Co-Pilot in one platform. $3 USD per user per month. Live in under 24 hours.",
  });
}

export default async function HomePage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      {/* 1. Hook — premium hero with cinematic product canvas */}
      <Hero locale={lang} dict={dict} />

      {/* 2. Trust — logo marquee */}
      <LogosMarquee dict={dict} />

      {/* 3. Problem — work is broken */}
      <WorkIsBroken locale={lang} />

      {/* 4. Show — interactive product showcase (NEW flagship section) */}
      <ProductShowcase locale={lang} />

      {/* 5. Differentiator — replace the stack at $3 */}
      <StackReplacement locale={lang} />

      {/* 6. Feature surface — bento with bespoke peeks */}
      <FeaturesBento locale={lang} dict={dict} />

      {/* 7. How it works — three-step storytelling */}
      <HowItWorks dict={dict} locale={lang} />

      {/* 8. Use cases — every team */}
      <UseCasesByTeam locale={lang} />

      {/* 9. Capabilities — full feature wall */}
      <FeatureWall locale={lang} />

      {/* 10. Industries */}
      <IndustriesTeaser locale={lang} dict={dict} />

      {/* 11. Proof — stats */}
      <StatsSection locale={lang} dict={dict} />

      {/* 12. Pricing teaser */}
      <PricingTeaser locale={lang} dict={dict} />

      {/* 13. Manifesto pull quote */}
      <Manifesto dict={dict} />

      {/* 14. Final CTA */}
      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
