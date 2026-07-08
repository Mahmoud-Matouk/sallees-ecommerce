import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { appConfig } from '@/core/constants/app';
import { getTranslation, type Locale } from '@/core/i18n/languages';
import type { Product } from '@/features/products/types/product.types';
import { productService } from '@/features/products/services/product.service';
import { ProductDetails } from '@/features/products/components/ProductDetails';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const { defaultLocale } = appConfig;
  const t = await getTranslation(locale ?? defaultLocale);

  try {
    const { data: product }: { data: Product } =
      await productService.getById(id);
    return {
      title: `${product.title} | ${appConfig.name}`,
      description:
        product.description || `${product.title} by ${product.brand.name}`,
    };
  } catch {
    return {
      title: `${t.product?.notFound} - ${appConfig.name}`,
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; lang: Locale }>;
}) {
  const { id, lang } = await params;

  try {
    const { data: product }: { data: Product } =
      await productService.getById(id);
    return <ProductDetails product={product} locale={lang} />;
  } catch {
    notFound();
  }
}
