/**
 * App-wide configuration sourced from environment variables.
 */
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Sallees',
  locales: ['en', 'ar'] as const,
  defaultLocale: 'en' as const,
} as const;
