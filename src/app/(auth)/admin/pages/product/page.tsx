import React from "react";

import TableProduct from "./components/TableProduct";
import DialogProduct from "./components/DialogProduct";


const ProductPage = () => {
  return (
    <div className="space-y-3">
      <DialogProduct />
      <TableProduct />
    </div>
  );
};

export default ProductPage;
