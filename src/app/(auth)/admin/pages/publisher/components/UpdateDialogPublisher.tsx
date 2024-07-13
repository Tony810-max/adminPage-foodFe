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
import EditDialogPublisher from "./EditDialogPublisher";
import { IUpdate } from "../types/common";


const UpdateDialogPublisher: React.FC<IUpdate> = ({
  name,
  value,
  idPublisher,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil
          color="red"
          size={"20"}
          className="hover:cursor-pointer hover:opacity-70"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit publisher</DialogTitle>
          <DialogDescription>
            Make changes to your publisher here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditDialogPublisher
          name={name}
          value={value}
          idPublisher={idPublisher}
          onsetOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialogPublisher;
