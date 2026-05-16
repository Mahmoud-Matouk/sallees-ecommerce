import { useQuery } from '@tanstack/react-query';
import { orderService } from '../services/order.service';

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  userOrders: (userId: string) => [...orderKeys.all, 'user', userId] as const,
};

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: () => orderService.getAll(),
  });
}

export function useUserOrders(userId: string) {
  return useQuery({
    queryKey: orderKeys.userOrders(userId),
    queryFn: () => orderService.getByUserId(userId),
    enabled: !!userId,
  });
}
