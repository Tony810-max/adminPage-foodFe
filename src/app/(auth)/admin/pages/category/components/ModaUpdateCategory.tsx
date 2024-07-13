"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { dataAddCategory } from "../types/common";
import { toast } from "react-toastify";
import { API_URL } from "@/types/common";
import axios from "axios";
import { schemaCategory } from "../types/schemaCategory";
import { CategoryContext } from "@/context/categoryContex";

interface modalUpdateProps {
  id: number;
  tittleDefault: string;
  desDefault: string;
  onSetOpen: (value: boolean) => void;
}

const ModaUpdateCategory: React.FC<modalUpdateProps> = ({
  id,
  desDefault,
  tittleDefault,
  onSetOpen,
}) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schemaCategory),
  });
  const context = React.useContext(CategoryContext);
  const fetchCategory = context?.fetchCategory;
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("accessToken")!);
      setAccessToken(token);
    }
  }, []);
  
  const handleUpdateCategory = async (data: dataAddCategory) => {
    try {
      if (!accessToken) {
        return;
      }
      const response = await axios.patch(
        `${API_URL}/api/v1/category/${id}`,
        {
          title: data.title,
          description: data.description,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Update category successfully");
        onSetOpen(false);
        fetchCategory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(handleUpdateCategory)}>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="idCategory"
          className="font-sans text-base font-bold uppercase"
        >
          id
        </label>
        <Input
          id="idCategory"
          defaultValue={id}
          className="col-span-3"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="title"
          className="font-sans text-base font-bold uppercase"
        >
          title
        </label>
        <Input
          {...register("title")}
          id="title"
          defaultValue={tittleDefault}
          className="col-span-3"
        />
      </div>
      <div className="flex flex-col  gap-1">
        <label
          htmlFor="description"
          className="font-sans text-base font-bold uppercase"
        >
          description
        </label>
        <Input
          {...register("description")}
          id="description"
          defaultValue={desDefault}
          className="col-span-3"
        />
      </div>
      <div className="flex justify-end">
        <Button variant={"destructive"} type="submit">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ModaUpdateCategory;
