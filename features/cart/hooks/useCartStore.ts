import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartProduct } from '../types/cart.types';
import type { ProductSummary } from '@/features/products/types/product.types';

interface CartStore {
  items: CartItem[];
  addItem: (product: ProductSummary) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product._id === product._id
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product._id === product._id ? { ...i, count: i.count + 1 } : i
              ),
            };
          }

          const cartProduct: CartProduct = {
            _id: product._id,
            id: product.id || product._id,
            title: product.title,
            imageCover: product.imageCover,
            category: {
              _id: product.category._id,
              name: product.category.name,
              slug: product.category.slug,
              image: product.category.image,
            },
            brand: {
              _id: product.brand._id,
              name: product.brand.name,
              slug: product.brand.slug,
              image: product.brand.image,
            },
            ratingsAverage: product.ratingsAverage,
          };

          const newItem: CartItem = {
            _id: product._id, // use product id as cart item id locally
            product: cartProduct,
            count: 1,
            price: product.price,
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.product._id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.product._id === id ? { ...i, count: Math.max(1, quantity) } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.count, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.count, 0),
    }),
    { name: 'sallees-cart' }
  )
);
