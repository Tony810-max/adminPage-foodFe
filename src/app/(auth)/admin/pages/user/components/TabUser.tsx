import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface tabUserProps {
  href: string;
  title: string;
  selectTabUser: string | undefined;
  setSelectTabUser: (value: string) => void;
}

const TabUser: React.FC<tabUserProps> = ({
  href,
  title,
  selectTabUser,
  setSelectTabUser,
}) => {
  const handleSelectTabUser = () => {
    setSelectTabUser(title);
    if (selectTabUser) {
      localStorage.setItem("selectTabUser", title);
    }
  };

  return (
    <Link
      href={href}
      className={cn(
        "font-sans text-base border py-2 px-8 hover:opacity-70 rounded-lg uppercase",
        {
          "bg-orange-500 text-white": title === selectTabUser,
        }
      )}
      onClick={handleSelectTabUser}
    >
      {title}
    </Link>
  );
};

export default TabUser;
