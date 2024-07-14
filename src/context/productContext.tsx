"use client";
import { API_URL, IProductMain } from "@/types/common";
import axios from "axios";
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
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/products?search=${searchValue}`
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
  }, [searchValue]);

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
