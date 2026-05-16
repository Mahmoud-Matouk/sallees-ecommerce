import type { Metadata } from "next";
import { productService } from "@/features/products/services/product.service";
import { ProductGrid } from "@/features/products/components/ProductGrid";

export const metadata: Metadata = {
  title: "Products | Store",
  description: "Browse our complete collection of products.",
};

export default async function ProductsPage() {
  const { data: products } = await productService.getAll();

  return <ProductGrid products={products} />;
}
