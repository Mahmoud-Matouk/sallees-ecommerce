import { isSupportedLocale } from '@/lib/helper';
import { appConfig, Locale } from '@/core/constants/app';

const languages = {
  en: () => import('./languages/en.json').then((module) => module.default),
  ar: () => import('./languages/ar.json').then((module) => module.default),
};

export type { Locale };
export const locales = appConfig.locales;
export const hasLocale = isSupportedLocale;
export const getTranslation = async (locale: Locale) => languages[locale]();
