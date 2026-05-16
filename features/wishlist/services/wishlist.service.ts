import { apiClient, authHeaders } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type {
  WishlistResponse,
  AddToWishlistBody,
  AddToWishlistResponse,
} from '../types/wishlist.types';

export const wishlistService = {
  /** Get logged user's wishlist */
  async get(token: string): Promise<WishlistResponse> {
    return apiClient.get(ENDPOINTS.wishlist.get, {
      headers: authHeaders(token),
    });
  },

  /** Add a product to wishlist */
  async add(body: AddToWishlistBody, token: string): Promise<AddToWishlistResponse> {
    return apiClient.post(ENDPOINTS.wishlist.add, {
      body,
      headers: authHeaders(token),
    });
  },

  /** Remove a product from wishlist */
  async remove(productId: string, token: string): Promise<WishlistResponse> {
    return apiClient.delete(ENDPOINTS.wishlist.remove(productId), {
      headers: authHeaders(token),
    });
  },
};
