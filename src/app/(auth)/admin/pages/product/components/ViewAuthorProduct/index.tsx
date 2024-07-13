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
import ModalViewAuthorProduct from "./ModalViewAuthorProduct";
import { IViewDetail } from "../../types/common";

const ViewAuthorProduct: React.FC<IViewDetail> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-sans text-sm capitalize">
          view detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>view detail author</DialogTitle>
          <DialogDescription>this is detail author product</DialogDescription>
        </DialogHeader>
        <ModalViewAuthorProduct data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default ViewAuthorProduct;
