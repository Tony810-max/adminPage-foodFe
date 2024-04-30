import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { IProduct } from "@/types/common";
import useProduct from "@/hook/useProduct";

interface DialogUpdateProps {
  id: number;
}

const DialogUpdateProduct: React.FC<DialogUpdateProps> = ({ id }) => {
  const { dataProduct } = useProduct();
  const [dataCurrProduct, setDataCurrProduct] = useState<IProduct[]>([]);
  const handleUpdateForm = () => {
    setDataCurrProduct(dataProduct?.filter((data) => data?.id === id));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="font-sans text-base"
          onClick={handleUpdateForm}
        >
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <ModalUpdateProduct data={dataCurrProduct} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateProduct;
