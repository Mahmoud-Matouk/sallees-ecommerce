'use client';

import * as React from 'react';
import { localizeCurrency } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useI18n } from '@/core/i18n/I18nProvider';
import { Checkbox } from '@/components/ui/checkbox';
import type { ProductSummary } from '../types/product.types';
import type { Category } from '@/features/categories/types/category.types';
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  Star,
  Tag,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export interface ProductFilterState {
  categoryId?: string;
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  minDiscount?: number;
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
}

interface ProductFiltersSidebarProps {
  products: ProductSummary[];
  categories: Category[];
  filters: ProductFilterState;
  onFiltersChange: (filters: ProductFilterState) => void;
  onClearAll: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export function ProductFiltersSidebar({
  products,
  categories,
  filters,
  onFiltersChange,
  onClearAll,
  isMobile = false,
  onCloseMobile,
}: ProductFiltersSidebarProps) {
  const { locale, translation: t } = useI18n();

  // Accordion collapsed states
  const [openSections, setOpenSections] = React.useState({
    categories: true,
    price: true,
    brands: true,
    ratings: true,
    discounts: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Brand search query inside sidebar
  const [brandSearch, setBrandSearch] = React.useState('');

  // Local price input state
  const [minPriceInput, setMinPriceInput] = React.useState(
    filters.minPrice?.toString() || ''
  );
  const [maxPriceInput, setMaxPriceInput] = React.useState(
    filters.maxPrice?.toString() || ''
  );

  React.useEffect(() => {
    setMinPriceInput(filters.minPrice?.toString() || '');
    setMaxPriceInput(filters.maxPrice?.toString() || '');
  }, [filters.minPrice, filters.maxPrice]);

  // Compute available brands with counts
  const availableBrands = React.useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const b = p.brand?.name;
      if (b) {
        map.set(b, (map.get(b) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Filtered brands by search
  const filteredBrands = React.useMemo(() => {
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      const catId = p.category?._id;
      if (catId) {
        map.set(catId, (map.get(catId) || 0) + 1);
      }
    });
    return map;
  }, [products]);

  // Active filter count
  const activeCount = React.useMemo(() => {
    let count = 0;
    if (filters.categoryId) count++;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
      count++;
    if (filters.minRating !== undefined) count++;
    if (filters.minDiscount !== undefined) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    return count;
  }, [filters]);

  const handleBrandToggle = (brandName: string) => {
    const isSelected = filters.brands.includes(brandName);
    const updated = isSelected
      ? filters.brands.filter((b) => b !== brandName)
      : [...filters.brands, brandName];
    onFiltersChange({ ...filters, brands: updated });
  };

  const handlePriceApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const min = minPriceInput ? parseFloat(minPriceInput) : undefined;
    const max = maxPriceInput ? parseFloat(maxPriceInput) : undefined;
    onFiltersChange({
      ...filters,
      minPrice: min && !isNaN(min) ? min : undefined,
      maxPrice: max && !isNaN(max) ? max : undefined,
    });
  };

  const handlePricePreset = (min?: number, max?: number) => {
    setMinPriceInput(min?.toString() || '');
    setMaxPriceInput(max?.toString() || '');
    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const pricePresets = [
    { label: `< 300 ${t.common.egp}`, min: undefined, max: 300 },
    { label: `300 - 600 ${t.common.egp}`, min: 300, max: 600 },
    { label: `600 - 1500 ${t.common.egp}`, min: 600, max: 1500 },
    { label: `> 1500 ${t.common.egp}`, min: 1500, max: undefined },
  ];

  return (
    <div className="flex flex-col gap-5 text-card-foreground">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3.5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-primary" />
          <h3 className="text-base font-bold text-foreground">
            {t.filters.title}
          </h3>
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>{t.filters.clearAll}</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter Accordion */}
      <div className="border-b border-border/60 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('categories')}
          className="flex w-full items-center justify-between py-1 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>{t.filters.categories}</span>
          {openSections.categories ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {openSections.categories && (
          <div className="mt-3 flex flex-col gap-1.5 animate-in fade-in-50 duration-150">
            {/* All Categories Option */}
            <button
              type="button"
              onClick={() =>
                onFiltersChange({ ...filters, categoryId: undefined })
              }
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-start ${
                !filters.categoryId
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <span>{t.filters.allCategories}</span>
              <span className="text-[11px] text-muted-foreground">
                {products.length}
              </span>
            </button>

            {categories.map((cat) => {
              const isSelected = filters.categoryId === cat._id;
              const count = categoryCounts.get(cat._id) || 0;

              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      categoryId: isSelected ? undefined : cat._id,
                    })
                  }
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-start ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="line-clamp-1">{cat.name}</span>
                  {count > 0 && (
                    <span className="text-[11px] text-muted-foreground shrink-0">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Range Filter Accordion */}
      <div className="border-b border-border/60 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between py-1 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>{t.filters.priceRange}</span>
          {openSections.price ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {openSections.price && (
          <div className="mt-3 flex flex-col gap-3 animate-in fade-in-50 duration-150">
            {/* Quick Price Preset Chips */}
            <div className="grid grid-cols-2 gap-1.5">
              {pricePresets.map((preset, idx) => {
                const isActive =
                  filters.minPrice === preset.min &&
                  filters.maxPrice === preset.max;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      isActive
                        ? handlePricePreset(undefined, undefined)
                        : handlePricePreset(preset.min, preset.max)
                    }
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer text-center ${
                      isActive
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Min / Max Inputs Form */}
            <form
              onSubmit={handlePriceApply}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder={t.filters.min}
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>
              <span className="text-xs text-muted-foreground">-</span>
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder={t.filters.max}
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="h-8 px-3 rounded-lg text-xs font-bold cursor-pointer"
              >
                {t.filters.go}
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* 3. Brands Filter Accordion */}
      {availableBrands.length > 0 && (
        <div className="border-b border-border/60 pb-4">
          <button
            type="button"
            onClick={() => toggleSection('brands')}
            className="flex w-full items-center justify-between py-1 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span>{t.filters.brands}</span>
            {openSections.brands ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </button>

          {openSections.brands && (
            <div className="mt-3 flex flex-col gap-2.5 animate-in fade-in-50 duration-150">
              {/* Brand search field */}
              {availableBrands.length > 6 && (
                <div className="relative">
                  <Search className="absolute start-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder={t.filters.searchBrands}
                    className="w-full rounded-lg border border-input bg-card ps-8 pe-2.5 py-1.5 text-xs placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                </div>
              )}

              {/* Brands list */}
              <div className="max-h-48 overflow-y-auto space-y-1.5 pe-1">
                {filteredBrands.map(({ name, count }) => {
                  const isChecked = filters.brands.includes(name);

                  return (
                    <label
                      key={name}
                      className="flex items-center justify-between px-2 py-1 rounded-md hover:bg-muted/50 cursor-pointer select-none transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleBrandToggle(name)}
                          className="size-4 rounded"
                        />
                        <span className="text-xs font-semibold text-foreground">
                          {name}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Customer Rating Filter Accordion */}
      <div className="border-b border-border/60 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('ratings')}
          className="flex w-full items-center justify-between py-1 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>{t.filters.rating}</span>
          {openSections.ratings ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {openSections.ratings && (
          <div className="mt-3 flex flex-col gap-1.5 animate-in fade-in-50 duration-150">
            {[4, 3, 2].map((stars) => {
              const isSelected = filters.minRating === stars;

              return (
                <button
                  key={stars}
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      minRating: isSelected ? undefined : stars,
                    })
                  }
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-start ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${
                            i < stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">
                      {t.filters.starsAndUp}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Deals & Discounts Accordion */}
      <div className="border-b border-border/60 pb-4">
        <button
          type="button"
          onClick={() => toggleSection('discounts')}
          className="flex w-full items-center justify-between py-1 text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>{t.filters.discount}</span>
          {openSections.discounts ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {openSections.discounts && (
          <div className="mt-3 flex flex-col gap-1.5 animate-in fade-in-50 duration-150">
            {[50, 30, 20, 10].map((pct) => {
              const isSelected = filters.minDiscount === pct;

              return (
                <button
                  key={pct}
                  type="button"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      minDiscount: isSelected ? undefined : pct,
                    })
                  }
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-start ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="font-semibold">
                    {pct}% {t.filters.offOrMore}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Availability & Offers */}
      <div className="flex flex-col gap-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-semibold text-foreground">
            {t.filters.onSaleOnly}
          </span>
          <Switch
            checked={Boolean(filters.onSaleOnly)}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, onSaleOnly: checked || undefined })
            }
          />
        </label>
      </div>

      {/* Mobile Apply Sticky Footer */}
      {isMobile && onCloseMobile && (
        <div className="mt-6 pt-3 border-t border-border">
          <Button
            onClick={onCloseMobile}
            className="w-full rounded-xl font-bold cursor-pointer"
          >
            {t.filters.apply}
          </Button>
        </div>
      )}
    </div>
  );
}
