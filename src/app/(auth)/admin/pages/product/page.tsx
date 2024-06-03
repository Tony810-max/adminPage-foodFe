import React from "react";
import DialogAddProduct from "./components/AddProduct/DialogAddProduct";
import TableProduct from "./components/TableProduct";

const ProductPage = () => {
  return (
    <div className="space-y-3">
      <DialogAddProduct />
      <TableProduct />
    </div>
  );
};

export default ProductPage;
