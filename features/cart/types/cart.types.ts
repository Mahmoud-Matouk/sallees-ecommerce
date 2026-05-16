import type { ProductSummary } from '@/features/products/types/product.types';

export interface CartProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  _id: string;
  product: CartProduct;
  count: number;
  price: number;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: Cart;
}

export interface AddToCartBody {
  productId: string;
}

export interface UpdateCartItemBody {
  count: string;
}

export interface ApplyCouponBody {
  couponName: string;
}
