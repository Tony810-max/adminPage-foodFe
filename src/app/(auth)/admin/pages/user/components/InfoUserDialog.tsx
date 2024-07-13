import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInfoUser from "./FormInfoUser";
import { IInfoUser } from "../types/common";
import { Badge } from "@/components/ui/badge";

const InfoUserDialog: React.FC<IInfoUser> = ({ user }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-sans text-sm capitalize">
          View detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex-row items-center justify-between px-4">
          <DialogTitle className="font-sans text-base capitalize">
            detail user
          </DialogTitle>
          {user?.isActice ? (
            <Badge className="bg-green-600 py-1 px-4 font-sans text-sm capitalize">
              actived
            </Badge>
          ) : (
            <Badge className="bg-red-600 py-1 px-4 font-sans text-sm capitalize">
              not actived
            </Badge>
          )}
        </DialogHeader>
        <FormInfoUser user={user} />
      </DialogContent>
    </Dialog>
  );
};

export default InfoUserDialog;
