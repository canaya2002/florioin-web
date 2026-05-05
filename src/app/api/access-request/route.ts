import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { AccessRequestConfirmEmail } from "@/components/forms/emails/access-request-confirm";
import { AccessRequestInternalEmail } from "@/components/forms/emails/access-request-internal";
import { getServerEnv } from "@/lib/env";

const FREE_HOSTS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "live.com",
  "msn.com",
]);

const HEADCOUNTS = ["1-10", "11-50", "51-200", "201-1000", "1000+"] as const;
const SOURCES = [
  "search",
  "social",
  "referral",
  "blog",
  "podcast",
  "event",
  "other",
] as const;

const bodySchema = z.object({
  name: z.string().min(1).max(120),
  email: z
    .email()
    .refine((value) => {
      const host = value.split("@")[1]?.toLowerCase();
      return !host || !FREE_HOSTS.has(host);
    }, "Use a work email"),
  company: z.string().min(1).max(160),
  role: z.string().min(1).max(160),
  headcount: z.enum(HEADCOUNTS),
  industry: z.string().min(1).max(80),
  source: z.enum(SOURCES).optional(),
  message: z.string().max(4000).optional(),
  locale: z.enum(["en", "es"]).default("en"),
  agree: z.literal(true),
  // Honeypot — populated by bots, should always be empty for humans
  website: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const env = getServerEnv();

  // If Resend isn't configured (dev / preview without key), succeed loudly so
  // form-flow QA still works — but log so Carlos sees it.
  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_FROM || !env.CONTACT_EMAIL_TO) {
    console.warn(
      "[access-request] Resend env not set — submission accepted but email not sent.",
      { name: data.name, company: data.company, email: data.email },
    );
    return NextResponse.json({ ok: true, sent: false });
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    // Internal notification to Carlos
    await resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: `🎯 ${data.name} (${data.company}) — access request`,
      react: AccessRequestInternalEmail({
        name: data.name,
        email: data.email,
        company: data.company,
        role: data.role,
        headcount: data.headcount,
        industry: data.industry,
        source: data.source,
        message: data.message,
        locale: data.locale,
      }),
    });

    // Confirmation to the user
    await resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: data.email,
      replyTo: env.CONTACT_EMAIL_TO,
      subject:
        data.locale === "es"
          ? "Recibimos tu solicitud — FlorioIn"
          : "We received your request — FlorioIn",
      react: AccessRequestConfirmEmail({
        name: data.name,
        locale: data.locale,
      }),
    });
  } catch (err) {
    console.error("[access-request] Resend failure", err);
    return NextResponse.json(
      { error: "Email delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, sent: true });
}
