"use client";
import { API_URL, IUser } from "@/types/common";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        setDataUser(response.data.users);
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError?.response?.status === 403) {
        toast.error("Access token is invalid");
        return;
      }
      console.error(error);
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
