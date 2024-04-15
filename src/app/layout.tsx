"use client";
import { ToastContainer } from "react-toastify";
import { useEffect, useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const user = useMemo(() => {
    if (typeof localStorage !== "undefined") {
      const user = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");
      if (user && accessToken) {
        return user;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/admin");
    } else {
      router.push("/login");
    }
  }, [router, user]);
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
