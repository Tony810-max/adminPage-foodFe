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
import FormAddCategory from "./FormAddCategory";
import { CategoryContext } from "@/context/categoryContex";

const AddCategoryDialog = () => {
  const [open, setOpen] = React.useState(false);
  const context = React.useContext(CategoryContext);
  const fetchCategory = context?.fetchCategory;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="font-sans text-sm capitalize"
        >
          add category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a category</DialogTitle>
          <DialogDescription>
            Make changes to category. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <FormAddCategory onSetOpen={setOpen} fetchCategory={fetchCategory} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
