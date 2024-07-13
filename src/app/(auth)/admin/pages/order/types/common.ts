import { IShippingAddress } from "@/types/common";

export interface IShippingOrder {
  data: IShippingAddress;
}

export interface IDialogUpdate {
  id: number;
}

export interface IUpdateOrder {
  id: number;
  onSetOpen: (value: boolean) => void;
}
