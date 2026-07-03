'use client';

import { Languages } from 'lucide-react';
import { setLocaleCookie } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/core/constants/app';
import { useI18n } from '@/core/i18n/I18nProvider';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useI18n();
  const { defaultLocale } = appConfig;

  const handleToggleLanguage = () => {
    const newLocale = locale === defaultLocale ? 'ar' : 'en';
    setLocaleCookie(newLocale);
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleLanguage}
      className="flex items-center gap-2 h-9 px-3 cursor-pointer select-none"
      title={locale === 'en' ? 'Switch to Arabic' : 'التغيير إلى الإنجليزية'}
    >
      <Languages className="shrink-0" />
      <span className="text-xs font-semibold uppercase tracking-wider">
        {locale === 'en' ? 'EN' : 'AR'}
      </span>
    </Button>
  );
}
