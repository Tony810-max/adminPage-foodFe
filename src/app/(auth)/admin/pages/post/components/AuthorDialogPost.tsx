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
import { IUser } from "@/types/common";
import InfoAuthorDialog from "./InfoAuthorDialog";

export interface IAuthorDialog {
  data: IUser;
}

const AuthorDialogPost: React.FC<IAuthorDialog> = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-sans text-base capitalize">
          view detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <InfoAuthorDialog data={data} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthorDialogPost;
