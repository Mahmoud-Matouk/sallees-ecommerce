'use client';

import * as React from 'react';
import { getAppDirection } from '@/lib/helper';
import type { Locale } from '@/core/i18n/languages';
import type { Direction } from '@/core/types/common.types';
import type enTranslations from '@/core/i18n/languages/en.json';

type Translations = typeof enTranslations;

type I18nContextType = {
  locale: Locale;
  dir: Direction;
  lang: Translations;
};

const I18nContext = React.createContext<I18nContextType | null>(null);

export function I18nProvider({
  children,
  locale,
  lang,
}: {
  children: React.ReactNode;
  locale: Locale;
  lang: Translations;
}) {
  const dir = getAppDirection(locale);
  return (
    <I18nContext.Provider value={{ locale, dir, lang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
