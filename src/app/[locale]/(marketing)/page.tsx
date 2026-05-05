import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/get-dictionary";
import { notFound } from "next/navigation";

type PageParams = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <main id="main" className="container-default section flex flex-col gap-10">
      <div className="eyebrow">FlorioIn · setup phase 0 ready</div>
      <h1 className="font-display text-[var(--fs-display)]">
        <span className="text-gradient">{dict.common.tagline}</span>
      </h1>
      <p className="max-w-2xl text-[var(--fs-body-lg)] text-[var(--fg-muted)]">
        {dict.home.hero.sub}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <span
          className="inline-flex h-12 items-center justify-center rounded-full px-6 font-medium text-[var(--primary-fg)] shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-hero)" }}
        >
          {dict.common.ctaPrimary}
        </span>
        <span className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border-strong)] px-6 font-medium">
          {dict.common.ctaSecondary}
        </span>
      </div>
      <div className="text-sm text-[var(--fg-subtle)]">
        Locale: <code>{locale}</code> · Theme tokens active · Cal Sans loaded
      </div>
    </main>
  );
}
