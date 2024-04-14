import Image from "next/image";
import React from "react";
import FormLoginPage from "./components/FormLoginPage";

const LoginPage = () => {
  return (
    <div className="relative w-full min-h-screen z-0">
      <Image
        src="/images/LoginPage/loginpageBanner.png"
        alt="Login Page"
        fill
      />
      <FormLoginPage />
    </div>
  );
};

export default LoginPage;
