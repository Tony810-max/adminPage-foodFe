import { API_URL, IUsers } from "@/types/common";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";

export const useAdmin = () => {
  const [dataAdmin, setDataAdmin] = React.useState<IUsers>();
  const [tab, setTab] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const search = useSearchParams();
  const page = search.get("page");

  const fetchAdmin = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(
        `${API_URL}/api/v1/user/admins?isActive=${tab}&page=${page}&limit=5&search=${searchValue}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        setDataAdmin(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAdmin();
  }, [searchValue, page, tab]);

  return {
    dataAdmin,
    fetchAdmin,
    tab,
    setTab,
    setSearchValue,
  };
};
