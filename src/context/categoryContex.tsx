"use client";
import { API_URL, ICategoryMain } from "@/types/common";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

interface ICategory {
  dataCategory?: ICategoryMain | null;
  fetchCategory: () => void;
  setDataCategory: React.Dispatch<
    React.SetStateAction<ICategoryMain | undefined>
  >;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryContext = React.createContext<ICategory>({
  dataCategory: null,
  fetchCategory: () => {},
  setDataCategory: () => {},
  setSearchValue: () => {},
});

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [dataCategory, setDataCategory] = React.useState<ICategoryMain>();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const search = useSearchParams();
  const page = search.get("page");

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/category?page=${page}&limit=5&search=${searchValue}`
      );
      if (response) {
        setDataCategory(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchCategory();
  }, [searchValue, page]);

  const context = React.useMemo(() => {
    return {
      dataCategory,
      fetchCategory,
      setDataCategory,
      setSearchValue,
    };
  }, [dataCategory, fetchCategory, setSearchValue]);

  return (
    <CategoryContext.Provider value={context}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
