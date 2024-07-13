import React, { useState } from "react";
import { productSchema } from "../../types/productSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import InputFieldProduct from "../InputFieldProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AddProduct, IProductSub, IUpdateProduct } from "@/types/common";

import Image from "next/image";
import useProduct from "@/hook/useProduct";
import { toast } from "react-toastify";
import { CategoryContext } from "@/context/categoryContex";

interface ModalUpdateProps {
  data: IProductSub[];
  id: number;
}

const ModalUpdateProduct: React.FC<ModalUpdateProps> = ({ data, id }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: data[0].title,
      price: Number(data[0].price),
      categoryId: data[0].category.id,
      stock: data[0].stock,
      description: data[0].description,
    },
  });
  const [file, setFile] = useState<FileList | null>(null);
  const { uploadImage, handleUpdateProduct } = useProduct();
  const context = React.useContext(CategoryContext);
  const dataCategory = context?.dataCategory;

  const onSubmit = async (data: IUpdateProduct) => {
    let images = [];
    if (file) {
      images = await uploadImage(file);
    } else {
      return toast.error("Image not change");
    }

    const productData = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: data?.categoryId,
      images: images,
    };
    await handleUpdateProduct(id, productData);
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
            value=""
            onValueChange={(value: string) => field.onChange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
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
      <div className="grid grid-cols-8 ">
        {file
          ? Array.from(file).map((item, index) => (
              <div className="relative w-9 h-9" key={index}>
                <Image
                  src={URL.createObjectURL(item)}
                  alt={`image ${index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))
          : data[0]?.images &&
            data[0]?.images.map((image, index) => (
              <div key={index} className="relative w-9 h-9">
                <Image
                  src={image}
                  alt={`image${index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
      </div>
      <div className="flex justify-end">
        <Button variant={"destructive"} type="submit">
          Add product
        </Button>
      </div>
    </form>
  );
};

export default ModalUpdateProduct;
