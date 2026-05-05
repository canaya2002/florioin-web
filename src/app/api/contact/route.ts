import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { getServerEnv } from "@/lib/env";

const bodySchema = z.object({
  name: z.string().min(1).max(160),
  email: z.email(),
  message: z.string().min(1).max(5000),
  locale: z.enum(["en", "es"]).default("en"),
});

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const env = getServerEnv();

  if (!env.RESEND_API_KEY || !env.CONTACT_EMAIL_FROM || !env.CONTACT_EMAIL_TO) {
    console.warn(
      "[contact] Resend env not set — accepting submission without email.",
      data,
    );
    return NextResponse.json({ ok: true, sent: false });
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: `📨 Contact: ${data.name}`,
      text: `From: ${data.name} <${data.email}>\nLocale: ${data.locale}\n\n${data.message}`,
    });
  } catch (err) {
    console.error("[contact] Resend failure", err);
    return NextResponse.json(
      { error: "Email delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, sent: true });
}
