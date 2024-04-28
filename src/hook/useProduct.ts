import { API_URL, AddProduct, IProduct } from "@/types/common";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useProduct = () => {
  const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/products`);
      if (response) {
        setDataProduct(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.error("Error in handleAddProduct:", error);
      toast.error("Failed to add product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return { dataProduct, fetchProduct, handleDeleteProduct, handleAddProduct };
};
export default useProduct;
