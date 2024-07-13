import React from "react";
import DialogAddProduct from "./components/AddProduct/DialogAddProduct";
import TableProduct from "./components/TableProduct";
import CategoryProvider from "@/context/categoryContex";
import ProductProvider from "@/context/productContext";

const ProductPage = () => {
  return (
    <div className="space-y-3">
      <CategoryProvider>
        <ProductProvider>
          <DialogAddProduct />
          <TableProduct />
        </ProductProvider>
      </CategoryProvider>
    </div>
  );
};

export default ProductPage;
