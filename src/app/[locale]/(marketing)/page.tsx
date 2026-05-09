import { notFound } from "next/navigation";

import { CtaSection } from "@/components/sections/cta-section";
import { FeaturesBento } from "@/components/sections/features-bento";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IndustriesTeaser } from "@/components/sections/industries-teaser";
import { LogosMarquee } from "@/components/sections/logos-marquee";
import { Manifesto } from "@/components/sections/manifesto";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { StatsSection } from "@/components/sections/stats-section";
import { Testimonials } from "@/components/sections/testimonials";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero locale={lang} dict={dict} />
      <FeaturesBento locale={lang} dict={dict} />
      <HowItWorks dict={dict} />
      <StatsSection locale={lang} dict={dict} />
      <LogosMarquee dict={dict} />
      <Testimonials locale={lang} dict={dict} />
      <IndustriesTeaser locale={lang} dict={dict} />
      <PricingTeaser locale={lang} dict={dict} />
      <Manifesto dict={dict} />
      <CtaSection locale={lang} dict={dict} />
    </>
  );
}
