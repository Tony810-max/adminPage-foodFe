"use client";
import { API_URL, ICategoryMain } from "@/types/common";
import axios from "axios";
import React, { ReactNode } from "react";

interface ICategory {
  dataCategory?: ICategoryMain | null;
  fetchCategory: () => void;
}

export const CategoryContext = React.createContext<ICategory>({
  dataCategory: null,
  fetchCategory: () => {},
});

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [dataCategory, setDataCategory] = React.useState<ICategoryMain>();

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/category`);
      if (response) {
        console.log(response);
        setDataCategory(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);

  const context = React.useMemo(() => {
    return {
      dataCategory,
      fetchCategory,
    };
  }, [dataCategory, fetchCategory]);

  return (
    <CategoryContext.Provider value={context}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;