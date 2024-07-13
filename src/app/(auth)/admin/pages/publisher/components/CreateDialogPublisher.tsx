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

import CreatePublisherFormDialog from "./CreatePublisherFormDialog";

const CreateDialogPublisher = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="font-sans text-base capitalize"
        >
          Create publisher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-sans text-base capitalize">
            Create publisher
          </DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <CreatePublisherFormDialog onSetOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialogPublisher;
