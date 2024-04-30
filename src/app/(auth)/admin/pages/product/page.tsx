import React from "react";

import TableProduct from "./components/TableProduct";
import DialogAddProduct from "./components/AddProduct/DialogAddProduct";

const ProductPage = () => {
  return (
    <div className="space-y-3">
      <DialogAddProduct />
      <TableProduct />
    </div>
  );
};

export default ProductPage;
