import { Button } from "@/components/ui/button";

import { useCategory } from "@/hook/useCategory";
import { format } from "date-fns";
import React from "react";
import DialogUpdateCategory from "./DialogUpdateCategory";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

const TableCategory = () => {
  const { dataCategory, handleDeleteCategory } = useCategory();
  return (
    <div className="max-w-[36rem]  border-none overflow-x-scroll">
      {/* <table className="border-collapse border border-slate-400 ">
        <thead>
          <tr>
            <th className="min-w-20 border border-slate-300 py-4">id</th>
            <th className="min-w-40 border border-slate-300 py-4">title</th>
            <th className="min-w-[250px] border border-slate-300 py-4">
              description
            </th>
            <th className="min-w-32 border border-slate-300 py-4">
              Create Day
            </th>
            <th className="min-w-32 border border-slate-300 py-4">
              Update Day
            </th>
            <th className=" min-w-[250px] border border-slate-300 py-4">
              Delete - Update
            </th>
          </tr>
        </thead>
        <tbody className="">
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
      </table> */}
      <Table className="min-w-[54rem]">
        <TableCaption>A list of your user.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="min-w-28 text-center">Title</TableHead>
            <TableHead className="min-w-4">Description</TableHead>
            <TableHead className="font-sans text-center">Create Day</TableHead>
            <TableHead className="font-sans text-center">Update Day</TableHead>
            <TableHead className="font-sans text-center">Delete - Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {dataCategory?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell className="text-center">{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">
                {format(new Date(item?.createdAt), "yyyy-MM-dd hh:mm:ss")}
              </TableCell>
              <TableCell className="text-right">
                {format(new Date(item?.updatedAt), "yyyy-MM-dd hh:mm:ss")}
              </TableCell>
              <TableCell className="flex gap-4 sticky">
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteCategory(item?.id)}
                >
                  <Trash2 size={18} />
                </Button>
                <DialogUpdateCategory
                  id={item?.id}
                  tittleDefault={item?.title}
                  desDefault={item?.description}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCategory;
