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
import { IAddProduct, ISubmitData } from "../../types/common";
import { AuthorContext } from "@/context/authorContext";
import { PublisherContext } from "@/context/publisherContext";
import { ProductContext } from "@/context/productContext";

interface IModalAddProduct {
  onSetOpen: (value: boolean) => void;
}

const ModalAddProduct: React.FC<IModalAddProduct> = ({ onSetOpen }) => {
  const [file, setFile] = useState<FileList | null>(null);
  const productContext = React.useContext(ProductContext);
  const categoryContext = React.useContext(CategoryContext);
  const authorContext = React.useContext(AuthorContext);
  const publisherContext = React.useContext(PublisherContext);

  const dataCategory = categoryContext?.dataCategory;
  const dataAuthor = authorContext?.dataAuthor;
  const dataPublisher = publisherContext?.dataPublisher;
  const fetchProduct = productContext?.fetchProduct;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleAddProduct = async (productData: IAddProduct) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

      const response = await axios.post(
        `${API_URL}/api/v1/products`,
        productData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response) {
        toast.success("Product added successfully");
        onSetOpen(false);
        fetchProduct();
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

  const onSubmit = async (data: ISubmitData) => {
    const filterCategoryId = dataCategory?.categories?.filter(
      (category) => category?.title === data?.categoryValue
    );
    const filterAuthorId = dataAuthor?.authors?.filter(
      (author) => author?.name === data?.authorValue
    );
    const filterPublisherId = dataPublisher?.publishers?.filter(
      (publisher) => publisher?.name === data?.publisherValue
    );

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
      images: images,
      discount: data.discount,
      categoryId: filterCategoryId && filterCategoryId[0]?.id,
      authorId: filterAuthorId && filterAuthorId[0]?.id,
      publisherId: filterPublisherId && filterPublisherId[0]?.id,
    };

    toast.warn("Please wait, the product is being added.");
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
      <InputFieldProduct
        label="discount"
        name="discount"
        register={register}
        type="number"
        errorMessage={errors?.title?.message}
      />
      <InputFieldProduct
        label="stock"
        name="stock"
        register={register}
        type="number"
        errorMessage={errors?.stock?.message}
      />
      <InputFieldProduct
        label="price"
        name="price"
        register={register}
        type="number"
        errorMessage={errors?.price?.message}
      />

      <div className="space-y-2">
        <label className="font-sans text-base font-semibold">Author</label>
        <Controller
          name="authorValue"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select a Category"
                  className="w-full"
                />
              </SelectTrigger>
              <SelectContent ref={field.ref}>
                <SelectGroup>
                  <SelectLabel>Author</SelectLabel>
                  {dataAuthor?.authors?.map((author) => (
                    <SelectItem key={author?.id} value={author?.name}>
                      {author?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="font-sans text-base font-semibold">Publisher</label>
        <Controller
          name="publisherValue"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select a Category"
                  className="w-full"
                />
              </SelectTrigger>
              <SelectContent ref={field.ref}>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {dataPublisher?.publishers?.map((publisher) => (
                    <SelectItem key={publisher?.id} value={publisher?.name}>
                      {publisher?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="font-sans text-base font-semibold">Category</label>
        <Controller
          name="categoryValue"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select a Category"
                  className="w-full"
                />
              </SelectTrigger>
              <SelectContent ref={field.ref}>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {dataCategory?.categories?.map((category) => (
                    <SelectItem key={category?.id} value={category?.title}>
                      {category?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="font-sans text-base font-semibold"
        >
          Description
        </label>
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
