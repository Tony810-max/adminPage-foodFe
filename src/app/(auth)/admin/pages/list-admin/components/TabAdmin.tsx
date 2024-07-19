import React from "react";
import { DATA_TAB_ADMIN } from "../constant/const";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ITabAdmin {
  onSetTab: (value: string) => void;
  tab?: string;
}

const TabAdmin: React.FC<ITabAdmin> = ({ onSetTab, tab }) => {
  return (
    <div className=" space-x-2 hidden sm:block">
      {DATA_TAB_ADMIN?.map((tabAdmin) => (
        <Button
          variant={"secondary"}
          className={cn("font-sans text-sm capitalize", {
            "bg-red-600 text-white": tab === tabAdmin.value,
          })}
          key={tabAdmin?.name}
          onClick={() => onSetTab(tabAdmin?.value)}
        >
          {tabAdmin?.name}
        </Button>
      ))}
    </div>
  );
};

export default TabAdmin;
