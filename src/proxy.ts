import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";

const LOCALE_COOKIE = "NEXT_LOCALE";

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const languages = new Negotiator({ headers }).languages();

  try {
    return match(
      languages,
      locales as readonly string[],
      defaultLocale,
    ) as Locale;
  } catch {
    return defaultLocale;
  }
}

// Next.js root file-convention routes that must NOT be redirected by the proxy.
// Adding `/en/icon` etc. is wrong — these live at the app root, not under [locale].
const ROOT_SPECIAL_ROUTES = new Set([
  "/icon",
  "/apple-icon",
  "/opengraph-image",
  "/twitter-image",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/rss.xml",
]);

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Skip Next internals, static assets, root special routes, and API routes —
  // each is served by its own handler at the app root, not under [locale].
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    ROOT_SPECIAL_ROUTES.has(pathname) ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (pathnameHasLocale) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, anything with a file extension, and the
    // root file-convention routes (icon, apple-icon, opengraph-image, etc.)
    // that Next serves directly from app/.
    "/((?!_next|api|icon|apple-icon|opengraph-image|twitter-image|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|rss\\.xml|.*\\..*).*)",
  ],
};
