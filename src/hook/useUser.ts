import { API_URL, IUser } from "@/types/common";
import axios from "axios";
import { useEffect, useState } from "react";

const useUser = () => {
  const [dataUser, setDataUser] = useState<IUser[]>();

  const fetchProduct = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken")
        ? JSON.parse(localStorage.getItem("accessToken")!)
        : null;
      if (!accessToken) return null;

      const response = await axios.get(`${API_URL}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        // console.log(response?.data);
        setDataUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return {
    dataUser,
    setDataUser,
  };
};

export default useUser;
