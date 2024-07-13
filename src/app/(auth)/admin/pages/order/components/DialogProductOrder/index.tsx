"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IProductDetail } from "@/types/common";
import InputDialogProduct from "./InputDialogProduct";

interface dialogProduct {
  data: IProductDetail[];
}

const DialogProductOrder: React.FC<dialogProduct> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="font-sans text-sm text-center ">
          View Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-sans text-base text-center">
            Product Detail Order
          </DialogTitle>
        </DialogHeader>
        {data?.map((product) => {
          return (
            <div key={product?.id}>
              <InputDialogProduct
                title={product?.product.title}
                image={product?.product.images[0]}
                quantity={product?.product_quantity}
                stock={product?.product?.stock}
              />
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default DialogProductOrder;
