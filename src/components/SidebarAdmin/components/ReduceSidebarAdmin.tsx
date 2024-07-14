"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type sidebarItem = {
  name: string;
  to: string;
  id: number;
  icon: JSX.Element;
};

interface ReduceSidebarAdmin {
  data: sidebarItem[];
  valueParam: string;
  onSetValueParam: (value: string) => void;
}

const ReduceSidebarAdmin: React.FC<ReduceSidebarAdmin> = ({
  data,
  onSetValueParam,
  valueParam,
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-2 min-w-3">
      {data?.map((item) => (
        <Link href={item?.to} key={item?.id}>
          <Button
            variant={"outline"}
            className={cn(
              "w-full flex justify-between hover:hover:bg-orange-500 hover:text-white",
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
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ReduceSidebarAdmin;
