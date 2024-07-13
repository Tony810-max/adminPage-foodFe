"use client";
import { API_URL, AddProduct, IProductMain } from "@/types/common";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useProduct = () => {
  const [dataProduct, setDataProduct] = useState<IProductMain>();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/products`);
      if (response) {
        setDataProduct(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.delete(`${API_URL}/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        toast.success("Delete product successfully");
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

  const handleAddProduct = async (productData: AddProduct) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

      const response = await axios.post(
        `${API_URL}/api/v1/products`,
        productData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response) {
        toast.success("Product added successfully");
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

  const handleUpdateProduct = async (id: number, productData: AddProduct) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.patch(
        `${API_URL}/api/v1/products/${id}`,
        productData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Product updated successfully");
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

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    dataProduct,
    fetchProduct,
    uploadImage,
    handleDeleteProduct,
    handleAddProduct,
    handleUpdateProduct,
  };
};
export default useProduct;
