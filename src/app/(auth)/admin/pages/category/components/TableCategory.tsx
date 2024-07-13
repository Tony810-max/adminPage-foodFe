"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import DialogUpdateCategory from "./DialogUpdateCategory";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";
import { CategoryContext } from "@/context/categoryContex";

const TableCategory = () => {
  const context = React.useContext(CategoryContext);
  const dataCategory = context?.dataCategory;
  const fetchCategory = context?.fetchCategory;
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("accessToken")!);
      setAccessToken(token);
    }
  }, []);

  const handleDeleteCategory = async (id: number) => {
    if (!accessToken) {
      toast.error("No access token found");
      return;
    }
    try {
      const response = await axios.delete(`${API_URL}/api/v1/category/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        toast.success("Delete category successfully");
        fetchCategory();
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
  return (
    <Table>
      <TableCaption>A list of your category.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead className="min-w-28 text-center">Title</TableHead>
          <TableHead className="min-w-4">Description</TableHead>
          <TableHead className="font-sans text-center">Create Day</TableHead>
          <TableHead className="font-sans text-center">Update Day</TableHead>
          <TableHead className="font-sans text-center">
            Delete - Update
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="relative">
        {dataCategory?.categories?.map((item) => (
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
  );
};

export default TableCategory;
