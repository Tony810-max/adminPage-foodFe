export const API_URL = "https://food-be-1dsk.onrender.com";

export interface IUser {
  id: number;
  address: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
  updatedAt: string;
}

export interface ICategory {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: 6;
  title: string;
  description: string;
  price: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  product_addedById: number;
  product_categoryId: number;
  category_id: number;
  category_title: string;
  category_description: string;
  category_createdAt: string;
  category_updatedAt: string;
  category_addedById: number;
  reviewCount: string;
  avgRating: null | number;
}

export type AddProduct = {
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
};

export interface IOrder {
  id: number;
  orderAt: string;
  status: string;
  shippedAt: null;
  deliveredAt: null;
  shippingAddress: {
    id: number;
    phoneNumber: string;
    name: string;
    address: string;
    city: string;
    postCode: string;
    state: string;
    country: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
  };
  products: [
    {
      id: number;
      product_unit_price: string;
      product_quantity: number;
      product: {
        id: number;
        title: string;
        description: string;
        price: string;
        stock: number;
        images: string[];
        createdAt: string;
        updatedAt: string;
      };
    }
  ];
}
