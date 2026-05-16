export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesQueryParams {
  limit?: string;
  page?: string;
  keyword?: string;
}
