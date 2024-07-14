import { LucideIcon } from "lucide-react";
import React from "react";

interface ICard {
  value: string | number | null | undefined;
  title: string;
  Icon: LucideIcon;
  className?: string;
}

const CardInfoAdmin: React.FC<ICard> = ({ title, value, Icon, className }) => {
  return (
    <div
      className={`flex items-center justify-between border rounded-lg py-4 px-3 shadow-lg  ${className}`}
    >
      <div className="flex flex-col gap-1">
        <span className="font-sans text-lg font-bold">{value}</span>
        <span className="font-sans text-sm text-wrap max-w-32">{title}</span>
      </div>
      <Icon size={24} />
    </div>
  );
};

export default CardInfoAdmin;
