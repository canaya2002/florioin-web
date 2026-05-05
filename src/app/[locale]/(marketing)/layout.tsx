import { notFound } from "next/navigation";

import { ScrollProgress } from "@/components/animations/scroll-progress";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";

type MarketingLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <ScrollProgress />
      <Nav locale={locale} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
