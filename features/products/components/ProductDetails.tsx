import { ProductReviews } from './ProductReviews';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '../types/product.types';
import { ProductImageGallery } from './ProductImageGallery';
import {
  StarIcon,
  TagIcon,
  BoxIcon,
  TruckIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { localizeCurrency } from '@/lib/helper';
import type { Locale } from '@/core/i18n/languages';

interface ProductDetailsProps {
  product: Product;
  lang?: Locale;
}
export function ProductDetails({ product, lang }: ProductDetailsProps) {
  return (
    <div className="container">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/`}>{product.category.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — Images */}
        <ProductImageGallery
          images={[product.imageCover, ...product.images]}
          title={product.title}
        />

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            {product.brand.name}
          </span>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {product.title}
          </h1>

          {/* Rating row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`size-4 ${
                    i < Math.round(product.ratingsAverage)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {product.ratingsAverage}
            </span>
            <span className="text-sm text-muted-foreground">
              ({product.ratingsQuantity} reviews)
            </span>
            <span className="mx-1 text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {product.sold} sold
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              {localizeCurrency(product.price, lang)}
            </span>
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Category & Subcategory tags */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <TagIcon className="size-3" />
              {product.category.name}
            </span>
            {product.subcategory.map((sub) => (
              <span
                key={sub._id}
                className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {sub.name}
              </span>
            ))}
          </div>

          {/* Stock info */}
          <div className="flex items-center gap-2">
            <BoxIcon className="size-4 text-muted-foreground" />
            <span
              className={`text-sm font-medium ${
                product.quantity > 0 ? 'text-green-500' : 'text-destructive'
              }`}
            >
              {product.quantity > 0
                ? `${product.quantity} in stock`
                : 'Out of stock'}
            </span>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-2.5">
              <TruckIcon className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Free shipping
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheckIcon className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Secure checkout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Customer Reviews
        </h2>
        <ProductReviews
          reviews={product.reviews}
          ratingsAverage={product.ratingsAverage}
          ratingsQuantity={product.ratingsQuantity}
          lang={lang}
        />
      </div>
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="container py-8">
      {/* Breadcrumb Skeleton */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Skeleton className="h-4 w-16" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Skeleton className="h-4 w-24" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Skeleton className="h-4 w-32" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main grid */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column — Image Gallery Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Skeleton className="h-full w-full" />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square w-20 rounded-md bg-muted"
              />
            ))}
          </div>
        </div>

        {/* Right Column — Info Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Brand */}
          <Skeleton className="h-4 w-20" />

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="size-4 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price */}
          <Skeleton className="h-10 w-36" />

          <hr className="border-border" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Category & Subcategory tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>

          {/* Stock info */}
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex items-center gap-2.5">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section skeleton */}
      <div className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Customer Reviews
        </h2>
        <div className="flex flex-col gap-6">
          {/* Summary header skeleton */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="size-5 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-6 w-8" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Reviews list skeleton */}
          <div className="flex flex-col divide-y divide-border">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 py-4 first:pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar skeleton */}
                    <Skeleton className="size-9 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  {/* Rating stars skeleton */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="size-3.5 rounded-full" />
                    ))}
                  </div>
                </div>
                {/* Review text skeleton */}
                <div className="pl-12 space-y-1.5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
