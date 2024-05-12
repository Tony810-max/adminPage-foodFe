import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/hook/useOrder";

interface dialogProps {
  id: number;
}

const DialogOrder: React.FC<dialogProps> = ({ id }) => {
  const { updateStatusOrder, setStatus } = useOrder();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Status</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit status</DialogTitle>
          <DialogDescription>
            Make changes to your status here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <Select onValueChange={(status) => setStatus(status)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter onClick={() => updateStatusOrder(id)}>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOrder;
