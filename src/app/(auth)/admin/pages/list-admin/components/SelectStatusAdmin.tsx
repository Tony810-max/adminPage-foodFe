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
import { ITabAdmin } from "./TabAdmin";
import { DATA_TAB_ADMIN } from "../constant/const";

const SelectStatusAdmin: React.FC<ITabAdmin> = ({ onSetTab }) => {
  return (
    <Select onValueChange={(value) => onSetTab(value)}>
      <SelectTrigger className="w-[180px] capitalize font-semibold  sm:hidden">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {DATA_TAB_ADMIN?.map((tab) => (
            <SelectItem value={tab?.value}>{tab.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStatusAdmin;
