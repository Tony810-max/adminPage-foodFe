import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/userContext";
import React from "react";

const SearchUser = () => {
  const [search, setSearch] = React.useState<string>("");
  const userContext = React.useContext(UserContext);
  const onSetSearchValue = userContext.setSearchValue;

  const handleSearchUser = () => {
    onSetSearchValue(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    onSetSearchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchUser();
    }
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
          onClick={handleSearchUser}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchUser;
