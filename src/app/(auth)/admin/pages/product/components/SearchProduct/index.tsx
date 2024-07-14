"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductContext } from "@/context/productContext";
import React from "react";

const SearchProduct = () => {
  const [search, setSearch] = React.useState("");
  const productContext = React.useContext(ProductContext);
  const dataProduct = productContext.dataProduct;
  const onSetSearchValue = productContext.setSearchValue;

  const handleSearchProduct = () => {
    onSetSearchValue(search);
  };

  const handleClearSearchValue = () => {
    onSetSearchValue("");
    setSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchProduct();
    }
  };

  return (
    <div className=" flex gap-2">
      <Input
        placeholder="enter value name product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant={"secondary"}
        className="font-sans text-sm "
        onClick={handleClearSearchValue}
      >
        Clear filter
      </Button>
      <Button
        variant={"destructive"}
        className="font-sans text-sm "
        onClick={handleSearchProduct}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchProduct;
