'use client';

import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/core/i18n/I18nProvider';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CallToActionProps {
  href?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  showArrow?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'xs';
  variant?:
    'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  onClick?: () => void;
}

export function CallToAction({
  href,
  text,
  children,
  className,
  buttonClassName,
  showArrow = true,
  size = 'lg',
  variant = 'default',
  onClick,
}: CallToActionProps) {
  const { dir } = useI18n();

  const content = (
    <div className="flex items-center gap-2">
      {text ? <span>{text}</span> : children}
      {showArrow &&
        (dir === 'rtl' ? (
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        ) : (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        ))}
    </div>
  );

  const buttonElement = (
    <Button
      size={size}
      variant={variant}
      onClick={onClick}
      className={cn(
        'group h-12 rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 transition-all hover:gap-3 cursor-pointer',
        buttonClassName
      )}
      asChild={!!href}
    >
      {href ? <Link href={href}>{content}</Link> : content}
    </Button>
  );

  return <div className={cn('pt-2', className)}>{buttonElement}</div>;
}
