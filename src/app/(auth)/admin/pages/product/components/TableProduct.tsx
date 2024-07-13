"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DialogUpdateProduct from "./UpdateProduct/DialogUpdateProduct";
import { ProductContext } from "@/context/productContext";
import ViewDetailProduct from "./ViewProduct/ViewDetailProduct";
import DeleteAlertProduct from "./DeleteProduct.tsx/DeleteAlertProduct";
import ViewAuthorProduct from "./ViewAuthorProduct";
import ViewCategoryProduct from "./ViewCategoryProduct";
import ViewPublisher from "./ViewPublisher";

const TableProduct = () => {
  const context = React.useContext(ProductContext);
  const dataProduct = context?.dataProduct;

  return (
    <Table>
      <TableCaption>A list of your product.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] font-sans text-center text-sm">
            #
          </TableHead>
          <TableHead className="font-sans text-center text-sm capitalize">
            title
          </TableHead>
          <TableHead className="font-sans text-center text-sm capitalize">
            category
          </TableHead>
          <TableHead className="font-sans text-center text-sm capitalize">
            author
          </TableHead>
          <TableHead className="font-sans text-center text-sm capitalize">
            publisher
          </TableHead>
          <TableHead className="font-sans text-center text-sm capitalize">
            infomation product
          </TableHead>

          <TableHead className="font-sans text-center text-sm capitalize">
            edit product
          </TableHead>
          <TableHead className="font-sans text-center text-sm capitalize">
            delete product
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataProduct?.products?.map((product) => (
          <TableRow key={product?.id}>
            <TableCell className="font-sans text-center text-sm ">
              {product?.id}
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              {product?.title}
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              <ViewCategoryProduct data={product} />
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              <ViewAuthorProduct data={product} />
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              <ViewPublisher data={product} />
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              <ViewDetailProduct data={product} />
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              <DialogUpdateProduct id={product?.id} />
            </TableCell>
            <TableCell className="font-sans text-center text-sm capitalize">
              <DeleteAlertProduct id={product?.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableProduct;
