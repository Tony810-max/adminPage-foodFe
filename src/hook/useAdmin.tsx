import { API_URL, IUsers } from "@/types/common";
import axios from "axios";
import React from "react";

export const useAdmin = () => {
  const [dataAdmin, setDataAdmin] = React.useState<IUsers>();

  const fetchAdmin = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(`${API_URL}/api/v1/user/admins`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        setDataAdmin(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAdmin();
  }, []);

  return {
    dataAdmin,
    fetchAdmin,
  };
};

