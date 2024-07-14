"use client";
import React from "react";

import CreateDialogPublisher from "./components/CreateDialogPublisher";
import { PublisheProvider } from "@/context/publisherContext";
import TableDataPublisher from "./components/TableDataPublisher";
import SearchPublisher from "./components/SearchPublisher";

const PublisherPage = () => {
  return (
    <div className="space-y-3">
      <PublisheProvider>
        <div className="flex justify-between">
          <CreateDialogPublisher />
          <SearchPublisher />
        </div>
        <TableDataPublisher />
      </PublisheProvider>
    </div>
  );
};

export default PublisherPage;
