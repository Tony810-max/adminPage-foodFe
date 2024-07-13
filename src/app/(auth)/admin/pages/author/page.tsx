"use client";
import React from "react";
import { AuthorProvider } from "@/context/authorContext";
import CreateAuthor from "./components/CreateAuthor";
import TableDataAuthor from "./components/TableDataAuthor";

const AuthorPage = () => {
  return (
    <div className="space-y-4">
      <AuthorProvider>
        <CreateAuthor />
        <TableDataAuthor />
      </AuthorProvider>
    </div>
  );
};

export default AuthorPage;
