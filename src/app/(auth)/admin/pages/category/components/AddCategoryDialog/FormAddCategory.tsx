"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCategory } from "../../types/schemaCategory";
import axios from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";
import { dataAddCategory } from "../../types/common";

interface IModalCategory {
  onSetOpen: (value: boolean) => void;
  fetchCategory: () => void;
}

const FormAddCategory: React.FC<IModalCategory> = ({
  onSetOpen,
  fetchCategory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCategory),
  });

  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("accessToken")!);
      setAccessToken(token);
    }
  }, []);

  const handleAddCategory = async (data: dataAddCategory) => {
    if (!accessToken) {
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/category`,
        {
          title: data.title,
          description: data.description,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Add category successfully");
        onSetOpen(false);
        fetchCategory();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 py-4"
      onSubmit={handleSubmit(handleAddCategory)}
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-right font-sans text-lg capitalize font-bold"
        >
          title
        </label>
        <Input
          {...register("title")}
          id="title"
          placeholder="please enter title"
        />
        {errors.title?.message && (
          <p className="font-sans text-base leading-normal italic text-red-500 capitalize">
            {errors.title?.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-right font-sans text-lg capitalize font-bold nor"
        >
          description
        </label>
        <Input
          {...register("description")}
          id="description"
          placeholder="please enter description"
        />
      </div>
      {errors.description?.message && (
        <p className="font-sans text-base leading-normal italic text-red-500 capitalize">
          {errors.description?.message}
        </p>
      )}
      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          type="submit"
          className="font-sans text-lg font-bold capitalize"
        >
          add category
        </Button>
      </div>
    </form>
  );
};

export default FormAddCategory;
