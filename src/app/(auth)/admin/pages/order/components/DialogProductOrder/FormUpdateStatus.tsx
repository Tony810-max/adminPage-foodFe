import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/types/common";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IUpdateOrder } from "../../types/common";
import { Button } from "@/components/ui/button";
import { OderContext } from "@/context/orderContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaOrder } from "../../types/orderSchema";

interface ErrorResponse {
  message: string;
}

const FormUpdateStatus: React.FC<IUpdateOrder> = ({ id, onSetOpen }) => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schemaOrder),
  });
  const [status, setStatus] = React.useState<string>();
  const context = React.useContext(OderContext);
  const fetchOrder = context.fetchOrders;

  const updateStatusOrder = async (data: { status: string }) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.put(
        `${API_URL}/api/v1/orders/${id}`,
        {
          status: data?.status,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Order updat  ed status successfully");
        onSetOpen(false);
        fetchOrder();
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
  return (
    <form onSubmit={handleSubmit(updateStatusOrder)}>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select {...field} onValueChange={field.onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      <div className="flex justify-end">
        <Button type="submit" variant={"destructive"}>
          Update Status
        </Button>
      </div>
    </form>
  );
};

export default FormUpdateStatus;
