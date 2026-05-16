import { apiClient, authHeaders } from '@/core/api/client';
import { ENDPOINTS } from '@/core/constants/endpoints';
import type { AddressesResponse, AddAddressBody } from '../types/address.types';

export const addressService = {
  /** Get logged user's addresses */
  async getAll(token: string): Promise<AddressesResponse> {
    return apiClient.get(ENDPOINTS.addresses.list, {
      headers: authHeaders(token),
    });
  },

  /** Get a specific address by ID */
  async getById(id: string, token: string) {
    return apiClient.get(ENDPOINTS.addresses.detail(id), {
      headers: authHeaders(token),
    });
  },

  /** Add a new address */
  async add(body: AddAddressBody, token: string): Promise<AddressesResponse> {
    return apiClient.post(ENDPOINTS.addresses.add, {
      body,
      headers: authHeaders(token),
    });
  },

  /** Remove an address */
  async remove(id: string, token: string): Promise<AddressesResponse> {
    return apiClient.delete(ENDPOINTS.addresses.remove(id), {
      headers: authHeaders(token),
    });
  },
};
