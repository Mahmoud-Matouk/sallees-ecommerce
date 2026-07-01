'use client';

import Link from 'next/link';
import * as React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCartIcon, StarIcon } from 'lucide-react';
import { ProductImageGallery } from './ProductImageGallery';
import type { ProductSummary } from '../types/product.types';

interface ProductCardProps {
  product: ProductSummary;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isWishlist, setIsWishlist] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const images = React.useMemo(() => {
    const all = [product.imageCover, ...(product.images || [])];
    return Array.from(new Set(all)).filter(Boolean);
  }, [product]);

  return (
    <Link
      href={`/${product._id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Image Gallery */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <ProductImageGallery
          images={images}
          title={product.title}
          variant="card"
          isHovered={isHovered}
          priority={priority}
        />

        {/* Wishlist */}
        <div className="absolute right-3 top-3 z-10">
          <Heart
            className={`size-5 transition-colors hover:text-red-500 ${
              isWishlist ? 'text-red-500' : 'text-black drop-shadow-md'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlist(!isWishlist);
            }}
          />
        </div>

        {/* Category badge */}
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {product.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand */}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand.name}
        </span>

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`size-3.5 ${
                  i < Math.round(product.ratingsAverage)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsAverage})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <span className="text-lg font-bold text-foreground">
            EGP {product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to cart button */}
        <Button
          size="lg"
          className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={(e) => {
            e.preventDefault();
            // Handle add to cart logic here later
          }}
        >
          <ShoppingCartIcon className="size-4" />
          Add to cart
        </Button>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      {/* Image Gallery Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand */}
        <Skeleton className="h-3 w-16" />

        {/* Title */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-3.5 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-3 w-8" />
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Add to cart button */}
        <Skeleton className="mt-2 h-11 w-full rounded-md" />
      </div>
    </div>
  );
}
