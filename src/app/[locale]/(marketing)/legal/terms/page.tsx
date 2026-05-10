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
    path: "/legal/terms",
    title: isEs ? "Términos de Servicio" : "Terms of Service",
    description: isEs
      ? "Las reglas que rigen el uso de FlorioIn."
      : "The rules that govern the use of FlorioIn.",
  });
}

export default async function TermsPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEs = locale === "es";

  if (isEs) {
    return (
      <LegalDoc
        locale={locale}
        title="Términos de Servicio"
        effectiveDate="1 de mayo de 2026"
        introduction={
          <p>
            Al usar FlorioIn aceptas estos términos. Si los aceptas en nombre
            de una empresa, declaras tener autoridad para hacerlo. [PLACEHOLDER LEGAL]
            Lenguaje exacto a confirmar con asesor legal antes de producción.
          </p>
        }
        sections={[
          {
            heading: "El servicio",
            body: [
              "FlorioIn provee una plataforma SaaS B2B (Tasks, Docs, AI Co-Pilot, Smart Inbox) accesible vía web y aplicaciones nativas. El servicio se factura por usuario activo al mes.",
            ],
          },
          {
            heading: "Cuentas y elegibilidad",
            body: [
              "Para usar FlorioIn debes tener al menos 18 años y autoridad para vincular a tu empresa. Cada empresa designa un Owner que es responsable de billing y administración.",
            ],
          },
          {
            heading: "Pago y facturación",
            body: [
              "Cobramos $3 USD por usuario activo al mes, prorrateado. La factura se emite mensualmente y vence en 14 días. Si no pagas, podemos suspender el servicio con 7 días de aviso.",
              "Reembolsamos 100% si cancelas en los primeros 30 días.",
            ],
          },
          {
            heading: "Tu data",
            body: [
              "Tu data es tuya. Mantenemos los derechos mínimos necesarios para operar el servicio (almacenar, procesar, mostrar a tu equipo). Detalle en la Política de Privacidad.",
            ],
          },
          {
            heading: "Uso aceptable",
            body: [
              "No puedes usar FlorioIn para actividades ilegales, abuso, scraping no autorizado de terceros, o cualquier acción que comprometa la seguridad de la plataforma.",
            ],
          },
          {
            heading: "Disponibilidad",
            body: [
              "Trabajamos para 99.99% de uptime mensual. Mantenimiento programado se anuncia con 7 días de anticipación. Las fallas no programadas se publican en status.florioin.app.",
            ],
          },
          {
            heading: "Limitación de responsabilidad",
            body: [
              "[PLACEHOLDER LEGAL] Lenguaje específico de limitación de responsabilidad por jurisdicción a confirmar con abogado.",
            ],
          },
          {
            heading: "Terminación",
            body: [
              "Puedes cancelar cuando quieras. Cancelaremos tu cuenta solo por incumplimiento material o impago. Al cancelar, te damos 30 días para exportar tu data antes de borrarla.",
            ],
          },
          {
            heading: "Cambios a estos términos",
            body: [
              "Podemos actualizar estos términos. Cambios materiales se notifican con 30 días de anticipación.",
            ],
          },
          {
            heading: "Ley aplicable",
            body: [
              "Estos términos se rigen por las leyes de México. [PLACEHOLDER LEGAL] Foro y jurisdicción a confirmar.",
            ],
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      locale={locale}
      title="Terms of Service"
      effectiveDate="May 1, 2026"
      introduction={
        <p>
          By using FlorioIn you agree to these terms. If you agree on behalf of
          a company, you represent that you have authority to do so. [PLACEHOLDER LEGAL]
          Exact language to be confirmed by counsel before production.
        </p>
      }
      sections={[
        {
          heading: "The service",
          body: [
            "FlorioIn provides a B2B SaaS platform (Tasks, Docs, AI Co-Pilot, Smart Inbox) available via web and native apps. The service is billed per active user per month.",
          ],
        },
        {
          heading: "Accounts and eligibility",
          body: [
            "To use FlorioIn you must be at least 18 and have authority to bind your company. Each company designates an Owner responsible for billing and admin.",
          ],
        },
        {
          heading: "Payment and billing",
          body: [
            "We charge $3 USD per active user per month, prorated. Invoice is monthly, due in 14 days. If you don't pay, we may suspend service with 7 days' notice.",
            "We refund 100% if you cancel within the first 30 days.",
          ],
        },
        {
          heading: "Your data",
          body: [
            "Your data is yours. We keep the minimum rights needed to operate the service (store, process, display to your team). Details in the Privacy Policy.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You may not use FlorioIn for illegal activity, abuse, unauthorized scraping of third parties, or any action that compromises platform security.",
          ],
        },
        {
          heading: "Availability",
          body: [
            "We target 99.99% monthly uptime. Scheduled maintenance is announced 7 days ahead. Unscheduled disruptions are posted at status.florioin.app.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "[PLACEHOLDER LEGAL] Specific liability-limitation language by jurisdiction to be confirmed by counsel.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "You can cancel at any time. We cancel your account only for material breach or non-payment. On cancellation, we give you 30 days to export your data before deletion.",
          ],
        },
        {
          heading: "Changes to terms",
          body: [
            "We may update these terms. Material changes are notified 30 days in advance.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of Mexico. [PLACEHOLDER LEGAL] Forum and jurisdiction to be confirmed.",
          ],
        },
      ]}
    />
  );
}
