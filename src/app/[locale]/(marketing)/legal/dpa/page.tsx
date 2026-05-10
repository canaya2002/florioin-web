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
    path: "/legal/dpa",
    title: isEs ? "Acuerdo de Procesamiento de Datos" : "Data Processing Addendum",
    description: isEs
      ? "Cómo FlorioIn procesa datos en cumplimiento con regulaciones."
      : "How FlorioIn processes data in compliance with regulations.",
  });
}

export default async function DpaPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEs = locale === "es";

  if (isEs) {
    return (
      <LegalDoc
        locale={locale}
        title="Adenda de Procesamiento de Datos (DPA)"
        effectiveDate="1 de mayo de 2026"
        introduction={
          <p>
            Esta DPA aplica si tu uso de FlorioIn implica que actuamos como
            procesador de datos personales sujetos a GDPR, LGPD, LFPDPPP, o
            similares. [PLACEHOLDER LEGAL] Versión final requiere revisión por
            abogado especializado en privacidad.
          </p>
        }
        sections={[
          {
            heading: "Roles",
            body: [
              "Tú eres el Controller (decides el propósito y los medios del procesamiento). FlorioIn es el Processor (procesa según tus instrucciones documentadas, vía configuración del producto y este DPA).",
            ],
          },
          {
            heading: "Naturaleza y propósito",
            body: [
              "Procesamos datos personales según se requiera para entregar el servicio descrito en los Términos: hosting de tareas, documentos, mensajes; ejecución de funciones de IA; analytics agregados.",
            ],
          },
          {
            heading: "Sub-procesadores",
            body: [
              "Mantenemos una lista pública y actualizada de sub-procesadores. Te notificamos con 30 días de anticipación antes de añadir un sub-procesador. Tienes derecho a objetar.",
              "[PLACEHOLDER LEGAL] Lista en versión final.",
            ],
          },
          {
            heading: "Transferencias internacionales",
            body: [
              "Las transferencias fuera de tu jurisdicción se hacen bajo Standard Contractual Clauses (UE), Mexico-US safe-transfer mechanism, o equivalentes según aplique.",
            ],
          },
          {
            heading: "Seguridad",
            body: [
              "Aplicamos medidas técnicas y organizativas descritas en /security: encriptación, RLS multi-tenant, audit logs, MFA obligatorio para staff, principio de mínimo privilegio.",
            ],
          },
          {
            heading: "Notificación de brechas",
            body: [
              "Te notificamos brechas que afecten datos personales dentro de 72 horas de detección, con la información requerida por la regulación aplicable.",
            ],
          },
          {
            heading: "Derechos de los titulares",
            body: [
              "Te apoyamos a responder solicitudes de titulares (acceso, corrección, borrado, portabilidad). Las herramientas de auto-servicio están disponibles en el dashboard.",
            ],
          },
          {
            heading: "Auditoría",
            body: [
              "Permitimos auditorías razonables por ti o un auditor independiente con NDA, con 30 días de anticipación, no más de una vez por año salvo brecha o requerimiento regulatorio.",
            ],
          },
          {
            heading: "Borrado al término",
            body: [
              "Al terminar el contrato, borramos los datos personales dentro de 30 días salvo retención legal requerida (logs de auditoría, facturación).",
            ],
          },
          {
            heading: "Contacto DPO",
            body: ["dpo@florioin.com"],
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      locale={locale}
      title="Data Processing Addendum (DPA)"
      effectiveDate="May 1, 2026"
      introduction={
        <p>
          This DPA applies if your use of FlorioIn means we process personal
          data subject to GDPR, LGPD, LFPDPPP, or similar regulations. [PLACEHOLDER LEGAL]
          Final version requires review by privacy counsel.
        </p>
      }
      sections={[
        {
          heading: "Roles",
          body: [
            "You are the Controller (you decide the purpose and means of processing). FlorioIn is the Processor (we process per your documented instructions, expressed through the product config and this DPA).",
          ],
        },
        {
          heading: "Nature and purpose",
          body: [
            "We process personal data as needed to deliver the service described in the Terms: hosting tasks, documents, messages; executing AI functions; aggregated analytics.",
          ],
        },
        {
          heading: "Sub-processors",
          body: [
            "We maintain a public, current sub-processor list. We notify you 30 days before adding a sub-processor. You may object.",
            "[PLACEHOLDER LEGAL] List in final version.",
          ],
        },
        {
          heading: "International transfers",
          body: [
            "Cross-jurisdiction transfers happen under Standard Contractual Clauses (EU), the Mexico-US safe-transfer mechanism, or equivalents as applicable.",
          ],
        },
        {
          heading: "Security",
          body: [
            "We apply technical and organizational measures described at /security: encryption, multi-tenant RLS, audit logs, mandatory MFA for staff, least-privilege.",
          ],
        },
        {
          heading: "Breach notification",
          body: [
            "We notify breaches affecting personal data within 72 hours of detection, with the information required by applicable regulation.",
          ],
        },
        {
          heading: "Data subject rights",
          body: [
            "We support you in responding to data subject requests (access, correction, deletion, portability). Self-service tools available in the dashboard.",
          ],
        },
        {
          heading: "Audit",
          body: [
            "We permit reasonable audits by you or an independent auditor under NDA, with 30 days' notice, no more than once per year except for breach or regulatory requirement.",
          ],
        },
        {
          heading: "Deletion on termination",
          body: [
            "On contract end, we delete personal data within 30 days except where legal retention is required (audit logs, billing).",
          ],
        },
        {
          heading: "DPO contact",
          body: ["dpo@florioin.com"],
        },
      ]}
    />
  );
}
