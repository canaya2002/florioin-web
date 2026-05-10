import { Mail } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "/contact",
    title: isEs ? "Contacto" : "Contact",
    description: isEs
      ? "Escríbenos. Respondemos en menos de un día hábil."
      : "Reach out. We respond within one business day.",
  });
}

export default async function ContactPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const isEs = lang === "es";

  return (
    <>
      <PageHero
        eyebrow={dict.nav.contact}
        title={isEs ? "Hablemos." : "Let's talk."}
        description={
          isEs
            ? "Para preguntas generales, prensa, partnerships, o si simplemente quieres saludar."
            : "For general questions, press, partnerships, or just to say hi."
        }
      />

      <section className="container-default pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[var(--radius-2xl)] border border-[var(--border)] bg-[var(--bg)] p-8 md:p-10">
            <ContactForm locale={lang} dict={dict} />
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {isEs ? "Otras formas" : "Other ways"}
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="flex items-center gap-3 text-[15px] hover:text-[var(--primary)]"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {SITE.contactEmail}
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  rel="noreferrer"
                  target="_blank"
                  className="text-[15px] hover:text-[var(--primary)]"
                >
                  LinkedIn →
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  rel="noreferrer"
                  target="_blank"
                  className="text-[15px] hover:text-[var(--primary)]"
                >
                  Twitter / X →
                </a>
              </div>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] p-6">
              <h3 className="font-display text-[var(--fs-h4)] tracking-tight">
                {isEs ? "¿Quieres acceso?" : "Want access?"}
              </h3>
              <p className="mt-2 text-[15px] text-[var(--fg-muted)]">
                {isEs ? (
                  <>
                    Para empezar como cliente, usa el form de{" "}
                    <a
                      href={`/${lang}/request-access`}
                      className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
                    >
                      solicitar acceso
                    </a>
                    .
                  </>
                ) : (
                  <>
                    To start as a customer, use the{" "}
                    <a
                      href={`/${lang}/request-access`}
                      className="font-medium text-[var(--primary)] underline-offset-4 hover:underline"
                    >
                      request access
                    </a>{" "}
                    form.
                  </>
                )}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
