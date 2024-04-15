"use client";
import React, { useState } from "react";

import {
  AlignJustify,
  Layers3,
  LayoutDashboard,
  PackageSearch,
  User,
} from "lucide-react";

import { ROUTERS } from "@/types/routers";

import OriginSidebarAdmin from "./components/OriginSidebarAdmin";
import ReduceSidebarAdmin from "./components/ReduceSidebarAdmin";
import { cn } from "@/lib/utils";

const DATA_SIDEBAR_ADMIN = [
  {
    id: 1,
    title: "dashboard",
    href: ROUTERS.DASHBOARD,
    Icon: <LayoutDashboard />,
  },
  {
    id: 2,
    title: "product",
    href: ROUTERS.PRODUCT,
    Icon: <PackageSearch />,
  },
  {
    id: 3,
    title: "category",
    href: ROUTERS.CATEGORY,
    Icon: <Layers3 />,
  },
  {
    id: 4,
    title: "user",
    href: ROUTERS.USER,
    Icon: <User />,
  },
];

const SidebarAdmin = () => {
  const [active, setActive] = useState<number>(1);
  const [check, setCheck] = useState(false);

  return (
    <div
      className={cn("space-y-5 py-2 px-3 bg-slate-400 min-h-screen w-1/4", {
        "w-fit": check,
      })}
    >
      <div className="flex justify-between items-center gap-5">
        <span className="font-sans text-white text-lg uppercase font-bold">
          Admin
        </span>
        <AlignJustify
          color="white"
          onClick={() => setCheck(!check)}
          className="cursor-pointer hover:opacity-70"
        />
      </div>
      {!check ? (
        <OriginSidebarAdmin
          data={DATA_SIDEBAR_ADMIN}
          active={active}
          onSetActive={setActive}
        />
      ) : (
        <ReduceSidebarAdmin
          data={DATA_SIDEBAR_ADMIN}
          active={active}
          onSetActive={setActive}
        />
      )}
    </div>
  );
};

export default SidebarAdmin;
