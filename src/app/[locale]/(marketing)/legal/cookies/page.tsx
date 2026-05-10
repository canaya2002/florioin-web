import { notFound } from "next/navigation";

import { LegalDoc } from "@/components/sections/legal-doc";
import { isLocale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isEs = locale === "es";
  return pageMetadata({
    locale,
    path: "/legal/cookies",
    title: isEs ? "Política de Cookies" : "Cookie Policy",
    description: isEs
      ? "Cookies que usamos y cómo gestionarlas."
      : "Cookies we use and how to manage them.",
  });
}

export default async function CookiesPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEs = locale === "es";

  if (isEs) {
    return (
      <LegalDoc
        locale={locale}
        title="Política de Cookies"
        effectiveDate="1 de mayo de 2026"
        introduction={
          <p>
            FlorioIn usa cookies y tecnologías similares para operar el sitio,
            recordar tus preferencias y entender cómo se usa el producto. Esta
            política explica qué cookies usamos, por qué, y cómo controlarlas.
            [PLACEHOLDER LEGAL] Versión final pendiente de auditoría de cookies.
          </p>
        }
        sections={[
          {
            heading: "Cookies estrictamente necesarias",
            body: [
              "Estas cookies son indispensables para que el sitio funcione. Sin ellas no podrías navegar ni usar funciones básicas (como cambiar de idioma o tema).",
              {
                list: [
                  "NEXT_LOCALE — guarda tu preferencia de idioma (1 año)",
                  "theme — guarda tu preferencia de modo claro/oscuro (sin expiración)",
                ],
              },
            ],
          },
          {
            heading: "Cookies de analytics (opcionales)",
            body: [
              "Cuando habilitemos analytics, usaremos PostHog o herramientas similares para entender uso agregado del sitio. No te identifican personalmente.",
              "[PLACEHOLDER LEGAL] Detalle de cada cookie analytics se publica al activar la herramienta.",
            ],
          },
          {
            heading: "Cookies de terceros",
            body: [
              "Solo cargamos cookies de terceros bajo tu consentimiento explícito (banner). Hoy: ninguna por default.",
            ],
          },
          {
            heading: "Cómo controlarlas",
            body: [
              "Puedes borrar o bloquear cookies desde tu navegador. Bloquear las estrictamente necesarias puede romper funciones del sitio.",
            ],
          },
          {
            heading: "Contacto",
            body: ["privacy@florioin.com"],
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      locale={locale}
      title="Cookie Policy"
      effectiveDate="May 1, 2026"
      introduction={
        <p>
          FlorioIn uses cookies and similar technologies to operate the site,
          remember your preferences, and understand product usage. This policy
          explains what cookies we use, why, and how to control them. [PLACEHOLDER LEGAL]
          Final version pending a cookie audit.
        </p>
      }
      sections={[
        {
          heading: "Strictly necessary cookies",
          body: [
            "These cookies are required for the site to work. Without them you can't navigate or use basic features (like switching language or theme).",
            {
              list: [
                "NEXT_LOCALE — stores your language preference (1 year)",
                "theme — stores your light/dark mode preference (no expiration)",
              ],
            },
          ],
        },
        {
          heading: "Analytics cookies (optional)",
          body: [
            "When we enable analytics we'll use PostHog or similar to understand aggregate site usage. They don't identify you personally.",
            "[PLACEHOLDER LEGAL] Per-cookie detail to be published when analytics is enabled.",
          ],
        },
        {
          heading: "Third-party cookies",
          body: [
            "We only load third-party cookies under explicit consent (banner). Today: none by default.",
          ],
        },
        {
          heading: "How to control them",
          body: [
            "You can clear or block cookies from your browser. Blocking strictly necessary cookies may break site features.",
          ],
        },
        {
          heading: "Contact",
          body: ["privacy@florioin.com"],
        },
      ]}
    />
  );
}
