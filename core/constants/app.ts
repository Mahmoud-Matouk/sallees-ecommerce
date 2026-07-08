/**
 * App-wide configuration sourced from environment variables.
 */
export const LOCALES = {
  en: 'en',
  ar: 'ar',
} as const;

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Sallees',
  locales: [LOCALES.en, LOCALES.ar] as const,
  defaultLocale: LOCALES.en,

  direction: {
    en: 'ltr',
    ar: 'rtl',
  } as const,

  regionalLocales: {
    en: 'en-US',
    ar: 'ar-EG',
  } as const,

  currencies: {
    en: {
      symbol: 'EGP',
      position: 'before',
      decimalSeparator: '.',
      groupSeparator: ',',
      zero: '0',
    },
    ar: {
      symbol: 'ج.م',
      position: 'after',
      decimalSeparator: '.',
      groupSeparator: ',',
      zero: '0',
    },
  } as const,
} as const;

export type RegionalLocale = keyof typeof appConfig.regionalLocales;
export type Locale = (typeof appConfig.locales)[number];
export type AppDirection =
  (typeof appConfig.direction)[keyof typeof appConfig.direction];
