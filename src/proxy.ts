import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Supported locales for the customer-facing site.
 * In production, these would be fetched from the DB at build time,
 * but for middleware/proxy (Edge Runtime), we use a static list.
 */
const SUPPORTED_LOCALES = ["vi", "en"];
const DEFAULT_LOCALE = "vi";
const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * i18n proxy for locale-prefixed URLs.
 * Next.js 16 file convention: src/proxy.ts
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: locale resolution requires multiple priority checks
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameLocale = SUPPORTED_LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameLocale) {
    // Locale already present — set X-Locale header and rewrite path to match folder structure without prefix
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", pathnameLocale);

    const url = request.nextUrl.clone();
    url.pathname =
      pathname === `/${pathnameLocale}` ? "/" : pathname.slice(pathnameLocale.length + 1);

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // No locale prefix — resolve from cookie → Accept-Language → default
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  let detectedLocale = DEFAULT_LOCALE;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    detectedLocale = cookieLocale;
  } else {
    const acceptLang = request.headers.get("accept-language");
    if (acceptLang) {
      const preferred = acceptLang
        .split(",")
        .map((lang) => (lang.split(";")[0] ?? "").trim().toLowerCase())
        .find(
          (lang) =>
            SUPPORTED_LOCALES.includes(lang) ||
            SUPPORTED_LOCALES.includes(lang.split("-")[0] ?? ""),
        );

      if (preferred) {
        const short = preferred.split("-")[0] ?? preferred;
        detectedLocale = SUPPORTED_LOCALES.includes(preferred) ? preferred : short;
      }
    }
  }

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml).*)"],
};
