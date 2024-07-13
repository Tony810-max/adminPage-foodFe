"use client";

import React from "react";
import TableCategory from "./components/TableCategory";
import AddCategoryDialog from "./components/AddCategoryDialog";
import CategoryProvider from "@/context/categoryContex";

const CategoryPage = () => {
  return (
    <div className="space-y-3">
      <CategoryProvider>
        <AddCategoryDialog />
        <TableCategory />
      </CategoryProvider>
    </div>
  );
};

export default CategoryPage;
