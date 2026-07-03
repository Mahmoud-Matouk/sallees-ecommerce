import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/core/i18n/languages';
import { Product } from '@/features/products/types/product.types';
import { productService } from '@/features/products/services/product.service';
import { ProductDetails } from '@/features/products/components/ProductDetails';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; lang: Locale }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data: product } = await productService.getById(id);
    return {
      title: `${product.title} | Store`,
      description:
        product.description || `${product.title} by ${product.brand.name}`,
    };
  } catch {
    return {
      title: 'Product Not Found',
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
    return <ProductDetails product={product} lang={lang} />;
  } catch {
    notFound();
  }
}
