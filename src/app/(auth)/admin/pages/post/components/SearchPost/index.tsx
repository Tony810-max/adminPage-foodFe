import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ISearchPost {
  onSetSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPost: React.FC<ISearchPost> = ({ onSetSearchValue }) => {
  const [search, setSearch] = React.useState<string>("");

  const handleSearchPost = () => {
    onSetSearchValue(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSearchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchPost();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter name value post"
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
          onClick={handleSearchPost}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchPost;
