"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import React from "react";
import TableCategory from "./components/TableCategory";
import ModalCategory from "./components/ModalCategory";
import { useCategory } from "@/hook/useCategory";

const CategoryPage = () => {
  const { fetchCategory } = useCategory();
  return (
    <div className="space-y-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"destructive"} className="">
            <p className="px-2 font-sans text-lg ">Add</p>
            <CirclePlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a category</DialogTitle>
            <DialogDescription>
              Make changes to category. Click save when you`re done.
            </DialogDescription>
          </DialogHeader>
          <ModalCategory />
        </DialogContent>
      </Dialog>
      
      <TableCategory />
    </div>
  );
};

export default CategoryPage;
