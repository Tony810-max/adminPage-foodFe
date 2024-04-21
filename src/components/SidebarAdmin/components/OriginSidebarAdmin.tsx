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

interface originSidebarAdmin {
  data: sidebarItem[];
  idFocus: number;
  onSetIdFocus: (value: number) => void;
}

const OriginSidebarAdmin: React.FC<originSidebarAdmin> = ({
  data,
  idFocus,
  onSetIdFocus,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => (
        <Link href={item?.to} key={item?.id}>
          <Button
            variant={"outline"}
            className={cn("w-full flex gap-3 justify-between ", {
              "bg-orange-500 text-white": idFocus === item?.id,
            })}
            onClick={() => onSetIdFocus(item?.id)}
          >
            {item?.icon}
            <span className="font-sans text-base capitalize">{item?.name}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default OriginSidebarAdmin;
