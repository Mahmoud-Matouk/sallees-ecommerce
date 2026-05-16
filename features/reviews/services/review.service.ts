import { apiClient, authHeaders } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type { PaginatedResponse, SingleResponse } from '@/core/types/common.types';
import type { Review, CreateReviewBody, UpdateReviewBody } from '../types/review.types';

export const reviewService = {
  /** Get all reviews */
  async getAll(): Promise<PaginatedResponse<Review>> {
    return apiClient.get(ENDPOINTS.reviews.list);
  },

  /** Get a single review by ID */
  async getById(id: string): Promise<SingleResponse<Review>> {
    return apiClient.get(ENDPOINTS.reviews.detail(id));
  },

  /** Get all reviews for a product (nested route) */
  async getForProduct(productId: string): Promise<PaginatedResponse<Review>> {
    return apiClient.get(ENDPOINTS.reviews.forProduct(productId));
  },

  /** Create a review for a product (requires token) */
  async create(
    productId: string,
    body: CreateReviewBody,
    token: string
  ): Promise<SingleResponse<Review>> {
    return apiClient.post(ENDPOINTS.reviews.forProduct(productId), {
      body,
      headers: authHeaders(token),
    });
  },

  /** Update a review (owner only) */
  async update(
    reviewId: string,
    body: UpdateReviewBody,
    token: string
  ): Promise<SingleResponse<Review>> {
    return apiClient.put(ENDPOINTS.reviews.detail(reviewId), {
      body,
      headers: authHeaders(token),
    });
  },

  /** Delete a review (owner/admin only) */
  async delete(reviewId: string, token: string) {
    return apiClient.delete(ENDPOINTS.reviews.detail(reviewId), {
      headers: authHeaders(token),
    });
  },
};
