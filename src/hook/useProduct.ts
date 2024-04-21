import { API_URL, IProduct } from "@/types/common";
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

  useEffect(() => {
    fetchProduct();
  }, []);
  return { dataProduct, handleDeleteProduct };
};
export default useProduct;
