"use client";
import React from "react";
import DataTableUser from "./components/DataTableUser";
import TabUser from "./components/TabUser";
import { UserProvider } from "@/context/userContext";
import DataTableUserDelete from "./components/DataTableUserDelete";
import DataTableAdmin from "./components/DataTableAdmin";
import SearchUser from "./components/SearchUser";

const UserPage = () => {
  const [tabCurr, setTabCurr] = React.useState("user actived");
  const [tabAdmin, setTabAdmin] = React.useState("");
  const [activeDelte, setActiveDelete] = React.useState(true);

  return (
    <div className="space-y-4">
      <UserProvider>
        <div className="flex justify-between items-center">
          <TabUser
            onSetTabCurr={setTabCurr}
            tabCurr={tabCurr}
            onSetTabAdmin={setTabAdmin}
            tabAdmin={tabAdmin}
            onSetActiveDelete={setActiveDelete}
          />
          <SearchUser />
        </div>
        {tabAdmin === "user delete actived" ||
        tabAdmin === "user delete not actived" ? (
          <DataTableUserDelete activeDelte={activeDelte} />
        ) : (
          <DataTableAdmin />
        )}
        {(tabCurr === "user actived" || tabCurr === "user not actived") && (
          <DataTableUser tabCurr={tabCurr} />
        )}
      </UserProvider>
    </div>
  );
};

export default UserPage;
