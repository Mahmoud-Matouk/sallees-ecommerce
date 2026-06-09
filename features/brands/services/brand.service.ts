import { apiClient } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type { Brand, BrandsQueryParams } from '../types/brand.types';
import type {
  PaginatedResponse,
  SingleResponse,
} from '@/core/types/common.types';

export const brandService = {
  async getAll(params?: BrandsQueryParams): Promise<PaginatedResponse<Brand>> {
    return apiClient.get(ENDPOINTS.brands.list, {
      params: params as Record<string, string>,
      next: { revalidate: 300 },
    });
  },

  async getById(id: string): Promise<SingleResponse<Brand>> {
    return apiClient.get(ENDPOINTS.brands.detail(id));
  },
};
