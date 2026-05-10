import type { Metadata } from "next";

import { locales, type Locale } from "@/i18n/locales";
import { SITE } from "@/lib/constants";

type PageMetadataInput = {
  locale: Locale;
  /** Path under the locale, with leading slash. "" for home, "/pricing", etc. */
  path: string;
  title: string;
  description: string;
  /** Mark as noindex (utility / thank-you / internal pages). */
  noindex?: boolean;
  /** Optional OG image override; defaults to the dynamic /api/og route. */
  image?: string;
  /** Override the OG type, default "website" (use "article" on blog posts). */
  ogType?: "website" | "article";
  /** ISO date for OG article published time. */
  publishedTime?: string;
  /** ISO date for OG article modified time. */
  modifiedTime?: string;
};

function ogImageUrl(title: string, description: string) {
  const params = new URLSearchParams({
    title,
    description,
    eyebrow: SITE.name,
  });
  return `/api/og?${params.toString()}`;
}

/**
 * Single source of truth for marketing-page metadata. Every page passes its
 * (locale, path, title, description) and gets back a fully-wired Metadata
 * object with canonical, hreflang, OG, Twitter, and noindex when needed.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
  image,
  ogType = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const url = `${SITE.url}/${locale}${path}`;
  const og = image ?? ogImageUrl(title, description);

  const languages: Record<string, string> = {
    "x-default": `${SITE.url}/en${path}`,
  };
  for (const l of locales) {
    languages[l] = `${SITE.url}/${l}${path}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: ogType,
      url,
      siteName: SITE.name,
      title,
      description,
      locale: locale === "es" ? "es_MX" : "en_US",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
      ...(ogType === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title,
      description,
      images: [og],
    },
  };
}
