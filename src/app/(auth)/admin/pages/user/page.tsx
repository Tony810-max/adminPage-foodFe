"use client";
import React from "react";
import DataTableUser from "./components/DataTableUser";
import TabUser from "./components/TabUser";
import { UserProvider } from "@/context/userContext";
import DataTableUserDelete from "./components/DataTableUserDelete";
import DataTableAdmin from "./components/DataTableAdmin";
import SearchUser from "./components/SearchUser";

const UserPage = () => {
  const [tabCurr, setTabCurr] = React.useState("actived");
  const [tabAdmin, setTabAdmin] = React.useState("");

  return (
    <div className="space-y-4">
      <UserProvider>
        <div className="flex justify-between items-center">
          <TabUser
            onSetTabCurr={setTabCurr}
            tabCurr={tabCurr}
            onSetTabAdmin={setTabAdmin}
            tabAdmin={tabAdmin}
          />
          <SearchUser />
        </div>
        {tabAdmin === "list user deleted" ||
        tabAdmin === "administrator list" ? (
          <>
            {tabAdmin === "list user deleted" ? (
              <DataTableUserDelete />
            ) : (
              <DataTableAdmin />
            )}
          </>
        ) : (
          <DataTableUser tabCurr={tabCurr} />
        )}
      </UserProvider>
    </div>
  );
};

export default UserPage;
