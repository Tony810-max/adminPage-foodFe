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

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    dataProduct,
    fetchProduct,
    handleDeleteProduct,
  };
};
export default useProduct;
