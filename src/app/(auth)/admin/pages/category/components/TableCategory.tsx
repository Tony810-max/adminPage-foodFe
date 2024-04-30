import { Button } from "@/components/ui/button";

import { useCategory } from "@/hook/useCategory";
import { format } from "date-fns";
import React from "react";
import DialogUpdateCategory from "./DialogUpdateCategory";

const TableCategory = () => {
  const { dataCategory, handleDeleteCategory } = useCategory();
  return (
    <table className="w-full border-collapse border border-slate-400">
      <thead>
        <tr>
          <th className="border border-slate-300 py-4">id</th>
          <th className="border border-slate-300 py-4">title</th>
          <th className="border border-slate-300 py-4">description</th>
          <th className="border border-slate-300 py-4">Create Day</th>
          <th className="border border-slate-300 py-4">Update Day</th>
          <th className="border border-slate-300 py-4">Delete - Update</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {dataCategory?.map((item) => (
          <tr key={item?.id}>
            <td className="py-4 border border-slate-300 text-center">
              {item?.id}
            </td>
            <td className="py-4 border border-slate-300 text-center">
              {item?.title}
            </td>
            <td className="py-4 border border-slate-300 text-center">
              {item?.description}
            </td>
            <td className="py-4 border border-slate-300 text-center">
              {format(new Date(item?.createdAt), "yyyy-MM-dd hh:mm:ss")}
            </td>
            <td className="py-4 border border-slate-300 text-center">
              {format(new Date(item?.updatedAt), "yyyy-MM-dd hh:mm:ss")}
            </td>
            <td className="py-4 border border-slate-300 text-center space-x-2">
              <Button
                variant={"destructive"}
                onClick={() => handleDeleteCategory(item?.id)}
                className="font-sans text-base"
              >
                Delete
              </Button>
              <DialogUpdateCategory
                id={item?.id}
                tittleDefault={item?.title}
                desDefault={item?.description}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCategory;
