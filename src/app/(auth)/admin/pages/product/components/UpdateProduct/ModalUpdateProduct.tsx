import React, { useEffect, useState } from "react";
import { productSchema } from "../../types/common";
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
import { useCategory } from "@/hook/useCategory";
import { ICategory, IProduct } from "@/types/common";
import Image from "next/image";
import useProduct from "@/hook/useProduct";
import { toast } from "react-toastify";

interface ModalUpdateProps {
  data: IProduct[];
  id: number;
}

const ModalUpdateProduct: React.FC<ModalUpdateProps> = ({ data, id }) => {
  const [file, setFile] = useState<FileList | null>(null);
  const { dataCategory } = useCategory();
  const { uploadImage, handleUpdateProduct, fetchProduct } = useProduct();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      title: data[0]?.title,
      price: data[0]?.price,
      categoryId: data[0]?.category_title,
      stock: data[0]?.stock,
      description: data[0]?.description,
    },
  });

  const onSubmit = async (data: any) => {
    let images = [];
    if (file) {
      images = await uploadImage(file);
    } else {
      return toast.error("Image not change");
    }

    const filterCategoryIdProduct: ICategory[] = dataCategory.filter(
      (category) => category?.title === data?.categoryId
    );

    const productData = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: filterCategoryIdProduct[0]?.id,
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
