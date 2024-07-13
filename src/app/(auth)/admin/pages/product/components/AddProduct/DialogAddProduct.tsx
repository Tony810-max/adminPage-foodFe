"use client";
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
import ModalAddProduct from "./ModalAddProduct";

const DialogAddProduct = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="font-sans text-base capitalize"
        >
          Add product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[44rem] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <ModalAddProduct onSetOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
