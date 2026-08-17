'use client';

import Link from 'next/link';
import * as React from 'react';
import { useI18n } from '@/core/i18n/I18nProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { ProductImageGallery } from './ProductImageGallery';
import type { ProductSummary } from '../types/product.types';
import { localizeCurrency, getLocalizedPath } from '@/lib/helper';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import { useWishlistStore } from '@/features/wishlist/hooks/useWishlistStore';

interface ProductCardProps {
  product: ProductSummary;
  discountPercentage?: number;
  priority?: boolean;
}

export const ProductCard = React.memo(function ProductCard({
  product,
  discountPercentage: discountPercentageProp,
  priority = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const addItem = useCartStore((s) => s.addItem);

  // Granular subscription: only re-render this card if its own favorite status changes
  const isFavorite = useWishlistStore(
    React.useCallback(
      (s) => s.items.some((i) => i._id === product._id),
      [product._id]
    )
  );
  const toggleItem = useWishlistStore((s) => s.toggleItem);

  const { locale, translation: t } = useI18n();

  // Combine imageCover with images list for the gallery
  const images = React.useMemo(() => {
    const list = [product.imageCover, ...(product.images || [])].filter(
      Boolean
    );
    return Array.from(new Set(list));
  }, [product.imageCover, product.images]);

  // Calculate real discount percentage and prices
  const hasDiscount = Boolean(
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
  );

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : (discountPercentageProp ?? null);

  const currentPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price;

  const originalPrice = hasDiscount ? product.price : null;

  const productUrl = getLocalizedPath(`/${product._id}`, locale);

  const handleToggleFavorite = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleItem(product);
    },
    [toggleItem, product]
  );

  const handleAddToCart = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addItem(product);
    },
    [addItem, product]
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xs hover:border-primary/40 transition-colors"
    >
      {/* Top Image Container with Overlays */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted/20">
        {/* Product Image Gallery with hover rotation */}
        <Link href={productUrl} className="relative size-full block">
          {images.length > 0 ? (
            <ProductImageGallery
              images={images}
              title={product.title}
              variant="card"
              isHovered={isHovered}
              priority={priority}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-xs text-muted-foreground">
              No Image
            </div>
          )}
        </Link>

        {/* Discount Badge (Top-Left) */}
        {discountPercentage && (
          <div className="absolute top-2.5 start-2.5 z-20 pointer-events-none">
            <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Wishlist Button (Top-Right) */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="absolute top-2.5 end-2.5 z-20 flex size-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-xs backdrop-blur-xs hover:text-red-500 hover:bg-background transition-colors cursor-pointer"
          title={t.navbar.wishlist}
        >
          <Heart
            className={`size-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>

        {/* Add to Cart Button (Bottom-Right corner of image) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-2.5 end-2.5 z-20 flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors cursor-pointer"
          title={t.products.addToCart}
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>

      {/* Bottom Info Section with dedicated padding */}
      <div className="p-3.5 flex flex-1 flex-col justify-between gap-2">
        <div>
          {/* Brand or Category */}
          {(product.brand?.name || product.category?.name) && (
            <span className="text-[11px] font-medium text-muted-foreground block truncate">
              {product.brand?.name || product.category?.name}
            </span>
          )}

          {/* Title */}
          <Link
            href={productUrl}
            className="line-clamp-1 text-sm font-bold text-foreground transition-colors hover:text-primary mt-0.5"
            title={product.title}
          >
            {product.title}
          </Link>
        </div>

        {/* Rating & Price Row */}
        <div className="flex items-center justify-between pt-1">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-foreground">
              {product.ratingsAverage?.toFixed(1) || '4.5'}
            </span>
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
          </div>

          {/* Price with Original & Discounted display */}
          <div className="flex items-baseline gap-1.5">
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {localizeCurrency(originalPrice, locale)}
              </span>
            )}
            <span className="text-sm font-extrabold text-foreground">
              {localizeCurrency(currentPrice, locale)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card">
      <div className="aspect-square w-full bg-muted/40">
        <Skeleton className="size-full" />
      </div>
      <div className="p-3.5 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
