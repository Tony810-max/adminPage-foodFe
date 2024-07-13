"use client";
import { API_URL, IUsers } from "@/types/common";
import axios from "axios";
import React from "react";

interface IUser {
  users: IUsers | null | undefined;
  fetchUser: () => void;
  setActive: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export const UserContext = React.createContext<IUser>({
  users: null,
  fetchUser: () => {},
  setActive: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = React.useState<IUsers>();
  const [active, setActive] = React.useState<boolean | undefined>(true);
  const fetchUser = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/user?isActive=${active}`,
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
  }, [active]);

  const context = React.useMemo(() => {
    return {
      users,
      fetchUser,
      setActive,
    };
  }, [users, fetchUser]);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
