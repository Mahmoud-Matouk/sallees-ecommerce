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

import { appConfig } from '@/core/constants/app';
import { localizeCurrency, getLocalizedPath } from '@/lib/helper';
import { getTranslation, type Locale } from '@/core/i18n/languages';

interface ProductDetailsProps {
  product: Product;
  locale?: Locale;
}

export async function ProductDetails({
  product,
  locale = 'ar',
}: ProductDetailsProps) {
  const t = await getTranslation(locale ?? appConfig.defaultLocale);

  const effectivePrice = product.priceAfterDiscount ?? product.price;
  const originalPrice = product.priceAfterDiscount ? product.price : null;

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={getLocalizedPath('/', locale)}>
              {t.common.home}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={getLocalizedPath(
                `/?category=${product.category?._id}#products`,
                locale
              )}
            >
              {product.category?.name}
            </BreadcrumbLink>
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
          images={[product.imageCover, ...(product.images || [])].filter(
            Boolean
          )}
          title={product.title}
        />

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          {/* Brand */}
          {product.brand?.name && (
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              {product.brand.name}
            </span>
          )}

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
                    i < Math.round(product.ratingsAverage || 4.5)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {product.ratingsAverage?.toFixed(1) || '4.5'}
            </span>
            <span className="text-sm text-muted-foreground">
              ({product.ratingsQuantity || 0} {t.products.reviews})
            </span>
            <span className="mx-1 text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">
              {product.sold || 0} {t.products.bestSellers}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {localizeCurrency(originalPrice, locale)}
              </span>
            )}
            <span className="text-3xl font-extrabold text-foreground">
              {localizeCurrency(effectivePrice, locale)}
            </span>
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {t.products.description}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Category & Subcategory tags */}
          <div className="flex flex-wrap gap-2">
            {product.category?.name && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <TagIcon className="size-3" />
                {product.category.name}
              </span>
            )}
            {product.subcategory?.map((sub) => (
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
                ? `${product.quantity} ${t.products.unitsInStock}`
                : t.products.outOfStock}
            </span>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-2.5">
              <TruckIcon className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {t.products.freeShipping}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheckIcon className="size-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {t.products.secureCheckout}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mt-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          {t.products.customerReviews}
        </h2>
        <ProductReviews
          reviews={product.reviews || []}
          ratingsAverage={product.ratingsAverage || 4.5}
          ratingsQuantity={product.ratingsQuantity || 0}
          locale={locale}
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
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
