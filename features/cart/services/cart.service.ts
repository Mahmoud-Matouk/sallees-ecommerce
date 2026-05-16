import { apiClient, authHeaders } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type {
  CartResponse,
  AddToCartBody,
  UpdateCartItemBody,
  ApplyCouponBody,
} from '../types/cart.types';

export const cartService = {
  /** Get logged user's cart */
  async get(token: string): Promise<CartResponse> {
    return apiClient.get(ENDPOINTS.cart.get, {
      headers: authHeaders(token),
    });
  },

  /** Add a product to cart */
  async addItem(body: AddToCartBody, token: string): Promise<CartResponse> {
    return apiClient.post(ENDPOINTS.cart.add, {
      body,
      headers: authHeaders(token),
    });
  },

  /** Update cart item quantity */
  async updateItem(
    itemId: string,
    body: UpdateCartItemBody,
    token: string
  ): Promise<CartResponse> {
    return apiClient.put(ENDPOINTS.cart.updateItem(itemId), {
      body,
      headers: authHeaders(token),
    });
  },

  /** Remove a specific item from cart */
  async removeItem(itemId: string, token: string): Promise<CartResponse> {
    return apiClient.delete(ENDPOINTS.cart.removeItem(itemId), {
      headers: authHeaders(token),
    });
  },

  /** Clear entire cart */
  async clear(token: string) {
    return apiClient.delete(ENDPOINTS.cart.clear, {
      headers: authHeaders(token),
    });
  },
};

/** Cart V2 service — uses Bearer auth instead of header token */
export const cartV2Service = {
  async get(token: string): Promise<CartResponse> {
    return apiClient.get(ENDPOINTS.cartV2.get, {
      headers: authHeaders(token),
    });
  },

  async addItem(body: AddToCartBody, token: string): Promise<CartResponse> {
    return apiClient.post(ENDPOINTS.cartV2.add, {
      body,
      headers: authHeaders(token),
    });
  },

  async updateItem(
    itemId: string,
    body: UpdateCartItemBody,
    token: string
  ): Promise<CartResponse> {
    return apiClient.put(ENDPOINTS.cartV2.updateItem(itemId), {
      body,
      headers: authHeaders(token),
    });
  },

  async removeItem(itemId: string, token: string): Promise<CartResponse> {
    return apiClient.delete(ENDPOINTS.cartV2.removeItem(itemId), {
      headers: authHeaders(token),
    });
  },

  async clear(token: string) {
    return apiClient.delete(ENDPOINTS.cartV2.clear, {
      headers: authHeaders(token),
    });
  },

  async applyCoupon(body: ApplyCouponBody, token: string): Promise<CartResponse> {
    return apiClient.put(ENDPOINTS.cartV2.applyCoupon, {
      body,
      headers: authHeaders(token),
    });
  },
};
