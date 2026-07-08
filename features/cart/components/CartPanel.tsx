'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { localizeCurrency } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/core/i18n/I18nProvider';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/features/cart/hooks/useCartStore';

export function CartPanel() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCartStore();
  const [mounted, setMounted] = React.useState(false);
  const { locale, translation } = useI18n();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted animate-pulse" />
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="size-6 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {translation.cart.empty}
        </p>
        <p className="text-xs text-muted-foreground">
          {translation.cart.startAdding}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold text-foreground">
          {translation.cart.title} ({items.length}{' '}
          {items.length === 1 ? translation.cart.item : translation.cart.items})
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
          onClick={clearCart}
        >
          {translation.cart.clearAll}
        </Button>
      </div>

      {/* Items */}
      <ul className="flex max-h-72 flex-col divide-y divide-border overflow-y-auto">
        {items.map((item) => (
          <li key={item.product._id} className="flex gap-3 px-4 py-3">
            {/* Image */}
            <Link
              href={`/${item.product._id}`}
              className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted hover:opacity-80 transition-opacity"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                className="object-cover"
                sizes="56px"
              />
            </Link>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Link href={`/${item.product._id}`} className="text-left">
                <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
                  {item.product.title}
                </p>
              </Link>
              <span className="text-xs font-semibold text-foreground">
                {localizeCurrency(item.price * item.count, locale)}
              </span>

              {/* Quantity controls */}
              <div className="mt-auto flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-6 rounded-md"
                  onClick={() =>
                    updateQuantity(item.product._id, item.count - 1)
                  }
                  disabled={item.count <= 1}
                >
                  <Minus className="size-3" />
                </Button>
                <span className="w-5 text-center text-xs tabular-nums">
                  {item.count}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-6 rounded-md"
                  onClick={() =>
                    updateQuantity(item.product._id, item.count + 1)
                  }
                >
                  <Plus className="size-3" />
                </Button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.product._id)}
              className="mt-0.5 shrink-0 self-start cursor-pointer text-destructive transition-colors hover:text-destructive/80"
            >
              <Trash2 className="size-3.5" />
              <span className="sr-only">{translation.cart.remove}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {translation.cart.subtotal}
          </span>
          <span className="text-sm font-bold text-foreground">
            {localizeCurrency(totalPrice(), locale)}
          </span>
        </div>
        <Button className="w-full" size="sm">
          {translation.cart.checkout}
        </Button>
      </div>
    </div>
  );
}
