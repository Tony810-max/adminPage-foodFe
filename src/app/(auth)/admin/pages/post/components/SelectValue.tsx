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
import { DATA_TAB } from "../types/constant";

interface ISelectChild {
  onSetTab: (value: string) => void;
}

const SelectChild: React.FC<ISelectChild> = ({ onSetTab }) => {
  return (
    <Select onValueChange={(value) => onSetTab(value)} defaultValue="test">
      <SelectTrigger className="w-[180px] capitalize font-semibold  sm:hidden">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {DATA_TAB?.map((tab) => (
            <SelectItem value={tab.value} key={tab.title}>
              {tab.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectChild;
