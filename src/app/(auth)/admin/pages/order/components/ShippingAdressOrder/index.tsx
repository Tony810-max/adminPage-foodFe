import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalShippingAdress from "./ModalShippingAdress";
import { IShippingOrder } from "../../types/common";

const ShippingAdressOrder: React.FC<IShippingOrder> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-sans text-sm">
          View Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Shipping Address</DialogTitle>
          <DialogDescription>This is detail shipping address</DialogDescription>
        </DialogHeader>
        <ModalShippingAdress data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default ShippingAdressOrder;
