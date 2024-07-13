"use client";
import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { productSchema } from "../../types/productSchema";
import { API_URL } from "@/types/common";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputFieldProduct from "../InputFieldProduct";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryContext } from "@/context/categoryContex";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IAddProduct } from "../../types/common";

const ModalAddProduct = () => {
  const [file, setFile] = useState<FileList | null>(null);
  // const { handleAddProduct, uploadImage } = useProduct();
  const context = React.useContext(CategoryContext);
  const dataCategory = context?.dataCategory;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleAddProduct = async (productData: IAddProduct) => {
    console.log("productData", productData);
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

      const response = await axios.post(
        `${API_URL}/api/v1/products`,
        productData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response) {
        console.log(response);
        toast.success("Product added successfully");
        // fetchProduct();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 403) {
        toast.error("Access token is invalid");
        return;
      }
      console.error("Error in handleAddProduct:", error);
      toast.error("Failed to add product");
    }
  };

  const onSubmit = async (data: IAddProduct) => {
    console.log(data);
    let images = [];
    if (file) {
      images = await uploadImage(file);
    } else {
      return toast.error("Image not change");
    }

    const productData = {
      title: data.title,
      description: data.description,
      price: data.price,
      stock: data.stock,
      categoryId: data?.categoryId,
      images: images,
      discount: 10,
      authorId: 1,
      publisherId: 1,
    };

    await handleAddProduct(productData);
  };

  const uploadImage = async (file: FileList) => {
    const CLOUD_NAME = "dehamgr2z";
    const PRESET_NAME = "pn5guixu";
    const FOLDER_NAME = "image_FoodFe";
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const uploadPromises = Array.from(file).map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", FOLDER_NAME);
      formData.append("upload_preset", PRESET_NAME);
      return axios.post(url, formData).then((response) => response.data.url);
    });

    return Promise.all(uploadPromises);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <InputFieldProduct
        label="title"
        name="title"
        register={register}
        type="text"
        errorMessage={errors?.title?.message}
      />
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <Select
            value={field.value?.toString()}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent ref={field.ref}>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {dataCategory?.categories?.map((category) => (
                  <SelectItem
                    key={category?.id}
                    value={category?.id?.toString()}
                  >
                    {category?.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <InputFieldProduct
        label="stock"
        name="stock"
        register={register}
        type="number"
        errorMessage={errors?.stock?.message}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="description">description</label>
        <Textarea
          placeholder="Type your message here."
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="font-sans text-red-700 capitalize italic">
            {errors.description?.message}
          </p>
        )}
      </div>

      <InputFieldProduct
        label="price"
        name="price"
        register={register}
        type="number"
        errorMessage={errors?.price?.message}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="image">Image</label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files?.length > 0) {
              setFile(files);
            }
          }}
          multiple
        />
      </div>
      <div className="flex justify-end">
        <Button variant={"destructive"} type="submit">
          Add product
        </Button>
      </div>
    </form>
  );
};

export default ModalAddProduct;
