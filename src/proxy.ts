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

export function proxy(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // Skip Next internals, static assets, and API routes — handled by their own logic
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
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
    // Skip Next internals, static files, and API routes
    "/((?!_next|api|.*\\..*).*)",
  ],
};
