import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OderContext } from "@/context/orderContext";
import React from "react";

const SearchOrder = () => {
  const [search, setSearch] = React.useState<string>("");
  const orderContext = React.useContext(OderContext);
  const onSetSearchValue = orderContext.setSearchValue;

  const handleSearchOrder = () => {
    onSetSearchValue(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchOrder();
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSearchValue("");
  };

  return (
    <div className="flex gap-1">
      <Input
        placeholder="Enter name value order"
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
          onClick={handleSearchOrder}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchOrder;
