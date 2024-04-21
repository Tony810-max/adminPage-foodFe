import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";

type sidebarItem = {
  name: string;
  to: string;
  id: number;
  icon: JSX.Element;
};

interface ReduceSidebarAdmin {
  data: sidebarItem[];
  idFocus: number;
  onSetIdFocus: (value: number) => void;
}

const ReduceSidebarAdmin: React.FC<ReduceSidebarAdmin> = ({
  data,
  idFocus,
  onSetIdFocus,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 min-w-3">
      {data?.map((item) => (
        <Link
          href={item?.to}
          key={item?.id}
          // variants={itemVariants}
        >
          <Button
            variant={"outline"}
            className={cn("w-full flex justify-between ", {
              "bg-orange-500 text-white": idFocus === item?.id,
            })}
            onClick={() => onSetIdFocus(item?.id)}
          >
            {item?.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default ReduceSidebarAdmin;
