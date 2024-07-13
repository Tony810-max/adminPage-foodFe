import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import FormUpdateStatus from "./DialogProductOrder/FormUpdateStatus";
import { IDialogUpdate } from "../types/common";

const UpdateDialogOrder: React.FC<IDialogUpdate> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil
          size={20}
          color="orange"
          className="hover:cursor-pointer hover:opacity-70"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit status</DialogTitle>
          <DialogDescription>
            Make changes to your status here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <FormUpdateStatus id={id} onSetOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialogOrder;
