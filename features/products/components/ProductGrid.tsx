import type { ProductSummary } from "../types/product.types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ProductSummary[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className="container flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-muted p-6">
          <svg
            className="size-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          No products found
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
