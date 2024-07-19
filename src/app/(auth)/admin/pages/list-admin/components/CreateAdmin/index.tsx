import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormCreateAdmin from "./FormCreateAdmin";

interface ICreateAdmin {
  fetchAdmin: () => {};
}

const CreateAdmin: React.FC<ICreateAdmin> = ({ fetchAdmin }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
        </DialogHeader>
        <FormCreateAdmin onSetOpen={setOpen} fetchAdmin={fetchAdmin} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdmin;
