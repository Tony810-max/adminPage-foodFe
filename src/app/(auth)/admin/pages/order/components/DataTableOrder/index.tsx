import React from "react";
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

import { Ban, CircleCheckBig, Loader, Truck } from "lucide-react";
import DialogProductOrder from "../DialogProductOrder";
import StatusOrder from "../StatusOrder";
import { OderContext } from "@/context/orderContext";
import UpdateDialogOrder from "../DialogOrder";
import CancelOrder from "../CancelOrder";
import ShippingAdressOrder from "../ShippingAdressOrder";
import PaginationChild from "@/components/PaginationChild";
import { useSearchParams } from "next/navigation";

const DataTableOrder = () => {
  const context = React.useContext(OderContext);
  const dataOrder = context.dataOrder;
  const meta = dataOrder?.meta;
  const search = useSearchParams();
  const page = search.get("page");
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
    <>
      <Table className="w-full">
        <TableCaption>A list of your recent order.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Code Orders</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center font-sans text-sm">
              Product Order
            </TableHead>
            <TableHead className="text-center font-sans text-sm">
              Shipping Address
            </TableHead>
            <TableHead className="text-center font-sans text-sm">
              Status
            </TableHead>
            <TableHead className="text-center font-sans text-sm">
              Method Pay
            </TableHead>
            <TableHead className="text-center font-sans text-sm">
              Edit
            </TableHead>
            <TableHead className="text-center font-sans text-sm">
              Cancel Product
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataOrder?.orders?.map((data, index) => (
            <TableRow key={data?.id}>
              <TableCell className="text-center font-sans text-sm">
                {index + 1 + (Number(page) - 1) * 5}
              </TableCell>
              <TableCell>
                {data?.user?.firstName} {data?.user?.lastName}
              </TableCell>
              <TableCell className="text-center font-sans text-sm">
                <DialogProductOrder data={data?.products} />
              </TableCell>
              <TableCell>
                <ShippingAdressOrder data={data?.shippingAddress} />
              </TableCell>
              <TableCell className="flex items-center justify-end">
                {renderStatus(data?.status)}
              </TableCell>
              <TableCell className="text-center font-sans text-sm capitalize font-semibold">
                {data?.type}
              </TableCell>

              <TableCell className=" space-x-4">
                <UpdateDialogOrder id={data?.id} />
              </TableCell>
              <TableCell>
                <CancelOrder id={data?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && meta?.totalPages > 1 && (
        <PaginationChild href="/admin/pages/order" metaComment={meta} />
      )}
    </>
  );
};

export default DataTableOrder;
