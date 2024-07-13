"use client";
import React from "react";

import CreateDialogPublisher from "./components/CreateDialogPublisher";
import { PublisheProvider } from "@/context/publisherContext";
import TableDataPublisher from "./components/TableDataPublisher";

const PublisherPage = () => {
  return (
    <div className="space-y-3">
      <PublisheProvider>
        <CreateDialogPublisher />
        <TableDataPublisher />
      </PublisheProvider>
    </div>
  );
};

export default PublisherPage;
