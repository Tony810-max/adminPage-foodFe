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
import ModalDiaglogProduct from "./ModalDiaglogProduct";

const DialogProduct = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="">
          <p className="px-2 font-sans text-lg ">Add</p>
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <ModalDiaglogProduct />
      </DialogContent>
    </Dialog>
  );
};

export default DialogProduct;
