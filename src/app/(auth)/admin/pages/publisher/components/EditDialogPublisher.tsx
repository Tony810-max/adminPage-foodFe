"use client";
import React from "react";

import axios from "axios";
import { PublisherContext } from "@/context/publisherContext";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { publisherSchema } from "../types/schema";
import { IEditDialog, IFormValue } from "../types/common";
import { API_URL } from "@/types/common";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EditDialogPublisher: React.FC<IEditDialog> = ({
  name,
  value,
  onsetOpen,
  idPublisher,
}) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(publisherSchema),
  });
  const context = React.useContext(PublisherContext);
  const fetchPublisher = context?.fetchPublisherPage;

  const handleUpdatePublisher = async (data: IFormValue) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.patch(
        `${API_URL}/api/v1/publisher/${idPublisher}`,
        {
          name: data?.name,
          description: data?.description,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Publisher updated successfully");
        onsetOpen(false);
        fetchPublisher();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="grid gap-4 py-4"
      onSubmit={handleSubmit(handleUpdatePublisher)}
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="font-sans text-base capitalize">
          Name
        </Label>
        <Input
          id="name"
          defaultValue={name}
          className="col-span-3"
          {...register("name")}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="font-sans text-base capitalize">
          description
        </Label>
        <Input
          id="description"
          defaultValue={value}
          className="col-span-3"
          {...register("description")}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant={"destructive"}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditDialogPublisher;
