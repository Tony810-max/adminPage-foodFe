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
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import ModaUpdateCategory from "./ModaUpdateCategory";

interface dialogUpdateProps {
  id: number;
  tittleDefault: string;
  desDefault: string;
}

const DialogUpdateCategory: React.FC<dialogUpdateProps> = ({
  id,
  desDefault,
  tittleDefault,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-sans text-base">
          <Pen size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <ModaUpdateCategory
          id={id}
          tittleDefault={tittleDefault}
          desDefault={desDefault}
          onSetOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateCategory;
