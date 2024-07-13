import React from "react";

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalAddProduct from "./ModalAddProduct";

const DialogAddProduct = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="font-sans text-base capitalize"
        >
          Add product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <ModalAddProduct />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
