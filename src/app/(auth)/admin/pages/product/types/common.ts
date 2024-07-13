import { IProductSub } from "@/types/common";

export interface IAddProduct {
  title: string;
  description: string;
  price: number;
  //   discount: number;
  stock: number;
  categoryId: number;
  //   authorId: number;
  //   publisherId: number;
}

export interface IViewDetail {
  data: IProductSub;
}

export interface DialogUpdateProps {
  id: number;
}
