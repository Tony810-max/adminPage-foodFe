"use client";
import React from "react";
import { UserProvider } from "@/context/userContext";
import SearchUser from "./components/SearchUser";
import SelectUser from "./components/SelectUser";
import DataTableUser from "./components/DataTableUser";
import DataTableUserDelete from "./components/DataTableUserDelete";

const UserPage = () => {
  const [tabCurr, setTabCurr] = React.useState("user actived");

  const renderUser = () => {
    switch (tabCurr) {
      case "user actived": {
        return <DataTableUser tabCurr={tabCurr} />;
      }
      case "user not actived":
        return <DataTableUser tabCurr={tabCurr} />;
      case "user delete actived":
        return <DataTableUserDelete tabCurr={tabCurr} />;
      case "user delete not actived":
        return <DataTableUserDelete tabCurr={tabCurr} />;
      default:
        <div>not found</div>;
        break;
    }
  };

  return (
    <div className="space-y-4">
      <UserProvider>
        <div className="flex justify-between items-center">
          <SelectUser tabCurr={tabCurr} onSetTabCurr={setTabCurr} />

          <SearchUser tabCurr={tabCurr} />
        </div>
        {renderUser()}
      </UserProvider>
    </div>
  );
};

export default UserPage;
