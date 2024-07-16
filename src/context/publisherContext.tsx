"use client";
import { API_URL, IPublisherMain } from "@/types/common";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";

interface IPublisher {
  dataPublisher: IPublisherMain | null | undefined;
  fetchPublisherPage: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  page: string | null;
}

export const PublisherContext = React.createContext<IPublisher>({
  dataPublisher: null,
  fetchPublisherPage: () => {},
  setSearchValue: () => {},
  page: null,
});
export const PublisheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataPublisher, setDataPublisher] = React.useState<IPublisherMain>();
  const [searchValue, setSearchValue] = React.useState<string>("");
  const search = useSearchParams();
  const page = search.get("page");

  const fetchPublisherPage = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/publisher?page=${page}&limit=5search=${searchValue}`
      );
      if (response) {
        setDataPublisher(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchPublisherPage();
  }, [searchValue, page]);

  const context = React.useMemo(() => {
    return {
      dataPublisher,
      fetchPublisherPage,
      setSearchValue,
      page,
    };
  }, [dataPublisher, fetchPublisherPage, setSearchValue, page]);

  return (
    <PublisherContext.Provider value={context}>
      {children}
    </PublisherContext.Provider>
  );
};
