"use client";
import { API_URL, IPublisherMain } from "@/types/common";
import axios from "axios";
import React from "react";

interface IPublisher {
  dataPublisher: IPublisherMain | null | undefined;
  fetchPublisherPage: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const PublisherContext = React.createContext<IPublisher>({
  dataPublisher: null,
  fetchPublisherPage: () => {},
  setSearchValue: () => {},
});

export const PublisheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataPublisher, setDataPublisher] = React.useState<IPublisherMain>();
  const [searchValue, setSearchValue] = React.useState<string>("");

  const fetchPublisherPage = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/publisher?search=${searchValue}`
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
  }, [searchValue]);

  const context = React.useMemo(() => {
    return {
      dataPublisher,
      fetchPublisherPage,
      setSearchValue,
    };
  }, [dataPublisher, fetchPublisherPage, setSearchValue]);

  return (
    <PublisherContext.Provider value={context}>
      {children}
    </PublisherContext.Provider>
  );
};
