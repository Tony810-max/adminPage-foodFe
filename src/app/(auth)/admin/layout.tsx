import ChatMessage from "@/app/(private)/chat";
import Header from "@/components/layouts/Header";
import React, { Suspense } from "react";

const layoutAdmin = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="px-4">
      <Suspense>
        <div className="flex gap-2 sm:gap-10 min-h-screen pr-4">
          <div className="flex flex-col w-full h-full ">
            <Header />
            {children}
          </div>
        </div>
        <ChatMessage />
      </Suspense>
    </div>
  );
};

export default layoutAdmin;
