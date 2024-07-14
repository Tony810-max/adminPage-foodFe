import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthorContext } from "@/context/authorContext";
import React from "react";

const SearchAuthor = () => {
  const [search, setSearch] = React.useState<string>("");
  const authorContext = React.useContext(AuthorContext);
  const onSetSearchAuthor = authorContext?.setSearchAuthor;

  const handleSearchAuthor = () => {
    onSetSearchAuthor(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchAuthor();
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSearchAuthor("");
  };

  return (
    <div className="flex gap-1">
      <Input
        placeholder="Enter name value user"
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
          onClick={handleSearchAuthor}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchAuthor;
