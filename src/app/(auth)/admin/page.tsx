"use client";
import React from "react";
import CardAdmin from "./components/CardAdmin";
import { useUserChart } from "./hook/useUserChart";
import ChartNewUsersPerDay from "./components/ChartNewUsersPerDay";
import OrderProvider from "@/context/orderContext";
import ChartDailyRenevue from "./components/ChartDailyRenevue";
import ListUserNew from "./components/ListUserNew";
import ListAdminCurr from "./components/ListAdminCurr";
import { UserProvider } from "@/context/userContext";
import { useAdmin } from "@/hook/useAdmin";

const AdminPage = () => {
  const { userCount, setDay } = useUserChart();
  const { dataAdmin } = useAdmin();
  return (
    <div className="space-y-4">
      <OrderProvider>
        <span className="font-sans text-lg font-bold uppercase">Dashboard</span>
        <CardAdmin userCount={userCount} dataAdmin={dataAdmin} />
        <div className="md:grid grid-cols-4 gap-4">
          <ChartNewUsersPerDay onSetDay={setDay} userCount={userCount} />
          <ChartDailyRenevue />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <UserProvider>
            <ListUserNew />
          </UserProvider>
          <ListAdminCurr dataAdmin={dataAdmin} />
        </div>
      </OrderProvider>
    </div>
  );
};

export default AdminPage;
