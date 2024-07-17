"use client";
import React from "react";
import DataTableOrder from "./components/DataTableOrder";
import TabOrder from "./components/TabOrder";
import OrderProvider from "@/context/orderContext";
import SearchOrder from "./components/SearchOrder";
import SelectTab from "./components/SelectTab";

const OrderPage = () => {
  return (
    <div className="space-y-4">
      <OrderProvider>
        <div className="flex gap-1 items-center justify-between">
          <TabOrder />
          <SelectTab />
          <SearchOrder />
        </div>
        <DataTableOrder />
      </OrderProvider>
    </div>
  );
};

export default OrderPage;
