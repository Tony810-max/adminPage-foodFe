"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL } from "@/types/common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";
import { PublisherContext } from "@/context/publisherContext";
import { ICreate, IFormValue } from "../types/common";
import { publisherSchema } from "../types/schema";

const CreatePublisherFormDialog: React.FC<ICreate> = ({ onSetOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(publisherSchema),
  });
  const context = React.useContext(PublisherContext);
  const fetchPublisherPage = context?.fetchPublisherPage;

  const handleCreatePublisher = async (data: IFormValue) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.post(
        `${API_URL}/api/v1/publisher`,
        {
          name: data?.name,
          description: data?.description,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        toast.success("Create publisher successfully..!!");
        onSetOpen(false);
        fetchPublisherPage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="grid gap-4 py-4"
      onSubmit={handleSubmit(handleCreatePublisher)}
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="font-sans text-base capitalize">
          Name
        </Label>
        <Input
          id="name"
          className="col-span-3"
          placeholder="enter name publisher"
          {...register("name")}
        />
      </div>
      {errors.name?.message && (
        <p className="font-sans text-base text-red-600 italic capitalize">
          {errors.name?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="font-sans text-base capitalize">
          description
        </Label>
        <Input
          id="username"
          className="col-span-3"
          placeholder="enter description publisher"
          {...register("description")}
        />
      </div>
      {errors.description?.message && (
        <p className="font-sans text-base text-red-600 italic capitalize">
          {errors.description?.message}
        </p>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant={"destructive"}
          className="font-sans text-base"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreatePublisherFormDialog;
