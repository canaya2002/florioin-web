import { notFound } from "next/navigation";

import { LegalDoc } from "@/components/sections/legal-doc";
import { isLocale } from "@/i18n/locales";

type PageParams = { params: Promise<{ locale: string }> };

export const metadata = {
  title: "Privacy Policy",
  robots: { index: true, follow: true },
};

export default async function PrivacyPage({ params }: PageParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isEs = locale === "es";

  if (isEs) {
    return (
      <LegalDoc
        locale={locale}
        title="Política de Privacidad"
        effectiveDate="1 de mayo de 2026"
        introduction={
          <p>
            FlorioIn S. de R.L. de C.V. (&quot;FlorioIn&quot;, &quot;nosotros&quot;) opera el sitio
            florioin.com y la aplicación florioin.app. Esta política explica
            qué datos recolectamos, por qué, cómo los usamos, y los derechos
            que tienes sobre ellos.
          </p>
        }
        sections={[
          {
            heading: "Datos que recolectamos",
            body: [
              "Recolectamos solo los datos necesarios para operar el servicio:",
              {
                list: [
                  "Datos de cuenta (nombre, email empresarial, empresa, cargo)",
                  "Datos generados por tu uso (tareas, documentos, mensajes — propiedad tuya)",
                  "Datos técnicos (IP, navegador, sistema operativo) para seguridad y diagnóstico",
                  "[PLACEHOLDER LEGAL] Detalles adicionales por jurisdicción se completan en la versión final.",
                ],
              },
            ],
          },
          {
            heading: "Cómo usamos los datos",
            body: [
              "Usamos tus datos para: operar el servicio, prevenir abuso, mejorar el producto (sin entrenar modelos de IA públicos), y comunicarte cambios relevantes. No vendemos datos a terceros.",
            ],
          },
          {
            heading: "Datos e IA",
            body: [
              "Usamos foundation models a través de contratos enterprise (OpenAI, Anthropic, Google) que prohíben usar tus datos para entrenar modelos públicos. Tus prompts y respuestas viven en tu tenant. Puedes borrarlos on-demand.",
            ],
          },
          {
            heading: "Compartir con terceros",
            body: [
              "Compartimos datos solo con sub-procesadores necesarios (cloud hosting, email transaccional, analytics, foundation models). Lista completa de sub-procesadores disponible bajo solicitud.",
              "[PLACEHOLDER LEGAL] Lista actualizada de sub-procesadores se publica en la versión final.",
            ],
          },
          {
            heading: "Tus derechos",
            body: [
              "Dependiendo de tu jurisdicción (México, EE.UU., UE), tienes derecho a: acceder a tus datos, corregirlos, borrarlos, exportarlos, y oponerte a ciertos usos. Para ejercer estos derechos, escríbenos a privacy@florioin.com.",
              "[PLACEHOLDER LEGAL] Procedimientos exactos por jurisdicción los detallamos en la versión final.",
            ],
          },
          {
            heading: "Retención",
            body: [
              "Mantenemos tus datos mientras tu cuenta esté activa. Al cancelar, los datos del workspace se borran 30 días después salvo que pidas borrado inmediato. Backups se purgan dentro de 90 días.",
            ],
          },
          {
            heading: "Cookies",
            body: [
              "Usamos cookies estrictamente necesarias y, opcionalmente, cookies de analytics. Detalle completo en /legal/cookies.",
            ],
          },
          {
            heading: "Cambios a esta política",
            body: [
              "Notificamos cambios materiales por email a los Owners de cada workspace al menos 30 días antes de que apliquen.",
            ],
          },
          {
            heading: "Contacto",
            body: [
              "Para preguntas sobre privacidad: privacy@florioin.com. Para preguntas generales: carlos@florioin.com.",
            ],
          },
        ]}
      />
    );
  }

  return (
    <LegalDoc
      locale={locale}
      title="Privacy Policy"
      effectiveDate="May 1, 2026"
      introduction={
        <p>
          FlorioIn S. de R.L. de C.V. (&quot;FlorioIn&quot;, &quot;we&quot;) operates florioin.com and
          the florioin.app application. This policy explains what data we
          collect, why, how we use it, and the rights you have over it.
        </p>
      }
      sections={[
        {
          heading: "Data we collect",
          body: [
            "We only collect data needed to operate the service:",
            {
              list: [
                "Account data (name, work email, company, role)",
                "Data you generate (tasks, documents, messages — your property)",
                "Technical data (IP, browser, OS) for security and diagnostics",
                "[PLACEHOLDER LEGAL] Jurisdiction-specific details fill in at final.",
              ],
            },
          ],
        },
        {
          heading: "How we use data",
          body: [
            "We use your data to: operate the service, prevent abuse, improve the product (without training public AI models), and communicate relevant changes. We do not sell data to third parties.",
          ],
        },
        {
          heading: "Data and AI",
          body: [
            "We use foundation models via enterprise contracts (OpenAI, Anthropic, Google) that prohibit using your data to train public models. Your prompts and responses live in your tenant. You can delete them on demand.",
          ],
        },
        {
          heading: "Sharing with third parties",
          body: [
            "We share data only with necessary sub-processors (cloud hosting, transactional email, analytics, foundation models). Full sub-processor list available on request.",
            "[PLACEHOLDER LEGAL] Sub-processor list to be published in final version.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Depending on your jurisdiction (Mexico, US, EU), you have the right to: access, correct, delete, export your data, and object to certain uses. To exercise these rights, email privacy@florioin.com.",
            "[PLACEHOLDER LEGAL] Exact procedures by jurisdiction in final version.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "We retain your data while your account is active. On cancellation, workspace data is deleted 30 days later unless immediate deletion is requested. Backups purge within 90 days.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use strictly necessary cookies and, optionally, analytics cookies. Full detail at /legal/cookies.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We notify material changes by email to each workspace's Owner at least 30 days before they take effect.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Privacy questions: privacy@florioin.com. General: carlos@florioin.com.",
          ],
        },
      ]}
    />
  );
}
