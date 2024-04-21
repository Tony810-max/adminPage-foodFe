"use client";
import { Button } from "@/components/ui/button";
import useProduct from "@/hook/useProduct";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";

const ProductPage = () => {
  const [idProduct, setIdProduct] = useState<number>();
  const { dataProduct, handleDeleteProduct } = useProduct();
  return (
    <div>
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border-collapse border border-slate-400 py-4">id</th>
            <th className="border-collapse border border-slate-400 py-4">
              title
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              category
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              description
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              price
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              image
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              CreateAt
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              UpdateAt
            </th>
            <th className="border-collapse border border-slate-400 py-4">
              Delete - Update
            </th>
          </tr>
        </thead>
        <tbody>
          {dataProduct?.map((item) => (
            <tr key={item?.id}>
              <td className="border-collapse border border-slate-400 text-center">
                {item?.id}
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center">
                {item?.title}
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center">
                {item?.category_title}
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center">
                {item?.description}
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center">
                {item?.price}
              </td>
              <td className="py-4 relative border-collapse border border-slate-400 text-center">
                <Image
                  src={item.images[0]}
                  alt="image Product"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center">
                {format(new Date(item?.createdAt), "yyyy-MM-dd hh:mm:ss")}
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center">
                {format(new Date(item?.updatedAt), "yyyy-MM-dd hh:mm:ss")}
              </td>
              <td className="py-4 border-collapse border border-slate-400 text-center space-x-3">
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteProduct(item?.id)}
                >
                  Delete
                </Button>
                <Button variant={"outline"}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
