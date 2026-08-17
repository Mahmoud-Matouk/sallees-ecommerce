import type { Metadata } from 'next';
import { appConfig } from '@/core/constants/app';
import type { Category } from '@/features/categories/types/category.types';
import { HomeContainer } from '@/features/products/components/HomeContainer';
import type { ProductSummary } from '@/features/products/types/product.types';
import { productService } from '@/features/products/services/product.service';
import { categoryService } from '@/features/categories/services/category.service';

export const metadata: Metadata = {
  title: `${appConfig.name} - كل ما تحتاجه في مكان واحد`,
  description:
    'تسوق آلاف المنتجات من أحدث الماركات بأفضل الأسعار وأعلى جودة - متجر إلكتروني متكامل.',
};

export default async function HomePage({
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search =
    typeof resolvedSearchParams?.search === 'string'
      ? resolvedSearchParams.search
      : undefined;
  const category =
    typeof resolvedSearchParams?.category === 'string'
      ? resolvedSearchParams.category
      : undefined;

  // Fetch best selling products and categories concurrently
  const [productsRes, categoriesRes] = await Promise.allSettled([
    productService.getAll({ sort: '-sold', limit: '40' }),
    categoryService.getAll(),
  ]);

  const products: ProductSummary[] =
    productsRes.status === 'fulfilled' && productsRes.value?.data
      ? productsRes.value.data
      : [];

  const categories: Category[] =
    categoriesRes.status === 'fulfilled' && categoriesRes.value?.data
      ? categoriesRes.value.data
      : [];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeContainer
          initialProducts={products}
          categories={categories}
          searchQuery={search}
          initialCategoryId={category}
        />
      </div>
    </main>
  );
}
