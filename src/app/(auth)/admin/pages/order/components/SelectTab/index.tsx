import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DATA_TAB } from "../../types/constant";
import { OderContext } from "@/context/orderContext";

const SelectTab = () => {
  const context = React.useContext(OderContext);
  const onSetTabCurr = context.setTabCurr;

  return (
    <Select
      onValueChange={(value) => onSetTabCurr(value)}
      defaultValue="processing"
    >
      <SelectTrigger className="w-28 capitalize lg:hidden">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {DATA_TAB?.map((tab) => (
            <SelectItem value={tab} key={tab} className="font-sans capitalize">
              {tab}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTab;
