"use client";
import React from "react";

import { useAdmin } from "@/hook/useAdmin";
import TableDataAdmin from "./components/TableData";
import TabAdmin from "./components/TabAdmin";
import SearchAdmin from "./components/SearchAdmin";
import SelectStatusAdmin from "./components/SelectStatusAdmin";
import CreateAdmin from "./components/CreateAdmin";

const ListAdminPage = () => {
  const { dataAdmin, setTab, tab, setSearchValue, fetchAdmin } = useAdmin();
  const data = dataAdmin?.users;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TabAdmin onSetTab={setTab} tab={tab} />
          <SelectStatusAdmin onSetTab={setTab} />
          <CreateAdmin fetchAdmin={fetchAdmin} />
        </div>
        <SearchAdmin onSetSearch={setSearchValue} />
      </div>
      <TableDataAdmin dataAdmin={data} />
    </div>
  );
};

export default ListAdminPage;
