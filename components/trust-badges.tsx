'use client';

import * as React from 'react';
import { useI18n } from '@/core/i18n/I18nProvider';
import { Headset, RotateCcw, CreditCard, ShieldCheck } from 'lucide-react';

export function TrustBadges() {
  const { translation: t } = useI18n();

  const items = [
    {
      icon: <Headset className="size-6 text-foreground/80" />,
      title: t.trust.support,
      desc: t.trust.supportDesc,
    },
    {
      icon: <RotateCcw className="size-6 text-foreground/80" />,
      title: t.trust.returns,
      desc: t.trust.returnsDesc,
    },
    {
      icon: <CreditCard className="size-6 text-foreground/80" />,
      title: t.trust.payment,
      desc: t.trust.paymentDesc,
    },
    {
      icon: <ShieldCheck className="size-6 text-foreground/80" />,
      title: t.trust.secure,
      desc: t.trust.secureDesc,
    },
  ];

  return (
    <section className="w-full border-t border-border/80 bg-background/50 py-10 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-muted/60 border border-border/70 shadow-2xs">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-foreground">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
