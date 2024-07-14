export const API_URL = "https://phanhoangquoctu-datn-be.onrender.com";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: null;
  dateOfBirth: null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  isActice: boolean;
  verifyCode: string;
}

export interface IUsers {
  users: IUser[];
  meta: IMeta;
}

export interface ICategory {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface ICategoryMain {
  categories: ICategory[];
  meta: IMeta;
}

export interface IAuth {
  id: number;
  name: string;
  gender: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface IPublisher {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface IPublisherMain {
  publishers: IPublisher[];
  meta: IMeta;
}

export interface IShippingAddress {
  id: number;
  phoneNumber: string;
  name: string;
  address: string;
  city: string;
  postCode: string;
  state: string;
  country: string;
}

export interface IProduct {
  title: string;
  description: string;
  price: number | string;
  discount: number;
  stock: number;
  images: string[];
  categoryId: number | string;
  authorId: number;
  publisherId: number;
}

export interface IProductMain {
  products: IProductSub[];
  meta: IMeta;
}

export interface IProductSub {
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
  category: ICategory;
  author: IAuth;
  publisher: IPublisher;
}

export interface IProducts {
  id: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductDetail {
  id: number;
  product_unit_price: string;
  product_quantity: number;
  product: IProducts;
}

export interface IUserDataPerDay {
  date: string;
  count: number;
}

export interface IDailyRevenue {
  date: string;
  revenue: number;
}

export interface IOrder {
  id: number;
  orderAt: string;
  status: string;
  type: string;
  isPaid: string;
  shippedAt: null;
  deliveredAt: null;
  shippingAddress: IShippingAddress;
  user: IUser;
  products: IProductDetail[];
}
export interface IOderMain {
  orders: IOrder[];
  meta: IMeta;
}

export interface IPost {
  id: number;
  title: string;
  description: string;
  images: string[];
  isApproved: boolean;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  likeCount: number;
  author: IUser;
  likes: ILike[];
}

export interface IAuthor {
  authors: IAuth[];
  meta: IMeta;
}

export interface ILike {
  id: number;
  user: IUser;
}

export interface ILikeInfo {
  postId: number;
  likes: ILike[];
}

export interface IPostMain {
  posts: IPost[];
  meta: IMeta;
  likesInfo: ILikeInfo[];
}

export interface IMeta {
  limit: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
