"use client";
import { API_URL, IUsers } from "@/types/common";
import axios from "axios";
import React from "react";

interface IUser {
  users: IUsers | null | undefined;
  fetchUser: () => void;
  setActive: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = React.createContext<IUser>({
  users: null,
  fetchUser: () => {},
  setActive: () => {},
  setSearchValue: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = React.useState<IUsers>();
  const [active, setActive] = React.useState<boolean | undefined>(true);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const fetchUser = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/user?isActive=${active}&search=${searchValue}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        setUsers(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, [active, searchValue]);

  const context = React.useMemo(() => {
    return {
      users,
      fetchUser,
      setActive,
      setSearchValue,
    };
  }, [users, fetchUser, setSearchValue]);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
