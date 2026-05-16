export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubcategoriesQueryParams {
  limit?: string;
  page?: string;
}
