"use client";
import React from "react";
import { AuthorProvider } from "@/context/authorContext";
import dynamic from "next/dynamic";

const CreateAuthor = dynamic(() => import("./components/CreateAuthor"), {
  ssr: false,
});
const TableDataAuthor = dynamic(() => import("./components/TableDataAuthor"), {
  ssr: false,
});
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
