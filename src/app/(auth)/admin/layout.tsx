import SidebarAdmin from "@/components/SidebarAdmin";
import Header from "@/components/layouts/Header";
import React from "react";
const layoutAdmin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex gap-10 min-h-screen pr-4">
      <SidebarAdmin />

      <div className="flex flex-col w-full h-full ">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layoutAdmin;
