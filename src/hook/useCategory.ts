"use client";
import { API_URL, ICategory } from "@/types/common";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type dataAddCategory = {
  title: string;
  description: string;
};

export const useCategory = () => {
  const [dataCategory, setDataCategory] = useState<ICategory[]>([]);
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/category`);
      if (response) {
        setDataCategory(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.delete(`${API_URL}/api/v1/category/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        toast.success("Delete category successfully");
        fetchCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleSubmit = async (data: dataAddCategory) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.post(
        `${API_URL}/api/v1/category`,
        {
          title: data.title,
          description: data.description,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Add category successfully");
        fetchCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return {
    dataCategory,
    fetchCategory,
    handleDeleteCategory,
    onHandleSubmit,
  };
};
