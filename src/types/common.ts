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
