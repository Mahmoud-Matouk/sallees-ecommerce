export interface WishlistItem {
  _id: string;
  title: string;
  slug: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  id: string;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistItem[];
}

export interface AddToWishlistBody {
  productId: string;
}

export interface AddToWishlistResponse {
  status: string;
  message: string;
  data: string[]; // array of product IDs
}
