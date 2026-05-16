export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandsQueryParams {
  limit?: string;
  page?: string;
  keyword?: string;
}
