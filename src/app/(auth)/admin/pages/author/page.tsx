"use client";
import React from "react";
import { AuthorProvider } from "@/context/authorContext";
import CreateAuthor from "./components/CreateAuthor";
import TableDataAuthor from "./components/TableDataAuthor";
import SearchAuthor from "./components/SearchAuthor";

const AuthorPage = () => {
  return (
    <div className="space-y-4">
      <AuthorProvider>
        <div className="flex gap-1 items-center justify-between">
          <CreateAuthor />
          <SearchAuthor />
        </div>
        <TableDataAuthor />
      </AuthorProvider>
    </div>
  );
};

export default AuthorPage;
