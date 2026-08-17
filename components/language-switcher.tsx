'use client';

import Link from 'next/link';
import * as React from 'react';
import { Languages } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { setLocaleCookie } from '@/lib/helper';
import { useI18n } from '@/core/i18n/I18nProvider';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { locale, translation: t } = useI18n();

  const nextLocale = locale === 'ar' ? 'en' : 'ar';
  const targetLabel = locale === 'ar' ? 'English' : 'العربية';

  // Compute destination URL with the new locale segment
  const targetPath = React.useMemo(() => {
    const segments = pathname.split('/');
    if (segments[1] === 'ar' || segments[1] === 'en') {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    return segments.join('/') || `/${nextLocale}`;
  }, [pathname, nextLocale]);

  const handleLanguageChange = () => {
    setLocaleCookie(nextLocale);
  };

  return (
    <Link
      href={targetPath}
      onClick={handleLanguageChange}
      className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer select-none ${
        className || ''
      }`}
      title={t.common.toggleLanguage}
    >
      <Languages className="size-5" />
      <span className="text-[11px] font-semibold mt-0.5">{targetLabel}</span>
    </Link>
  );
}
