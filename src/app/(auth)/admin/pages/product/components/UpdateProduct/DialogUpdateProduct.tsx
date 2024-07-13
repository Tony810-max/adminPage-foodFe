"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { IProductSub } from "@/types/common";
import { DialogUpdateProps } from "../../types/common";
import { Pencil } from "lucide-react";
import { ProductContext } from "@/context/productContext";

const DialogUpdateProduct: React.FC<DialogUpdateProps> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const productContext = React.useContext(ProductContext);
  const dataProduct = productContext?.dataProduct;

  const [dataCurrProduct, setDataCurrProduct] = React.useState<IProductSub[]>(
    []
  );

  const handleUpdateForm = () => {
    const updatedData =
      dataProduct?.products.filter((data) => data.id === id) || [];
    setDataCurrProduct(updatedData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="text-center w-full">
        <Pencil
          color="orange"
          size={"18"}
          className="hover:cursor-pointer hover:opacity-70 "
          onClick={handleUpdateForm}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[44rem] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <ModalUpdateProduct
          data={dataCurrProduct}
          id={id}
          onSetOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateProduct;
