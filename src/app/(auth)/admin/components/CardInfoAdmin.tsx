import { UserPlus } from "lucide-react";
import React from "react";

const CardInfoAdmin = () => {
  let x = 100000;
  return (
    <div className="flex items-center justify-between border rounded-lg py-4 px-3 shadow-lg">
      <div className="flex flex-col gap-1">
        <span className="font-sans text-lg font-bold">
          {x.toLocaleString("it-IT")}
        </span>
        <span className="font-sans text-sm text-wrap">
          New users count per day
        </span>
      </div>
      <UserPlus size={24} />
    </div>
  );
};

export default CardInfoAdmin;
