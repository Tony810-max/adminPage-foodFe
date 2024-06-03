export const API_URL = "https://phanhoangquoctu-datn-be.onrender.com";

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
  id: number;
  title: string;
  description: string;
  price: string;
  discount: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  category: {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  };
  author: {
    id: number;
    name: string;
    gender: string;
    dateOfBirth: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  };
  publisher: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
  };
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
