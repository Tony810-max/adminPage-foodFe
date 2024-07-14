import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryContext } from "@/context/categoryContex";
import React from "react";

const SeachCategory = () => {
  const [search, setSearch] = React.useState<string>("");
  const categoryContext = React.useContext(CategoryContext);
  const onSetSarchValue = categoryContext.setSearchValue;

  const handleSearchCategory = () => {
    onSetSarchValue(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSarchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchCategory();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter name category value"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-1">
        <Button
          variant={"secondary"}
          className="font-sans text-sm"
          onClick={handleClearSearch}
        >
          Clear
        </Button>
        <Button
          variant={"destructive"}
          className="font-sans text-sm"
          onClick={handleSearchCategory}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SeachCategory;
