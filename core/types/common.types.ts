/** Reusable pagination metadata from list endpoints */
export interface PaginationMeta {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

/** Generic paginated API response wrapper */
export interface PaginatedResponse<T> {
  results: number;
  metadata: PaginationMeta;
  data: T[];
}

/** Generic single-item API response wrapper */
export interface SingleResponse<T> {
  data: T;
}

/** Generic message response (for add/remove operations) */
export interface MessageResponse {
  status: string;
  message: string;
}
