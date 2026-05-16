const BASE_URL = 'https://ecommerce.routemisr.com';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

/**
 * Centralized fetch wrapper for the Route E-commerce API.
 * Uses Next.js native `fetch` with extended options (caching, revalidation).
 */
async function request<T>(
  method: HttpMethod,
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { headers = {}, body, params, cache, next } = options;

  // Build URL with query params
  const url = new URL(endpoint, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  }

  const fetchOptions: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(cache && { cache }),
    ...(next && { next }),
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/** Build auth headers from a JWT token */
function authHeaders(token: string): Record<string, string> {
  return { token };
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('GET', endpoint, options),

  post: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('POST', endpoint, options),

  put: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('PUT', endpoint, options),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('DELETE', endpoint, options),

  patch: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>('PATCH', endpoint, options),
};

export { authHeaders };
