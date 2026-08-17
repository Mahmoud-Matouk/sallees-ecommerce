import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductSummary } from '@/features/products/types/product.types';

interface WishlistStore {
  items: ProductSummary[];
  toggleItem: (product: ProductSummary) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        set((state) => {
          const index = state.items.findIndex((i) => i._id === product._id);
          if (index >= 0) {
            const next = [...state.items];
            next.splice(index, 1);
            return { items: next };
          }
          return { items: [...state.items, product] };
        });
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i._id === productId);
      },
      totalItems: () => get().items.length,
    }),
    { name: 'sallees-wishlist' }
  )
);
