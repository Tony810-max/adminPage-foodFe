"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTERS } from "@/types/routers";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "./types/forgotPasswordSchema";
import axios, { AxiosError } from "axios";
import { API_URL, ErrorResponse } from "@/types/common";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const router = useRouter();

  const handleForgotPassword = async (data: { email: string }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/forgot-password`,
        {
          email: data?.email,
        }
      );
      if (response) {
        toast.success(
          "The password has been sent to your email, please check your email."
        );

        setTimeout(() => {
          router.push(ROUTERS.LOGIN);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (
          axiosError.response?.status === 400 ||
          axiosError.response?.status === 404
        ) {
          toast.error(axiosError.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="space-y-2 border rounded-lg shadow-lg py-2 px-10">
        <span className="font-sans text-lg font-bold text-center w-full block">
          Forgot Password
        </span>
        <form
          className="space-y-2"
          onSubmit={handleSubmit(handleForgotPassword)}
        >
          <div className="space-y-2">
            <Label className="font-sans text-base">Enter email</Label>
            <Input
              placeholder="Enter the registered email address"
              {...register("email")}
            />
          </div>
          {errors.email?.message && (
            <p className="font-sans text-sm text-red-600 italic">
              {errors.email?.message}
            </p>
          )}
          <div className="flex justify-between items-center ">
            <Link
              href={ROUTERS.LOGIN}
              className="font-sans text-sm hover:opacity-70"
            >
              Login
            </Link>

            <Button
              type="submit"
              variant={"destructive"}
              className="font-sans text-base"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
