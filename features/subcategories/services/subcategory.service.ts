import { apiClient } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type {
  PaginatedResponse,
  SingleResponse,
} from '@/core/types/common.types';
import type {
  Subcategory,
  SubcategoriesQueryParams,
} from '../types/subcategory.types';

export const subcategoryService = {
  async getAll(
    params?: SubcategoriesQueryParams
  ): Promise<PaginatedResponse<Subcategory>> {
    return apiClient.get(ENDPOINTS.subcategories.list, {
      params: params as Record<string, string>,
      next: { revalidate: 300 },
    });
  },

  async getById(id: string): Promise<SingleResponse<Subcategory>> {
    return apiClient.get(ENDPOINTS.subcategories.detail(id));
  },
};
