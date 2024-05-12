"use client";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useOrder } from "@/hook/useOrder";
import { Ban, CircleCheckBig, Loader, Truck } from "lucide-react";
import React from "react";

import StatusOrder from "./components/StatusOrder";
import DialogOrder from "./components/DialogOrder";

import DialogProductOrder from "./components/DialogProductOrder";

const OrderPage = () => {
  const { dataOrder, cancelOrder } = useOrder();

  const renderStatus = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <StatusOrder
            Icon={Loader}
            value="processing"
            variant="secondary"
            className="bg-slate-500 text-white"
          />
        );
      case "shipped":
        return (
          <StatusOrder
            Icon={Truck}
            value="shipped"
            variant="secondary"
            className="bg-[#fef08a]"
          />
        );
      case "delivered":
        return (
          <StatusOrder
            Icon={CircleCheckBig}
            value="shipped"
            variant="secondary"
            className="bg-[#bbf7d0]"
          />
        );
      case "cancelled":
        return (
          <StatusOrder
            Icon={Ban}
            value="cancelled"
            variant="destructive"
            className=""
          />
        );
    }
  };

  return (
    <Table className="w-full">
      <TableCaption>A list of your recent order.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Code Orders</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Product</TableHead>
          <TableHead className="text-center">Phone</TableHead>
          <TableHead className="text-center">Delivery Address </TableHead>
          <TableHead className="text-center"> Status</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataOrder &&
          dataOrder?.map((data) => (
            <TableRow key={data?.id}>
              <TableCell className="font-medium">{data?.id}</TableCell>
              <TableCell>
                {data?.user?.firstName} {data?.user?.lastName}
              </TableCell>
              <TableCell className="text-center">
                <DialogProductOrder id={data?.id} />
              </TableCell>
              <TableCell className="text-center">
                {data?.user?.phoneNumber}
              </TableCell>
              <TableCell className="text-center">
                {data?.shippingAddress?.address}
              </TableCell>
              <TableCell className="flex items-center justify-end">
                {renderStatus(data?.status)}
              </TableCell>
              <TableCell className=" space-x-4">
                <DialogOrder id={data?.id} />

                <Button
                  variant={"destructive"}
                  className="font-sans text-base"
                  onClick={() => cancelOrder(data?.id)}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default OrderPage;
