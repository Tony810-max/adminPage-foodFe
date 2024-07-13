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
import FormEditAuthor from "./FormEditAuthor";
import { IDialogAuthor } from "../types/common";

const EditDialogAuthor: React.FC<IDialogAuthor> = ({ idAuthor }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="text-center w-full">
        <Pencil
          color="orange"
          size={"18"}
          className="hover:cursor-pointer hover:opacity-70 "
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-sans text-base capitalize">
            Edit author
          </DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <FormEditAuthor idAuthor={idAuthor} onSetOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogAuthor;
