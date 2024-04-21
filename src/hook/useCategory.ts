import { API_URL, ICategory } from "@/types/common";
import axios from "axios";
import { useEffect, useState } from "react";

export  const useCategory = () => {
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

  useEffect(() => {
    fetchCategory();
  }, []);
  return {
    dataCategory,
  };
};

