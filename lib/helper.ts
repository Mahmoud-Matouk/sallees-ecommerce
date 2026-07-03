import type { NextRequest } from 'next/server';
import { appConfig } from '@/core/constants/app';

const { locales, defaultLocale } = appConfig;

/**
 * Checks if a language code is supported.
 */
export const isSupportedLocale = (
  locale: string
): locale is (typeof locales)[number] => {
  return (locales as readonly string[]).includes(locale);
};

/**
 * Prepends the active locale to a path if it's not already prefixed.
 */
export const getLocalizedPath = (url: string, locale: string): string => {
  if (
    url.startsWith('#') ||
    url.startsWith('http') ||
    url.startsWith('//') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:')
  ) {
    return url;
  }
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `/${locale}${cleanUrl === '/' ? '' : cleanUrl}`;
};

/**
 * Sets the locale cookie in the browser.
 */
export const setLocaleCookie = (locale: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  }
};

/**
 * Gets the locale from the browser's cookies (client-side only).
 */
export const getLocaleFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )locale=([^;]+)'));
  if (match && isSupportedLocale(match[2])) {
    return match[2];
  }
  return null;
};

/**
 * Extracts the locale preference from a NextRequest, checking cookies first,
 * then Accept-Language headers.
 */
export const getLocaleFromRequest = (request: NextRequest): string => {
  const cookieLocale = request.cookies.get('locale')?.value;

  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferences = acceptLanguage
      .split(',')
      .map((lang) => {
        const parts = lang.split(';');
        const code = parts[0].trim();
        const q = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
        return { code, q };
      })
      .sort((a, b) => b.q - a.q);

    for (const pref of preferences) {
      const code = pref.code.toLowerCase();
      if (code.startsWith('ar')) return 'ar';
      if (code.startsWith('en')) return 'en';
    }
  }

  return defaultLocale;
};

/**
 * localize a number as a currency string, localized to the active language.
 */
export const localizeCurrency = (
  amount: number,
  locale: string = 'en'
): string => {
  if (locale === 'ar') {
    return `${amount.toLocaleString('ar-EG')} ج.م`;
  }
  return `EGP ${amount.toLocaleString('en-US')}`;
};

/**
 * localize a date, localized to the active language.
 */
export const localizeDate = (
  dateInput: string | Date,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const targetLocale = locale === 'ar' ? 'ar-EG' : 'en-US';
  return date.toLocaleDateString(targetLocale, options);
};

/**
 * Gets the layout direction ('ltr' or 'rtl') for a given locale.
 */
export const getAppDirection = (locale: string): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};
