export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
}

/** Product shape from list endpoints (no reviews) */
export interface ProductSummary {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
}

/** Full product shape from detail endpoint (includes reviews) */
export interface Product extends ProductSummary {
  reviews: Review[];
}

/** Query params supported by the products list endpoint */
export interface ProductsQueryParams {
  limit?: string;
  page?: string;
  sort?: string;
  fields?: string;
  keyword?: string;
  brand?: string;
  'price[gte]'?: string;
  'price[lte]'?: string;
  'category[in]'?: string;
}
