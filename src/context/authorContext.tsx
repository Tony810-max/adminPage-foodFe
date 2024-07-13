"use client";
import React from "react";
import { useAuthor } from "@/app/(auth)/admin/pages/author/hook/useAuthor";
import { IAuthor } from "@/types/common";

interface IAuthorContext {
  dataAuthor: IAuthor | null | undefined;
  fetchAuthor: () => void;
}

export const AuthorContext = React.createContext<IAuthorContext>({
  dataAuthor: null,
  fetchAuthor: () => {},
});

export const AuthorProvider = ({ children }: { children: React.ReactNode }) => {
  const { dataAuthor, fetchAuthor } = useAuthor();

  const context = React.useMemo(() => {
    return {
      dataAuthor,
      fetchAuthor,
    };
  }, [dataAuthor, fetchAuthor]);

  return (
    <AuthorContext.Provider value={context}>{children}</AuthorContext.Provider>
  );
};
