"use client";
import React from "react";

import { useAdmin } from "@/hook/useAdmin";
import TableDataAdmin from "./components/TableData";
import TabAdmin from "./components/TabAdmin";
import SearchAdmin from "./components/SearchAdmin";
import SelectStatusAdmin from "./components/SelectStatusAdmin";

const ListAdminPage = () => {
  const { dataAdmin, setTab, tab, setSearchValue } = useAdmin();
  const data = dataAdmin?.users;

  return (
    <div>
      <div className="flex items-center justify-between">
        <TabAdmin onSetTab={setTab} tab={tab} />
        <SelectStatusAdmin onSetTab={setTab} />
        <SearchAdmin onSetSearch={setSearchValue} />
      </div>
      <TableDataAdmin dataAdmin={data} />
    </div>
  );
};

export default ListAdminPage;
