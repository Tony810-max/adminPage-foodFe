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
import { IViewDetail } from "../../types/common";
import ModalCategoryProduct from "./ModalCategoryProduct";

const ViewCategoryProduct: React.FC<IViewDetail> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-sans text-sm capitalize">
          view detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            This is a category product detail
          </DialogDescription>
        </DialogHeader>
        <ModalCategoryProduct data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewCategoryProduct;
