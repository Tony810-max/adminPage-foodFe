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

interface ISelect {
  tabCurr: string;
  onSetTabCurr: React.Dispatch<React.SetStateAction<string>>;
}

const SelectUser: React.FC<ISelect> = ({ tabCurr, onSetTabCurr }) => {
  return (
    <Select
      onValueChange={(value) => onSetTabCurr(value)}
      defaultValue="user actived"
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="font-sans text-sm capitalize">
            user
          </SelectLabel>
          {DATA_TAB?.map((tab) => (
            <SelectItem
              value={tab.name}
              key={tab.name}
              className="font-sans text-sm capitalize"
            >
              {tab.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectUser;
