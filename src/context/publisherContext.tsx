"use client";
import { API_URL, IPublisherMain } from "@/types/common";
import axios from "axios";
import React from "react";

interface IPublisher {
  dataPublisher: IPublisherMain | null | undefined;
  fetchPublisherPage: () => void;
}

export const PublisherContext = React.createContext<IPublisher>({
  dataPublisher: null,
  fetchPublisherPage: () => {},
});

export const PublisheProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataPublisher, setDataPublisher] = React.useState<IPublisherMain>();

  const fetchPublisherPage = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/publisher`);
      if (response) {
        setDataPublisher(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchPublisherPage();
  }, []);

  const context = React.useMemo(() => {
    return {
      dataPublisher,
      fetchPublisherPage,
    };
  }, [dataPublisher, fetchPublisherPage]);

  return (
    <PublisherContext.Provider value={context}>
      {children}
    </PublisherContext.Provider>
  );
};
