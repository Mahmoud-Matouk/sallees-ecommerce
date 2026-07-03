import { isSupportedLocale } from '@/lib/helper';
import { appConfig } from '@/core/constants/app';

const languages = {
  en: () => import('./languages/en.json').then((module) => module.default),
  ar: () => import('./languages/ar.json').then((module) => module.default),
};

export type Locale = keyof typeof languages;
export const locales = appConfig.locales;
export const defaultLocale = appConfig.defaultLocale;
export const hasLocale = isSupportedLocale;
export const getLanguage = async (locale: Locale) => languages[locale]();
