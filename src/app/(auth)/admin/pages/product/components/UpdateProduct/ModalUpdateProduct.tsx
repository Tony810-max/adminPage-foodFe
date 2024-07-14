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

import { API_URL, IProductSub } from "@/types/common";

import Image from "next/image";
import { toast } from "react-toastify";
import { CategoryContext } from "@/context/categoryContex";
import { IAddProduct, ISubmitData } from "../../types/common";
import axios, { AxiosError } from "axios";
import { Label } from "@/components/ui/label";
import { PublisherContext } from "@/context/publisherContext";
import { AuthorContext } from "@/context/authorContext";
import { ProductContext } from "@/context/productContext";

interface ModalUpdateProps {
  data: IProductSub[];
  id: number;
  onSetOpen: (value: boolean) => void;
}

const ModalUpdateProduct: React.FC<ModalUpdateProps> = ({
  data,
  id,
  onSetOpen,
}) => {
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
      categoryValue: data[0].category.title,
      authorValue: data[0].author.name,
      discount: Number(data[0].discount),
      publisherValue: data[0].publisher?.name,
      stock: data[0].stock,
      description: data[0].description,
    },
  });
  const [file, setFile] = useState<FileList | null>(null);
  const productContext = React.useContext(ProductContext);
  const categoryContext = React.useContext(CategoryContext);
  const publisherContext = React.useContext(PublisherContext);
  const authorContext = React.useContext(AuthorContext);

  const dataCategory = categoryContext?.dataCategory;

  const fetchProduct = productContext?.fetchProduct;

  const dataPublisher = publisherContext?.dataPublisher;
  const dataAuthor = authorContext?.dataAuthor;

  const handleUpdateProduct = async (productData: IAddProduct) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.patch(
        `${API_URL}/api/v1/products/${id}`,
        productData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Product updated successfully");
        onSetOpen(false);
        fetchProduct();
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

  const onSubmit = async (dataSubmit: ISubmitData) => {
    let images = [];
    if (file) {
      images = await uploadImage(file);
    } else {
      images = data[0]?.images;
    }

    const filterCategoryId = dataCategory?.categories?.filter(
      (category) => category?.title === dataSubmit?.categoryValue
    );
    const filterAuthorId = dataAuthor?.authors?.filter(
      (author) => author?.name === dataSubmit?.authorValue
    );
    const filterPublisherId = dataPublisher?.publishers?.filter(
      (publisher) => publisher?.name === dataSubmit?.publisherValue
    );

    const productData = {
      title: dataSubmit.title,
      description: dataSubmit.description,
      price: Number(dataSubmit.price),
      discount: Number(dataSubmit.discount),
      stock: Number(dataSubmit.stock),
      images: images,
      categoryId: filterCategoryId && filterCategoryId[0]?.id,
      authorId: filterAuthorId && filterAuthorId[0]?.id,
      publisherId: filterPublisherId && filterPublisherId[0]?.id,
    };
    await handleUpdateProduct(productData);
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
      <div className="space-y-2">
        <Label className="font-sans text-base">Category</Label>
        <Controller
          name="categoryValue"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={(value: string) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {dataCategory?.categories?.map((category) => (
                    <SelectItem
                      key={category?.id}
                      value={category?.title}
                      className="font-sans capitalize"
                    >
                      {category?.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-sans text-base">Author</Label>
        <Controller
          name="authorValue"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={(value: string) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {dataAuthor?.authors?.map((author) => (
                    <SelectItem
                      key={author?.id}
                      value={author?.name}
                      className="font-sans capitalize"
                    >
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
        <Label className="font-sans text-base">Publisher</Label>
        <Controller
          name="publisherValue"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={(value: string) => field.onChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {dataPublisher?.publishers?.map((publisher) => (
                    <SelectItem
                      key={publisher?.id}
                      value={publisher?.name}
                      className="font-sans capitalize"
                    >
                      {publisher?.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <InputFieldProduct
        label="price"
        name="price"
        register={register}
        type="number"
        errorMessage={errors?.price?.message}
      />

      <InputFieldProduct
        label="discount"
        name="discount"
        register={register}
        type="number"
        errorMessage={errors?.price?.message}
      />

      <InputFieldProduct
        label="stock"
        name="stock"
        register={register}
        type="number"
        errorMessage={errors?.stock?.message}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="description">Description</label>
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
          update
        </Button>
      </div>
    </form>
  );
};

export default ModalUpdateProduct;
