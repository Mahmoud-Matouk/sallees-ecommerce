import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/product.service';
import type { ProductsQueryParams } from '../types/product.types';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params?: ProductsQueryParams) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

export function useProducts(params?: ProductsQueryParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productService.getAll(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
}
