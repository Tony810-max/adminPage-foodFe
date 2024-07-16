"use client";
import React from "react";
import DialogAddProduct from "./components/AddProduct/DialogAddProduct";
import TableProduct from "./components/TableProduct";
import CategoryProvider from "@/context/categoryContex";
import ProductProvider from "@/context/productContext";
import { AuthorProvider } from "@/context/authorContext";
import { PublisheProvider } from "@/context/publisherContext";
import SearchProduct from "./components/SearchProduct";

const ProductPage = () => {
  return (
    <div className="space-y-3">
      <CategoryProvider>
        <AuthorProvider>
          <PublisheProvider>
            <ProductProvider>
              <div className="flex justify-between items-center">
                <DialogAddProduct />
                <SearchProduct />
              </div>
              <TableProduct />
            </ProductProvider>
          </PublisheProvider>
        </AuthorProvider>
      </CategoryProvider>
    </div>
  );
};

export default ProductPage;
