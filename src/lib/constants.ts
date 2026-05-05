/**
 * App-wide constants. The marketing site (this project) is separate from the
 * actual product, which lives at florioin.app.
 */
export const SITE = {
  name: "FlorioIn",
  domain: "florioin.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://florioin.com",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://florioin.app",
  statusUrl: "https://status.florioin.app",
  contactEmail: "carlos@florioin.com",
  twitter: "@florioin",
  description:
    "The operating system of your business, with AI. Tasks, docs, inbox, and an AI Co-Pilot in one platform.",
  descriptionEs:
    "El sistema operativo de tu empresa, con IA. Tareas, documentos, bandeja y un Co-Piloto de IA en una sola plataforma.",
} as const;

export const APP_LOGIN_URL = `${SITE.appUrl}/login`;
export const APP_SIGNUP_URL = `${SITE.appUrl}/signup`;

export const PRICING = {
  perSeat: 3,
  currency: "USD",
  refundDays: 30,
  bulkSeats: 50,
  annualDiscount: 0.2,
} as const;

export const INDUSTRIES = [
  "legal",
  "marketing",
  "consulting",
  "real-estate",
  "healthcare",
  "finance",
  "construction",
  "education",
  "nonprofit",
  "manufacturing",
  "retail",
  "tech",
  "agency",
  "media",
  "logistics",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const PRODUCT_PILLARS = [
  "ai-copilot",
  "tasks",
  "docs",
  "inbox",
  "integrations",
] as const;

export type ProductPillar = (typeof PRODUCT_PILLARS)[number];

export const PLATFORMS = [
  "web",
  "ios",
  "ipad",
  "android",
  "macos",
  "windows",
  "linux",
] as const;

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/florioin",
  linkedin: "https://www.linkedin.com/company/florioin",
  github: "https://github.com/florioin",
  youtube: "https://youtube.com/@florioin",
} as const;
