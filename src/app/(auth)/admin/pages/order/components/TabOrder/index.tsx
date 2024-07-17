import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { DATA_TAB } from "../../types/constant";
import { OderContext } from "@/context/orderContext";

const TabOrder = () => {
  const context = React.useContext(OderContext);
  const tabCurr = context.tabCurr;
  const onSetTabCurr = context.setTabCurr;

  return (
    <div className="hidden lg:block">
      {DATA_TAB?.map((tab) => (
        <Button
          key={tab}
          variant={"ghost"}
          className={cn("font-sans text-sm capitalize", {
            "bg-red-600 text-white": tabCurr === tab,
          })}
          onClick={() => {
            onSetTabCurr(tab);
          }}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};

export default TabOrder;
