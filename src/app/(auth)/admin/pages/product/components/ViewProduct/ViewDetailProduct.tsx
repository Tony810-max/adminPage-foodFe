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
import ModalDetailProduct from "./ModalDetailProduct";
import { IViewDetail } from "../../types/common";

const ViewDetailProduct: React.FC<IViewDetail> = ({ data }) => {
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
            {`This is detail product ${data?.title}`}
          </DialogDescription>
        </DialogHeader>
        <ModalDetailProduct data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailProduct;
