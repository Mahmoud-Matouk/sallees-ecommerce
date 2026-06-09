/**
 * App-wide configuration sourced from environment variables.
 */
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Sallees',
} as const;
