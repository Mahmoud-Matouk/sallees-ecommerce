import { apiClient, authHeaders } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type { PaginatedResponse } from '@/core/types/common.types';
import type { Order, CreateOrderBody } from '../types/order.types';

export const orderService = {
  /** Get all orders (public) */
  async getAll(): Promise<PaginatedResponse<Order>> {
    return apiClient.get(ENDPOINTS.orders.list, {
      next: { revalidate: 30 },
    });
  },

  /** Get orders for a specific user */
  async getByUserId(userId: string): Promise<PaginatedResponse<Order>> {
    return apiClient.get(ENDPOINTS.orders.userOrders(userId));
  },

  /** Create a cash order from cart (v1 — requires token) */
  async createCashOrder(
    cartId: string,
    body: CreateOrderBody,
    token: string
  ): Promise<Order> {
    return apiClient.post(ENDPOINTS.orders.createCash(cartId), {
      body,
      headers: authHeaders(token),
    });
  },

  /** Create a cash order from cart (v2 — requires token) */
  async createCashOrderV2(
    cartId: string,
    body: CreateOrderBody,
    token: string
  ): Promise<Order> {
    return apiClient.post(ENDPOINTS.orders.createCashV2(cartId), {
      body,
      headers: authHeaders(token),
    });
  },

  /** Create checkout session for online payment (requires token) */
  async checkoutSession(
    cartId: string,
    body: CreateOrderBody,
    token: string,
    callbackUrl: string
  ) {
    return apiClient.post(ENDPOINTS.orders.checkoutSession(cartId), {
      body,
      headers: authHeaders(token),
      params: { url: callbackUrl },
    });
  },
};
