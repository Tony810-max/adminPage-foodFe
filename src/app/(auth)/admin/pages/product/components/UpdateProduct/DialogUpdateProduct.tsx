import React from "react";
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
import { IProductSub } from "@/types/common";
import useProduct from "@/hook/useProduct";
import { DialogUpdateProps } from "../../types/common";

const DialogUpdateProduct: React.FC<DialogUpdateProps> = ({ id }) => {
  const { dataProduct } = useProduct();
  const [dataCurrProduct, setDataCurrProduct] = React.useState<IProductSub[]>(
    []
  );

  const handleUpdateForm = () => {
    const updatedData =
      dataProduct?.products.filter((data) => data.id === id) || [];
    setDataCurrProduct(updatedData);
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
