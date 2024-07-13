import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

interface inputDialogProps {
  title: string;
  image: string;
  quantity: number;
  stock: number;
}

const InputDialogProduct: React.FC<inputDialogProps> = ({
  title,
  image,
  quantity,
  stock,
}) => {
  return (
    <div className="space-y-4 grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2 justify-between row-span-2 h-full">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Name Product
          </Label>
          <Input id="name" value={title} className="col-span-3" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Quantity
          </Label>
          <Input id="name" value={quantity} className="col-span-3" disabled />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Stock
          </Label>
          <Input id="name" value={stock} className="col-span-3" disabled />
        </div>
      </div>
      <div className="relative w-full h-full row-span-2">
        <Image src={image} alt="imgProductOrder" fill unoptimized priority />
      </div>
    </div>
  );
};

export default InputDialogProduct;
