import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type sidebarItem = {
  id: number;
  href: string;
  Icon: JSX.Element;
  title: string;
};

interface ReduceSidebarAdmin {
  data: sidebarItem[];
  active: number;
  onSetActive: (value: number) => void;
}

const ReduceSidebarAdmin: React.FC<ReduceSidebarAdmin> = ({
  data,
  active,
  onSetActive,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {data?.map((item) => (
        <Link
          href={item?.href}
          key={item?.id}
          onClick={() => onSetActive(item?.id)}
        >
          <Button
            variant={"outline"}
            className={cn("w-full flex justify-between ", {
              "bg-red-400 text-white": active === item?.id,
            })}
          >
            {item?.Icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ReduceSidebarAdmin;
