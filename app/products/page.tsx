import type { Metadata } from "next";
import { productService } from "@/features/products/services/product.service";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductSummary } from "@/features/products/types/product.types";

export const metadata: Metadata = {
  title: "Products | Store",
  description: "Browse our complete collection of products.",
};

export default async function ProductsPage() {
  const { data: products }: { data: ProductSummary[] } = await productService.getAll();

  return <ProductGrid products={products} />;
}
