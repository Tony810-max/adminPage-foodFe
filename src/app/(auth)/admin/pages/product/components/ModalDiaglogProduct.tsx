"use client";
import React, { useState } from "react";
import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategory } from "@/hook/useCategory";
import useProduct from "@/hook/useProduct";

import { productSchema } from "../types/common";
import { ICategory } from "@/types/common";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputFieldProduct from "./InputFieldProduct";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ModalDiaglogProduct = () => {
  const [file, setFile] = useState<FileList | null>(null);

  const { handleAddProduct } = useProduct();
  const { dataCategory } = useCategory();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

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

  const onSubmit = async (data: any) => {
    let images = [];
    if (file) {
      images = await uploadImage(file);
    }
    const filterCategoryIdProduct: ICategory[] = dataCategory?.filter(
      (item) => item?.title === data?.categoryId
    );
    const productData = {
      title: data.title,
      stock: Number(data.stock),
      price: Number(data.price),
      description: data.description,
      categoryId: filterCategoryIdProduct[0]?.id,
      images: images,
    };

    // Sử dụng hàm handleAddProduct từ hook useProduct để xử lý thêm sản phẩm
    await handleAddProduct(productData);
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
            {...field}
            onValueChange={(value: string) => field.onChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {dataCategory?.map((category) => (
                  <SelectItem key={category?.id} value={category?.title}>
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
              console.log("day la filelist:", files);
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

export default ModalDiaglogProduct;
