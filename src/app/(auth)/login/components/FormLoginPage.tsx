"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs, Inputschema } from "../types/validate";
import axios from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FormLoginPage = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Inputschema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/sign-in`, {
        email: data.email,
        password: data.password,
      });
      if (response) {
        const check = response?.data?.user?.roles?.includes("admin");
        if (check) {
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response?.data?.accessToken)
          );
          toast.success("login successfully");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
        if (!check) {
          toast.error("you are not an admin");
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="absolute border-r border-white flex flex-col gap-10 justify-center z-10 bg-white/10 backdrop-blur backdrop-filter h-full px-24"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="font-sans text-white font-black text-center text-3xl uppercase leading-normal py-3">
        Admin Page
      </span>
      <div className="relative h-10 w-full">
        <div>
          <input
            type="text"
            placeholder="Enter your email"
            className="text-white bg-transparent border-b border-gray-300 text-md w-full p-2 pr-1 placeholder-white focus:outline-none focus:border-white"
            {...register("email")}
          />
          {errors?.email && (
            <p className="text-red-500 normal-case">
              {errors.email.message?.toString()}
            </p>
          )}
          <User
            color="white"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>
      <div className="relative h-10 w-full space-y-2">
        <div>
          <input
            type={!show ? "password" : "text"}
            placeholder="Enter your password"
            className="text-white bg-transparent border-b border-gray-300 text-md w-full p-2 pr-1 placeholder-white focus:outline-none focus:border-white"
            {...register("password")}
          />
          {!show ? (
            <EyeOff
              color="white"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
              onClick={() => setShow(!show)}
            />
          ) : (
            <Eye
              color="white"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
        {errors?.password && (
          <p className="text-red-500 normal-case">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="outline"
        className="font-sans bg-[#CFD8DC] text-black rounded uppercase "
      >
        Login
      </Button>
    </form>
  );
};

export default FormLoginPage;
