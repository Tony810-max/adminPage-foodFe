import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ILabelInput {
  name: string;
  value: string;
}

const LabelInputUser: React.FC<ILabelInput> = ({ name, value }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="font-sans text-base capitalize">{name}</Label>
      <Input
        defaultValue={value}
        className="col-span-3 font-sans text-base capitalize"
        disabled
      />
    </div>
  );
};

export default LabelInputUser;
