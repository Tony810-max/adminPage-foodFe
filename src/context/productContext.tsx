"use client";
import { API_URL, IProductMain } from "@/types/common";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IProduct {
  dataProduct: IProductMain | null | undefined;
  fetchProduct: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductContext = React.createContext<IProduct>({
  dataProduct: null,
  fetchProduct: () => {},
  setSearchValue: () => {},
});

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataProduct, setDataProduct] = React.useState<IProductMain>();
  const [searchValue, setSearchValue] = React.useState<string>("");

  const search = useSearchParams();
  const page = search.get("page");

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/products?search=${searchValue}&page=${page}&limit=5`
      );
      if (response) {
        setDataProduct(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchProduct();
  }, [searchValue, page]);

  const context = React.useMemo(() => {
    return {
      dataProduct,
      fetchProduct,
      setSearchValue,
    };
  }, [dataProduct, fetchProduct, setSearchValue]);

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
