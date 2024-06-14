import React from "react";
import CardInfoAdmin from "./components/CardInfoAdmin";

const AdminPage = () => {
  return (
    <div className="space-y-4">
      <span>Dashboard </span>
      <div className="grid grid-cols-4 gap-4">
        <CardInfoAdmin />
        <CardInfoAdmin />
        <CardInfoAdmin />
        <CardInfoAdmin />
      </div>
    </div>
  );
};

export default AdminPage;
