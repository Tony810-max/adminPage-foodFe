import React from "react";
import DialogAddProduct from "./components/AddProduct/DialogAddProduct";
import TableProduct from "./components/TableProduct";
import CategoryProvider from "@/context/categoryContex";
import ProductProvider from "@/context/productContext";
import { AuthorProvider } from "@/context/authorContext";
import { PublisheProvider } from "@/context/publisherContext";

const ProductPage = () => {
  return (
    <div className="space-y-3">
      <CategoryProvider>
        <AuthorProvider>
          <PublisheProvider>
            <ProductProvider>
              <DialogAddProduct />
              <TableProduct />
            </ProductProvider>
          </PublisheProvider>
        </AuthorProvider>
      </CategoryProvider>
    </div>
  );
};

export default ProductPage;
