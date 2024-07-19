import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSchema } from "./types/createSchema";
import axios from "axios";
import { API_URL } from "@/types/common";
import { toast } from "react-toastify";

type inputValue = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  verificationCode: string;
};

interface IFormCreate {
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAdmin: () => {};
}

const FormCreateAdmin: React.FC<IFormCreate> = ({ onSetOpen, fetchAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: {
      verificationCode: "code",
    },
  });

  const createAdmin = async (data: inputValue) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/create-admin-account`,
        {
          email: data?.email,
          password: data?.password,
          firstName: data?.firstName,
          lastName: data?.lastName,
          phoneNumber: data?.phoneNumber,
          verificationCode: data?.verificationCode,
        }
      );
      if (response) {
        toast.success("Admin account created successfully");
        onSetOpen(false);
        fetchAdmin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(createAdmin)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Email
        </Label>
        <Input id="name" className="col-span-3" {...register("email")} />
      </div>
      {errors.email?.message && (
        <p className="font-sans italic text-red-600 capitalize">
          {errors.email?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Password
        </Label>
        <Input
          type="password"
          id="name"
          className="col-span-3"
          {...register("password")}
        />
      </div>
      {errors.password?.message && (
        <p className="font-sans italic text-red-600 capitalize">
          {errors.password?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          First Name
        </Label>
        <Input id="name" className="col-span-3" {...register("firstName")} />
      </div>
      {errors.firstName?.message && (
        <p className="font-sans italic text-red-600 capitalize">
          {errors.firstName?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          LastName
        </Label>
        <Input id="name" className="col-span-3" {...register("lastName")} />
      </div>
      {errors.lastName?.message && (
        <p className="font-sans italic text-red-600 capitalize">
          {errors.lastName?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Phone Number
        </Label>
        <Input
          id="username"
          className="col-span-3"
          {...register("phoneNumber")}
        />
      </div>
      {errors.phoneNumber?.message && (
        <p className="font-sans italic text-red-600 capitalize">
          {errors.phoneNumber?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Verification Code
        </Label>
        <Input
          id="username"
          className="col-span-3"
          {...register("verificationCode")}
        />
      </div>

      <div className="flex justify-end">
        <Button variant={"destructive"}>Create Admin</Button>
      </div>
    </form>
  );
};

export default FormCreateAdmin;
