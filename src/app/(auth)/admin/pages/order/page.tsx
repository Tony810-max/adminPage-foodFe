"use client";
import React from "react";
import DataTableOrder from "./components/DataTableOrder";
import TabOrder from "./components/TabOrder";
import OrderProvider from "@/context/orderContext";

const OrderPage = () => {
  return (
    <div className="space-y-4">
      <OrderProvider>
        <TabOrder />
        <DataTableOrder />
      </OrderProvider>
    </div>
  );
};

export default OrderPage;
