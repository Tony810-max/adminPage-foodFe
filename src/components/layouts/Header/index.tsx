"use client";
import SidebarAdmin from "@/components/SidebarAdmin";
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
import React from "react";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser>();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage?.getItem("user")!);
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.setItem("selectedItem", "Home");
    router.push("/login");
  };

  return (
    <div className="flex gap-2 justify-between items-center">
      <SidebarAdmin />

      <div className="flex justify-end items-center gap-1 w-full py-5">
        <span className="font-sans sm:text-lg font-semibold capitalize">
          Welcome back,
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex items-center">
            <Button
              variant="outline"
              className="capitalize font-sans text-sm sm:text-base font-semibold"
            >
              {user?.firstName} {user?.lastName}
              <ChevronDown size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="top">
                <Link
                  href={ROUTERS.CHANGEPASSWORD}
                  className="cursor-pointer text-base font-sans font-semibold"
                >
                  Change Password
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
    </div>
  );
};

export default Header;
