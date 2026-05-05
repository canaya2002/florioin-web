import { z } from "zod";

/**
 * Server-only env validation. Reading any of these from a Client Component
 * will fail at build/runtime — that's intentional.
 */
const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL_FROM: z.email().optional(),
  CONTACT_EMAIL_TO: z.email().optional(),
});

/**
 * Public env vars — accessible from both server and client. They MUST be
 * prefixed with `NEXT_PUBLIC_` so Next.js inlines them at build time.
 */
const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_URL: z.url().default("https://florioin.app"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z
    .url()
    .default("https://us.i.posthog.com"),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

const publicEnvRaw = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
};

export const publicEnv = publicSchema.parse(publicEnvRaw);

/**
 * `serverEnv` lazily validates so importing this module from a client bundle
 * is safe (the `serverSchema.parse` call only runs when accessed on the server).
 */
let _serverEnv: z.infer<typeof serverSchema> | null = null;

export function getServerEnv() {
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv() must not be called from the browser");
  }
  if (_serverEnv === null) {
    _serverEnv = serverSchema.parse({
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
      CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
    });
  }
  return _serverEnv;
}
