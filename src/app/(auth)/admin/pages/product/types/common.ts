import { IProductSub } from "@/types/common";

export interface IAddProduct {
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;

  categoryId: number | undefined;
  authorId: number | undefined;
  publisherId: number | undefined;
}

export interface ISubmitData {
  title: string;
  description: string;
  price: number;
  discount: number;
  stock: number;

  categoryValue: string;
  authorValue: string;
  publisherValue: string;
}

export interface IViewDetail {
  data: IProductSub;
}

export interface DialogUpdateProps {
  id: number;
}
