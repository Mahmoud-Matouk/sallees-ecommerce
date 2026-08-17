'use client';

import * as React from 'react';
import { ProductCard } from './ProductCard';
import { localizeCurrency } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/core/i18n/I18nProvider';
import type { ProductSummary } from '../types/product.types';
import type { Category } from '@/features/categories/types/category.types';
import {
  ProductFiltersSidebar,
  type ProductFilterState,
} from './ProductFiltersSidebar';
import {
  SlidersHorizontal,
  RotateCcw,
  X,
  ArrowUpDown,
  Star,
  Check,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProductGridProps {
  products: ProductSummary[];
  categories?: Category[];
  title?: string;
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
  searchQuery?: string;
  preloadCount?: number;
}

export type SortOption =
  | 'recommended'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'most-sold'
  | 'newest';

export function ProductGrid({
  products,
  categories = [],
  title,
  selectedCategoryId,
  onSelectCategory,
  searchQuery,
  preloadCount = 4,
}: ProductGridProps) {
  const { locale, translation: t, dir } = useI18n();

  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<SortOption>('recommended');

  const [filters, setFilters] = React.useState<ProductFilterState>({
    categoryId: selectedCategoryId || undefined,
    brands: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
    minDiscount: undefined,
    inStockOnly: undefined,
    onSaleOnly: undefined,
  });

  // Sync selectedCategoryId from props if it changes externally
  React.useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoryId: selectedCategoryId || undefined,
    }));
  }, [selectedCategoryId]);

  const handleFiltersChange = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
    if (onSelectCategory && newFilters.categoryId !== selectedCategoryId) {
      onSelectCategory(newFilters.categoryId || '');
    }
  };

  const handleClearAll = () => {
    setFilters({
      categoryId: undefined,
      brands: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
      minDiscount: undefined,
      inStockOnly: undefined,
      onSaleOnly: undefined,
    });
    if (onSelectCategory) {
      onSelectCategory('');
    }
  };

  // Filter and Sort Engine
  const filteredAndSortedProducts = React.useMemo(() => {
    let list = [...(products || [])];

    // 1. Search Query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q)
      );
    }

    // 2. Category filter
    if (filters.categoryId) {
      list = list.filter(
        (p) =>
          p.category?._id === filters.categoryId ||
          p.category?.name?.toLowerCase() === filters.categoryId?.toLowerCase()
      );
    }

    // 3. Brands filter
    if (filters.brands.length > 0) {
      list = list.filter((p) =>
        p.brand?.name ? filters.brands.includes(p.brand.name) : false
      );
    }

    // 4. Price range filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      list = list.filter((p) => {
        const effectivePrice = p.priceAfterDiscount ?? p.price;
        if (
          filters.minPrice !== undefined &&
          effectivePrice < filters.minPrice
        ) {
          return false;
        }
        if (
          filters.maxPrice !== undefined &&
          effectivePrice > filters.maxPrice
        ) {
          return false;
        }
        return true;
      });
    }

    // 5. Rating filter
    if (filters.minRating !== undefined) {
      list = list.filter(
        (p) => (p.ratingsAverage || 4.5) >= filters.minRating!
      );
    }

    // 6. Discount filter
    if (filters.minDiscount !== undefined) {
      list = list.filter((p) => {
        if (!p.priceAfterDiscount || p.priceAfterDiscount >= p.price)
          return false;
        const discountPct = Math.round(
          ((p.price - p.priceAfterDiscount) / p.price) * 100
        );
        return discountPct >= filters.minDiscount!;
      });
    }

    // 7. On sale only
    if (filters.onSaleOnly) {
      list = list.filter(
        (p) => Boolean(p.priceAfterDiscount) && p.priceAfterDiscount! < p.price
      );
    }

    // 8. Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort(
          (a, b) =>
            (a.priceAfterDiscount ?? a.price) -
            (b.priceAfterDiscount ?? b.price)
        );
        break;
      case 'price-desc':
        list.sort(
          (a, b) =>
            (b.priceAfterDiscount ?? b.price) -
            (a.priceAfterDiscount ?? a.price)
        );
        break;
      case 'rating':
        list.sort((a, b) => (b.ratingsAverage || 0) - (a.ratingsAverage || 0));
        break;
      case 'most-sold':
        list.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
      case 'newest':
        list.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      case 'recommended':
      default:
        // Balanced: sort by sales & rating
        list.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
    }

    return list;
  }, [products, searchQuery, filters, sortBy]);

  // Active filter count
  const activeCount = React.useMemo(() => {
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
      count++;
    if (filters.minRating !== undefined) count++;
    if (filters.minDiscount !== undefined) count++;
    if (filters.onSaleOnly) count++;
    return count;
  }, [filters]);

  const sortOptions = [
    { value: 'recommended', label: t.filters.recommended },
    { value: 'price-asc', label: t.filters.priceLowHigh },
    { value: 'price-desc', label: t.filters.priceHighLow },
    { value: 'rating', label: t.filters.topRated },
    { value: 'most-sold', label: t.filters.mostSold },
    { value: 'newest', label: t.filters.newest },
  ];

  const currentSortLabel =
    sortOptions.find((o) => o.value === sortBy)?.label || t.filters.recommended;

  return (
    <section id="products" className="w-full py-4">
      {/* Top Section Header & Mobile Sticky Filter Bar */}
      <div className="sticky top-27 lg:static z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 bg-background/95 backdrop-blur-md transition-all py-3 mb-4 border-b border-border/80 lg:border-none lg:bg-transparent lg:py-0 lg:mb-6">
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Title and Result Counter */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground truncate">
              {t.products.recommended}
            </h2>
            <span className="text-xs text-muted-foreground font-semibold shrink-0">
              ({filteredAndSortedProducts.length})
            </span>
          </div>

          {/* Action Controls: Mobile Filters Button + Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Filters Sheet Trigger */}
            <div className="lg:hidden">
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl flex items-center gap-1.5 px-3 h-9 font-semibold shadow-xs cursor-pointer"
                  >
                    <SlidersHorizontal className="size-4 text-primary" />
                    <span className="text-xs">{t.filters.title}</span>
                    {activeCount > 0 && (
                      <span className="flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {activeCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={dir === 'rtl' ? 'right' : 'left'}
                  className="overflow-y-auto w-[85vw] max-w-md p-5"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>{t.filters.title}</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <ProductFiltersSidebar
                      products={products}
                      categories={categories}
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onClearAll={handleClearAll}
                      isMobile={true}
                      onCloseMobile={() => setMobileFilterOpen(false)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort By Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl flex items-center gap-1.5 px-3 h-9 font-semibold shadow-xs cursor-pointer"
                >
                  <ArrowUpDown className="size-3.5 text-muted-foreground" />
                  <span className="text-foreground text-xs font-bold line-clamp-1 max-w-[90px] sm:max-w-none">
                    {currentSortLabel}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {sortOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setSortBy(opt.value as SortOption)}
                    className="flex items-center justify-between cursor-pointer text-xs py-2"
                  >
                    <span
                      className={
                        sortBy === opt.value
                          ? 'font-bold text-primary'
                          : 'text-foreground'
                      }
                    >
                      {opt.label}
                    </span>
                    {sortBy === opt.value && (
                      <Check className="size-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar on Desktop */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left/Right Sidebar on Desktop (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border/80 bg-card p-4 shadow-2xs overscroll-contain">
          <ProductFiltersSidebar
            products={products}
            categories={categories}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearAll={handleClearAll}
          />
        </aside>

        {/* Product Cards Grid Area (9 Cols) */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          {/* Active Filter Chips / Pills */}
          {activeCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60">
              <span className="text-xs font-semibold text-muted-foreground me-1">
                {t.filters.title}:
              </span>

              {/* Category chip */}
              {filters.categoryId && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
                  <span>
                    {categories.find((c) => c._id === filters.categoryId)
                      ?.name || filters.categoryId}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleFiltersChange({
                        ...filters,
                        categoryId: undefined,
                      })
                    }
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {/* Brand chips */}
              {filters.brands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-foreground shadow-2xs"
                >
                  <span>{b}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleFiltersChange({
                        ...filters,
                        brands: filters.brands.filter((item) => item !== b),
                      })
                    }
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}

              {/* Price chip */}
              {(filters.minPrice !== undefined ||
                filters.maxPrice !== undefined) && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
                  <span>
                    {filters.minPrice !== undefined
                      ? localizeCurrency(filters.minPrice, locale)
                      : '0'}{' '}
                    -{' '}
                    {filters.maxPrice !== undefined
                      ? localizeCurrency(filters.maxPrice, locale)
                      : '∞'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleFiltersChange({
                        ...filters,
                        minPrice: undefined,
                        maxPrice: undefined,
                      })
                    }
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {/* Rating chip */}
              {filters.minRating !== undefined && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
                  <span className="flex items-center gap-1">
                    {filters.minRating}
                    <Star className="size-3 fill-amber-400 text-amber-400" /> &
                    up
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleFiltersChange({
                        ...filters,
                        minRating: undefined,
                      })
                    }
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {/* Discount chip */}
              {filters.minDiscount !== undefined && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
                  <span>≥ {filters.minDiscount}% OFF</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleFiltersChange({
                        ...filters,
                        minDiscount: undefined,
                      })
                    }
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {/* On Sale chip */}
              {filters.onSaleOnly && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border text-xs font-semibold text-foreground shadow-2xs">
                  <span>{t.filters.onSaleOnly}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleFiltersChange({
                        ...filters,
                        onSaleOnly: undefined,
                      })
                    }
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              )}

              {/* Clear All button */}
              <button
                type="button"
                onClick={handleClearAll}
                className="ms-auto text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>{t.filters.clearAll}</span>
              </button>
            </div>
          )}

          {/* Product Cards Grid (2 cols on mobile, 3 on tablet, 4 on desktop) */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  priority={index < preloadCount}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-border bg-card">
              <div className="rounded-full bg-muted p-5 mb-4">
                <SlidersHorizontal className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                {t.products.notFound}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                {locale === 'ar'
                  ? 'لا توجد منتجات تطابق الفلاتر المحددة. جرب إزالة بعض الفلاتر.'
                  : 'No products match the selected filters. Try clearing some filters.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="mt-4 rounded-xl cursor-pointer"
              >
                <RotateCcw className="size-3.5 mr-1.5" />
                <span>{t.filters.clearAll}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
