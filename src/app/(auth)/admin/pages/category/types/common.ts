import { ICategory } from "@/types/common";

export type dataAddCategory = {
  title: string;
  description: string;
};

export interface IDataCategory {
  dataCategory: ICategory[];
  fetchCategory: () => void;
}
