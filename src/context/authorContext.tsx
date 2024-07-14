"use client";
import React from "react";
import { API_URL, IAuthor } from "@/types/common";
import axios from "axios";

interface IAuthorContext {
  dataAuthor: IAuthor | null | undefined;
  fetchAuthor: () => void;
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthorContext = React.createContext<IAuthorContext>({
  dataAuthor: null,
  fetchAuthor: () => {},
  setSearchAuthor: () => {},
});

export const AuthorProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataAuthor, setDataAuthor] = React.useState<IAuthor>();
  const [searchAuthor, setSearchAuthor] = React.useState<string>("");

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/authors?search=${searchAuthor}`
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
  }, [searchAuthor]);

  const context = React.useMemo(() => {
    return {
      dataAuthor,
      fetchAuthor,
      setSearchAuthor,
    };
  }, [dataAuthor, fetchAuthor, setSearchAuthor]);

  return (
    <AuthorContext.Provider value={context}>{children}</AuthorContext.Provider>
  );
};
