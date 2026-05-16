export const ENDPOINTS = {
  // ─── Auth ──────────────────────────────────────────
  auth: {
    signup: '/api/v1/auth/signup',
    signin: '/api/v1/auth/signin',
    forgotPassword: '/api/v1/auth/forgotPasswords',
    verifyResetCode: '/api/v1/auth/verifyResetCode',
    resetPassword: '/api/v1/auth/resetPassword',
    verifyToken: '/api/v1/auth/verifyToken',
  },

  // ─── Users ─────────────────────────────────────────
  users: {
    list: '/api/v1/users',
    changePassword: '/api/v1/users/changeMyPassword',
    updateMe: '/api/v1/users/updateMe',
  },

  // ─── Categories ────────────────────────────────────
  categories: {
    list: '/api/v1/categories',
    detail: (id: string) => `/api/v1/categories/${id}`,
    subcategories: (categoryId: string) =>
      `/api/v1/categories/${categoryId}/subcategories`,
  },

  // ─── SubCategories ─────────────────────────────────
  subcategories: {
    list: '/api/v1/subcategories',
    detail: (id: string) => `/api/v1/subcategories/${id}`,
  },

  // ─── Brands ────────────────────────────────────────
  brands: {
    list: '/api/v1/brands',
    detail: (id: string) => `/api/v1/brands/${id}`,
  },

  // ─── Products ──────────────────────────────────────
  products: {
    list: '/api/v1/products',
    detail: (id: string) => `/api/v1/products/${id}`,
  },

  // ─── Reviews ───────────────────────────────────────
  reviews: {
    list: '/api/v1/reviews',
    detail: (id: string) => `/api/v1/reviews/${id}`,
    forProduct: (productId: string) =>
      `/api/v1/products/${productId}/reviews`,
  },

  // ─── Cart (v1) ─────────────────────────────────────
  cart: {
    get: '/api/v1/cart',
    add: '/api/v1/cart',
    clear: '/api/v1/cart',
    updateItem: (itemId: string) => `/api/v1/cart/${itemId}`,
    removeItem: (itemId: string) => `/api/v1/cart/${itemId}`,
  },

  // ─── Cart (v2) ─────────────────────────────────────
  cartV2: {
    get: '/api/v2/cart',
    add: '/api/v2/cart',
    clear: '/api/v2/cart',
    applyCoupon: '/api/v2/cart/applyCoupon',
    updateItem: (itemId: string) => `/api/v2/cart/${itemId}`,
    removeItem: (itemId: string) => `/api/v2/cart/${itemId}`,
  },

  // ─── Wishlist ──────────────────────────────────────
  wishlist: {
    get: '/api/v1/wishlist',
    add: '/api/v1/wishlist',
    remove: (productId: string) => `/api/v1/wishlist/${productId}`,
  },

  // ─── Addresses ─────────────────────────────────────
  addresses: {
    list: '/api/v1/addresses',
    add: '/api/v1/addresses',
    detail: (id: string) => `/api/v1/addresses/${id}`,
    remove: (id: string) => `/api/v1/addresses/${id}`,
  },

  // ─── Orders ────────────────────────────────────────
  orders: {
    list: '/api/v1/orders',
    userOrders: (userId: string) => `/api/v1/orders/user/${userId}`,
    createCash: (cartId: string) => `/api/v1/orders/${cartId}`,
    createCashV2: (cartId: string) => `/api/v2/orders/${cartId}`,
    checkoutSession: (cartId: string) =>
      `/api/v1/orders/checkout-session/${cartId}`,
  },
} as const;
