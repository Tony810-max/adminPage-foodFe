"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUser } from "@/types/common";

import { ROUTERS } from "@/types/routers";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<IUser>();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      const userStorage = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
      setUser(userStorage);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <div className="flex justify-end items-center gap-1 w-full">
      <span className="font-sans text-lg font-semibold capitalize">
        Welcome back,{" "}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex items-center">
          <Button
            variant="outline"
            className="capitalize font-sans text-lg font-semibold"
          >
            {user?.firstName} {user?.lastName}
            <ChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup>
            <DropdownMenuRadioItem value="top">
              <Link
                href={ROUTERS.PROFILE}
                className="cursor-pointer text-base font-sans font-semibold"
              >
                Profile
              </Link>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="bottom"
              className="cursor-pointer text-base font-sans font-semibold"
              onClick={handleLogout}
            >
              Logout
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
