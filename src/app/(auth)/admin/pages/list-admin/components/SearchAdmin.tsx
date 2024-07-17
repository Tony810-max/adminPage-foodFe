import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface ISearchAdmin {
  onSetSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchAdmin: React.FC<ISearchAdmin> = ({ onSetSearch }) => {
  const [search, setSearch] = React.useState<string>("");

  const handleSearchAuthor = () => {
    onSetSearch(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchAuthor();
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSearch("");
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

export default SearchAdmin;
