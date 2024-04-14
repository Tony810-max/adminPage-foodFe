"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const user = useMemo(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    if (user && accessToken) {
      return user;
    }
    return null;
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);
  return (
    <html lang="en">
      <ToastContainer />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
