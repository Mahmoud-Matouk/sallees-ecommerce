'use client';

import * as React from 'react';
import { HeroBanner } from './HeroBanner';
import { ProductGrid } from './ProductGrid';
import { useI18n } from '@/core/i18n/I18nProvider';
import { TrustBadges } from '@/components/trust-badges';
import type { ProductSummary } from '../types/product.types';
import type { Category } from '@/features/categories/types/category.types';

interface HomeContainerProps {
  initialProducts: ProductSummary[];
  categories: Category[];
  searchQuery?: string;
  initialCategoryId?: string;
}

export function HomeContainer({
  initialProducts,
  categories,
  searchQuery,
  initialCategoryId,
}: HomeContainerProps) {
  const { translation: t } = useI18n();
  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    initialCategoryId || ''
  );

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const activeCategory = categories.find((c) => c._id === selectedCategory);
  const sectionTitle = selectedCategory
    ? activeCategory?.name || t.products.bestSellers
    : searchQuery
      ? `${t.common.search}: "${searchQuery}"`
      : t.products.bestSellers;

  return (
    <div className="flex flex-col gap-6 py-6 sm:py-8">
      <HeroBanner />
      <ProductGrid
        products={initialProducts}
        categories={categories}
        title={sectionTitle}
        selectedCategoryId={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
      />
      <TrustBadges />
    </div>
  );
}
