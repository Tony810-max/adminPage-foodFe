import { API_URL, IOrder } from "@/types/common";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

export const useOrder = () => {
  const [dataOrder, setDataOrder] = useState<IOrder[]>();
  const [status, setStatus] = useState<string>("");
  const fetchOrders = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(`${API_URL}/api/v1/orders`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response) {
        setDataOrder(response?.data?.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatusOrder = async (id: number) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.put(
        `${API_URL}/api/v1/orders/${id}`,
        {
          status: status,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Order updat  ed status successfully");
      }
    } catch (error) {
      const axiosErr = error as AxiosError<ErrorResponse>;

      if (axiosErr?.response?.status === 403) {
        toast.error("Access token is invalid");
        return;
      }
      if (axiosErr?.response?.status === 400) {
        const errorMessage =
          axiosErr.response?.data?.message ?? "An error occurred";
        return toast.error(errorMessage);
      }
    }
  };

  const cancelOrder = async (id: number) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.put(
        `${API_URL}/api/v1/orders/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Order cancelled");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    dataOrder,
    updateStatusOrder,
    setStatus,
    cancelOrder,
  };
};
