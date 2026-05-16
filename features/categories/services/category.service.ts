import { apiClient } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type { PaginatedResponse, SingleResponse } from '@/core/types/common.types';
import type { Category, CategoriesQueryParams } from '../types/category.types';

export const categoryService = {
  async getAll(params?: CategoriesQueryParams): Promise<PaginatedResponse<Category>> {
    return apiClient.get(ENDPOINTS.categories.list, {
      params: params as Record<string, string>,
      next: { revalidate: 300 },
    });
  },

  async getById(id: string): Promise<SingleResponse<Category>> {
    return apiClient.get(ENDPOINTS.categories.detail(id));
  },

  /** Get all subcategories for a specific category */
  async getSubcategories(categoryId: string) {
    return apiClient.get(ENDPOINTS.categories.subcategories(categoryId));
  },
};
