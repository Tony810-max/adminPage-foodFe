"use client";
import { API_URL, IProductMain } from "@/types/common";
import axios from "axios";
import React from "react";

interface IProduct {
  dataProduct: IProductMain | null | undefined;
  fetchProduct: () => void;
}

export const ProductContext = React.createContext<IProduct>({
  dataProduct: null,
  fetchProduct: () => {},
});

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataProduct, setDataProduct] = React.useState<IProductMain>();

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
  React.useEffect(() => {
    fetchProduct();
  }, []);

  const context = React.useMemo(() => {
    return {
      dataProduct,
      fetchProduct,
    };
  }, [dataProduct, fetchProduct]);

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
