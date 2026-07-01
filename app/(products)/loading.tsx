import { ProductCardSkeleton } from '@/features/products/components/ProductCard';

export default function Loading() {
  return (
    <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
