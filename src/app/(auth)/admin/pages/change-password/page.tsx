import React from "react";
import FormChangePassword from "./components/FormChangePassword";
import Image from "next/image";

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="min-w-80 sm:min-w-[28rem] border rounded-lg shadow-md py-5 px-10">
        <div className="relative  h-32 text-center w-full">
          <Image
            src={"/images/logo.webp"}
            alt="imgChangePassword"
            fill
            unoptimized
            priority
          />
        </div>

        <FormChangePassword />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
