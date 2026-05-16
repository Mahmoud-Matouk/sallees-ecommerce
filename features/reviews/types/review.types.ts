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

export interface CreateReviewBody {
  review: string;
  rating: number;
}

export interface UpdateReviewBody {
  review?: string;
  rating?: number;
}
