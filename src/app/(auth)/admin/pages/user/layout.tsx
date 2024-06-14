"use client";
import { ROUTERS } from "@/types/routers";
import React from "react";
import TabUser from "./components/TabUser";

const LayoutUser = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [selectTabUser, setSelectTabUser] = React.useState<
    string | undefined
  >();

  console.log(selectTabUser);

  React.useEffect(() => {
    const savedTabUser = localStorage.getItem("selectTabUser");
    if (savedTabUser) {
      setSelectTabUser(savedTabUser);
    }
  },[]);

  return (
    <div className="space-y-4">
      <span className="font-sans text-xl font-bold capitalize">
        Manager information User
      </span>
      <div className="space-x-2">
        <TabUser
          href={ROUTERS.USER}
          title="user"
          selectTabUser={selectTabUser}
          setSelectTabUser={setSelectTabUser}
        />
        <TabUser
          href={ROUTERS.ROLEUSER}
          title="role"
          selectTabUser={selectTabUser}
          setSelectTabUser={setSelectTabUser}
        />
        <TabUser
          href={ROUTERS.DELETEUSER}
          title="Deleted"
          selectTabUser={selectTabUser}
          setSelectTabUser={setSelectTabUser}
        />
        <TabUser
          href={ROUTERS.DELETEUSER}
          title="Deleted"
          selectTabUser={selectTabUser}
          setSelectTabUser={setSelectTabUser}
        />
      </div>
      {children}
    </div>
  );
};

export default LayoutUser;
