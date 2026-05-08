import axios from 'axios';

// We can define the exact Order interface once we know the exact data structure.
// Using generic structures to handle the response safely.
export interface CartItem {
  _id: string;
  product: {
    _id: string;
    title: string;
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
    id: string;
  };
  count: number;
  price: number;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItem[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  results?: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Order[];
}

const API_URL = 'https://ecommerce.routemisr.com/api/v1/orders/';

export const getOrdersApi = async (): Promise<OrdersResponse> => {
  try {
    const response = await axios.get<OrdersResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
