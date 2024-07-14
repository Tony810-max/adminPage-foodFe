"use client";

import React from "react";
import TableCategory from "./components/TableCategory";
import AddCategoryDialog from "./components/AddCategoryDialog";
import CategoryProvider from "@/context/categoryContex";
import SeachCategory from "./components/SeachCategory";

const CategoryPage = () => {
  return (
    <div className="space-y-3">
      <CategoryProvider>
        <div className="flex justify-between">
          <AddCategoryDialog />
          <SeachCategory />
        </div>
        <TableCategory />
      </CategoryProvider>
    </div>
  );
};

export default CategoryPage;
