import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { isLocale, locales } from "@/i18n/locales";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const calSans = localFont({
  src: "../../../public/fonts/CalSans-Regular.woff2",
  variable: "--font-cal-sans",
  display: "swap",
  weight: "400 700",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

type LocaleParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "en";
  const description = lang === "es" ? SITE.descriptionEs : SITE.description;
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${lang === "es" ? "El SO de tu empresa, con IA" : "The OS of your business, with AI"}`,
      template: `%s · ${SITE.name}`,
    },
    description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_MX" : "en_US",
      url: `${SITE.url}/${lang}`,
      siteName: SITE.name,
      title: `${SITE.name} — ${lang === "es" ? "El SO de tu empresa, con IA" : "The OS of your business, with AI"}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title: SITE.name,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        inter.variable,
        jetbrainsMono.variable,
        calSans.variable,
        "h-full",
      )}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full font-sans antialiased">
        <a href="#main" className="skip-link">
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
