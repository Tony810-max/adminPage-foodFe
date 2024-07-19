"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswrodSchema } from "../types/changePasswrodSchema";
import { typeSubmit } from "../types/common";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { API_URL, ErrorResponse } from "@/types/common";

const FormChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswrodSchema),
  });

  const currentPassword = watch("currentPassword");
  const confirmPassword = watch("confirmPassword");
  const newPassword = watch("newPassword");

  const checkConfirmPassword =
    confirmPassword === newPassword
      ? ""
      : "confirm password does not match new password ";

  const checkNewPassword =
    currentPassword !== "" &&
    newPassword !== "" &&
    currentPassword === newPassword
      ? "Old password and new password cannot be the same"
      : "";

  const handleChangePassword = async (data: typeSubmit) => {
    try {
      if (checkConfirmPassword !== "") {
        toast.error("confirm password does not match new password");
        reset();
        return;
      }
      if (checkNewPassword !== "") {
        toast.error("Old password and new password cannot be the same");
        reset();
        return;
      }
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.post(
        `${API_URL}/api/v1/user/change-password`,
        {
          currentPassword: data?.currentPassword,
          newPassword: data?.confirmPassword,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response) {
        toast.success("Password changed successfully...!!!");
        reset();
      }
    } catch (error) {
      console.error(error);
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
    <form className="space-y-5" onSubmit={handleSubmit(handleChangePassword)}>
      <span className="w-full font-sans text-lg text-center font-semibold block">
        Change Password
      </span>
      <div className="space-y-1">
        <Label>Current Password</Label>
        <Input type="password" {...register("currentPassword")} />
      </div>
      {errors.currentPassword?.message && (
        <p className="text-red-600 font-sans italic text-sm capitalize">
          {errors.currentPassword?.message}
        </p>
      )}
      <div className="space-y-1">
        <Label>New Password</Label>
        <Input type="password" {...register("newPassword")} />
      </div>
      {currentPassword !== "" && newPassword !== "" && checkNewPassword && (
        <p className="text-red-600 font-sans italic text-sm capitalize">
          {checkNewPassword}
        </p>
      )}
      {errors.newPassword?.message && (
        <p className="text-red-600 font-sans italic text-sm capitalize">
          {errors.newPassword?.message}
        </p>
      )}
      <div className="space-y-1">
        <Label>Confirm Password</Label>
        <Input type="password" {...register("confirmPassword")} />
      </div>
      {confirmPassword !== "" && newPassword !== "" && checkConfirmPassword && (
        <p className="text-red-600 font-sans italic text-sm capitalize">
          {checkConfirmPassword}
        </p>
      )}
      {errors.confirmPassword?.message && (
        <p className="text-red-600 font-sans italic text-sm capitalize">
          {errors.confirmPassword?.message}
        </p>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant={"destructive"}
          className="font-sans text-base"
        >
          Change Password
        </Button>
      </div>
    </form>
  );
};

export default FormChangePassword;
