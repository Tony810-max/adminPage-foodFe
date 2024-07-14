import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PublisherContext } from "@/context/publisherContext";
import React from "react";

const SearchPublisher = () => {
  const [search, setSearch] = React.useState("");
  const publisherContext = React.useContext(PublisherContext);
  const onSetSearchValue = publisherContext.setSearchValue;

  const handleSearchPublisher = () => {
    onSetSearchValue(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSearchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchPublisher();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter name value publisher"
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
          onClick={handleSearchPublisher}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchPublisher;
