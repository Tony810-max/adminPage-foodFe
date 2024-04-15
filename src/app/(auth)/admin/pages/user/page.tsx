"use client";
import React from "react";
import TableUser from "./components/TableUser";
const UserPage = () => {
  return (
    <div className="space-y-3">
      <span className="font-sans text-xl font-bold capitalize">Manager information User</span>
      <TableUser />
    </div>
  );
};

export default UserPage;
