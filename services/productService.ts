import axios from 'axios';

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  data: Product[];
}

const API_URL = 'https://ecommerce.routemisr.com/api/v1/products';

export const getProductsApi = async (): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
