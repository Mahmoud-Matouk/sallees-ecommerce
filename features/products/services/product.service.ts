import { apiClient } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type {
  PaginatedResponse,
  SingleResponse,
} from '@/core/types/common.types';
import type {
  Product,
  ProductSummary,
  ProductsQueryParams,
} from '../types/product.types';

export const productService = {
  /** Get paginated product list with optional filters */
  async getAll(
    params?: ProductsQueryParams
  ): Promise<PaginatedResponse<ProductSummary>> {
    return apiClient.get(ENDPOINTS.products.list, {
      params: params as Record<string, string>,
      next: { revalidate: 60 },
    });
  },

  /** Get a single product by ID (includes reviews) */
  async getById(id: string): Promise<SingleResponse<Product>> {
    return apiClient.get(ENDPOINTS.products.detail(id), {
      next: { revalidate: 60 },
    });
  },
};
