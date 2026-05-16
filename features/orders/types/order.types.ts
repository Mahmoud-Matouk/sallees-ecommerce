export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderCartItemProduct {
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
}

export interface OrderCartItem {
  _id: string;
  product: OrderCartItemProduct;
  count: number;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface Order {
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderBody {
  shippingAddress: ShippingAddress;
}
