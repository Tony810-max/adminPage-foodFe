"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
type sidebarItem = {
  name: string;
  to: string;
  id: number;
  icon: JSX.Element;
};

interface originSidebarAdmin {
  data: sidebarItem[];
  valueParam: string;
  onSetValueParam: (value: string) => void;
  opened: boolean;
}

const OriginSidebarAdmin: React.FC<originSidebarAdmin> = ({
  data,
  onSetValueParam,
  valueParam,
  opened,
}) => {
  return (
    <motion.div
      className=" flex flex-col gap-2 overflow-hidden"
      animate={{ width: opened ? "100%" : "0" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ width: !opened ? "0" : "100%" }}
    >
      {data?.map((item) => (
        <Link href={`${item?.to}?page=1`} key={item?.id}>
          <Button
            variant={"outline"}
            className={cn(
              "w-full flex gap-3 justify-between hover:hover:bg-orange-500 hover:text-white",
              {
                "bg-orange-500 text-white": valueParam === item?.name,
              }
            )}
            onClick={() => {
              onSetValueParam(item?.name);
              localStorage.setItem("selectedItem", item?.name);
            }}
          >
            {item?.icon}
            <span className="font-sans text-base capitalize">{item?.name}</span>
          </Button>
        </Link>
      ))}
    </motion.div>
  );
};

export default OriginSidebarAdmin;
