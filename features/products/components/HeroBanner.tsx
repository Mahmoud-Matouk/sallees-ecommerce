'use client';

import * as React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { getLocalizedPath } from '@/lib/helper';
import { useI18n } from '@/core/i18n/I18nProvider';
import { CallToAction } from '@/components/call-to-action';

export function HeroBanner() {
  const { locale, translation: t } = useI18n();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-stone-50 to-stone-100/70 dark:from-card dark:to-background border border-border/60 shadow-xs">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Visual Column */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex justify-center items-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/hero-banner.jpg"
                alt="Modern Living Room and Armchair"
                fill
                priority
                className="object-cover object-center rounded-2xl shadow-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-start gap-5">
            {/* Discount Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-500/20 shadow-xs">
              <Sparkles className="size-3.5" />
              <span>{t.hero.discountBadge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              {t.hero.headline}
            </h1>

            {/* Subtitle */}
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed max-w-xl">
              {t.hero.subheadline}
            </p>

            {/* CTA Button */}
            <CallToAction
              href={getLocalizedPath('/#products', locale)}
              text={t.hero.cta}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
