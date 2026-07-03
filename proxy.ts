import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { appConfig } from '@/core/constants/app';
import { getLocaleFromRequest } from '@/lib/helper';

const { locales } = appConfig;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Extract locale prefix if present
  const pathLocale = pathname.split('/')[1];

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    const cookieLocale = request.cookies.get('locale')?.value;
    if (cookieLocale !== pathLocale) {
      response.cookies.set('locale', pathLocale, {
        path: '/',
        maxAge: 31536000,
      });
    }
    return response;
  }

  // Detect preferred locale (cookie first, then Accept-Language headers)
  const locale = getLocaleFromRequest(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set('locale', locale, { path: '/', maxAge: 31536000 });
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, static files (images, assets, favicon, etc.)
    '/((?!api|_next/static|_next/image|images|favicon.ico|icon.png|logo.png|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
