"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL, IOrder } from "@/types/common";
import InputDialogProduct from "./InputDialogProduct";

interface dialogProduct {
  id: number;
}

const DialogProductOrder: React.FC<dialogProduct> = ({ id }) => {
  const [order, setOrder] = useState<IOrder | undefined>();
  const handleViewProduct = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(`${API_URL}/api/v1/orders/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        setOrder(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="font-sans text-base text-center hover:text-blue-600"
          onClick={handleViewProduct}
        >
          View detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product</DialogTitle>
        </DialogHeader>
        {order?.products?.map((product) => {
          return (
            <div key={product?.id}>
              <InputDialogProduct
                index={product?.id}
                title={product?.product.title}
                image={product?.product.images[0]}
                quantity={product?.product_quantity}
              />
            </div>
          );
        })}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProductOrder;
