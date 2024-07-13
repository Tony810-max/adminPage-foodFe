import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ILabelInput {
  title: string;
  value: string;
}

const LabelInput: React.FC<ILabelInput> = ({ title, value }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="text-left font-sans text-base capitalize">
        {title}
      </Label>
      <Input
        defaultValue={value}
        className="col-span-3 font-sans text-base capitalize"
        disabled
      />
    </div>
  );
};

export default LabelInput;
