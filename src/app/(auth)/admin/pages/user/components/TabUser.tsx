import React from "react";
import { cn } from "@/lib/utils"; // Giả sử 'cn' là hàm để kết hợp các class
import { Button } from "@/components/ui/button";
import { DATA_TAB, DATA_TAB_ADMIN } from "../types/constant";
import { UserContext } from "@/context/userContext";

interface ITab {
  tabCurr: string;
  tabAdmin: string;
  onSetTabCurr: (value: string) => void;
  onSetTabAdmin: (value: string) => void;
}

const TabUser: React.FC<ITab> = ({
  onSetTabCurr,
  tabCurr,
  onSetTabAdmin,
  tabAdmin,
}) => {
  const active = React.useContext(UserContext);
  const onSetActive = active?.setActive;

  const handleTabClick = (tabName: string) => {
    if (DATA_TAB.find((tab) => tab.name === tabName)) {
      onSetTabCurr(tabName);
      onSetTabAdmin(tabName);
      onSetActive?.(DATA_TAB.find((tab) => tab.name === tabName)?.value);
    } else if (DATA_TAB_ADMIN.includes(tabName)) {
      onSetTabAdmin(tabName);
      onSetTabCurr(tabName);
      onSetActive(true);
    }
  };

  return (
    <div className="space-x-2">
      {DATA_TAB?.map((tab) => (
        <Button
          key={tab.name}
          variant="outline"
          onClick={() => handleTabClick(tab.name)}
          className={cn("font-sans text-sm capitalize", {
            "bg-red-600 text-white": tab.name === tabCurr,
          })}
        >
          {tab.name}
        </Button>
      ))}
      {DATA_TAB_ADMIN?.map((tabAdminCurr) => (
        <Button
          key={tabAdminCurr}
          variant="outline"
          onClick={() => handleTabClick(tabAdminCurr)}
          className={cn("font-sans text-sm capitalize", {
            "bg-red-600 text-white": tabAdminCurr === tabAdmin,
          })}
        >
          {tabAdminCurr}
        </Button>
      ))}
    </div>
  );
};

export default TabUser;
