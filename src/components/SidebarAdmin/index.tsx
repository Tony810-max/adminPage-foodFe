"use client";
import React from "react";

import {
  AlignJustify,
  ClipboardList,
  Factory,
  HomeIcon,
  Milestone,
  Package2,
  PackageCheck,
  SquareUserRound,
  User,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ContentSheet from "./components/ContentSheet";

export const DATA_SIDEBAR_ADMIN = [
  { name: "Home", value: "home", to: "/admin", id: 1, icon: <HomeIcon /> },
  {
    name: "Category",
    value: "category",
    to: "/admin/pages/category",
    id: 2,
    icon: <ClipboardList />,
  },
  {
    name: "Product",
    value: "product",
    to: "/admin/pages/product",
    id: 3,
    icon: <Package2 />,
  },
  {
    name: "Order",
    value: "order",
    to: "/admin/pages/order",
    id: 4,
    icon: <PackageCheck />,
  },
  { name: "User", to: "/admin/pages/user", id: 5, icon: <User /> },
  { name: "post - blog", to: "/admin/pages/post", id: 6, icon: <Milestone /> },
  { name: "publisher", to: "/admin/pages/publisher", id: 7, icon: <Factory /> },
  {
    name: "author",
    to: "/admin/pages/author",
    id: 8,
    icon: <SquareUserRound />,
  },
  {
    name: "list admin",
    to: "/admin/pages/list-admin",
    id: 9,
    icon: <SquareUserRound />,
  },
];

export default function SidebarAdmin() {
  const [valueParam, setValueParam] = React.useState<string>("Home");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const savedValueParam = localStorage.getItem("selectedItem");
    if (savedValueParam) {
      setValueParam(savedValueParam);
    }
  }, [valueParam]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <AlignJustify className="hover:cursor-pointer hover:opacity-70" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <div className="relative aspect-[4/2]">
            <Image
              src={"/images/logo.webp"}
              alt="logo"
              fill
              unoptimized
              priority
            />
          </div>
        </SheetHeader>
        <ContentSheet onSetOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
