import { API_URL, IAuthor } from "@/types/common";
import axios from "axios";
import React from "react";

export const useAuthor = () => {
  const [dataAuthor, setDataAuthor] = React.useState<IAuthor>();

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/authors`);
      if (response) {
        setDataAuthor(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAuthor();
  }, []);

  return {
    dataAuthor,
    fetchAuthor,
  };
};
