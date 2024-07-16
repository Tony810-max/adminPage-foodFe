"use client";
import React from "react";
import { API_URL, IAuthor } from "@/types/common";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface IAuthorContext {
  dataAuthor: IAuthor | null | undefined;
  fetchAuthor: () => void;
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>;
  page: string | null;
}

export const AuthorContext = React.createContext<IAuthorContext>({
  dataAuthor: null,
  fetchAuthor: () => {},
  setSearchAuthor: () => {},
  page: null,
});

export const AuthorProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataAuthor, setDataAuthor] = React.useState<IAuthor>();
  const [searchAuthor, setSearchAuthor] = React.useState<string>("");
  const search = useSearchParams();
  const page = search.get("page");

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/authors?page=${page}&limit=5&search=${searchAuthor}`
      );
      if (response) {
        setDataAuthor(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAuthor();
  }, [searchAuthor, page]);

  const context = React.useMemo(() => {
    return {
      dataAuthor,
      fetchAuthor,
      setSearchAuthor,
      page,
    };
  }, [dataAuthor, fetchAuthor, setSearchAuthor, page]);

  return (
    <AuthorContext.Provider value={context}>{children}</AuthorContext.Provider>
  );
};
