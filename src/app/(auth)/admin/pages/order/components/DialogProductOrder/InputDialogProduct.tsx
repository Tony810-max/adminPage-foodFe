import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

interface inputDialogProps {
  index: number;
  title: string;
  image: string;
  quantity: number;
}

const InputDialogProduct: React.FC<inputDialogProps> = ({
  index,
  title,
  image,
  quantity,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Name Product {index}
          </Label>
          <Input
            id="name"
            value={title}
            defaultValue="Pedro Duarte"
            className="col-span-3"
            disabled
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">
            Quantity
          </Label>
          <Input
            id="name"
            value={quantity}
            defaultValue="Pedro Duarte"
            className="col-span-3"
            disabled
          />
        </div>
      </div>
      <div className="relative w-14 h-14">
        <Image src={image} alt="" className="" fill unoptimized priority />
      </div>
    </div>
  );
};

export default InputDialogProduct;
