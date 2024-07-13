"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IEditAuthor, dataAuthor } from "../types/common";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { API_URL } from "@/types/common";
import { AuthorContext } from "@/context/authorContext";
import { toast } from "react-toastify";
import { authorSchema } from "../types/schema";

const FormEditAuthor: React.FC<IEditAuthor> = ({ onSetOpen, idAuthor }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authorSchema),
  });

  const context = React.useContext(AuthorContext);
  const fetchAuthor = context?.fetchAuthor;
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("accessToken")!);
      setAccessToken(token);
    }
  }, []);

  const handleEditAuthor = async (data: dataAuthor) => {
    if (!accessToken) {
      toast.error("No access token found");
      return;
    }
    try {
      const response = await axios.patch(
        `${API_URL}/api/v1/authors/${idAuthor}`,
        {
          name: data?.name,
          gender: data?.genderValue,
          dateOfBirth: data?.date,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response) {
        toast.success("Updated author successfully...!!!");
        onSetOpen(false);
        fetchAuthor();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit(handleEditAuthor)}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="font-sans capitalize">
          Name
        </Label>
        <Input id="name" className="col-span-3" {...register("name")} />
      </div>
      {errors.name?.message && (
        <p className="font-sans text-sm text-red-600 italic capitalize">
          {errors.name?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="font-sans capitalize">gender</Label>
        <Controller
          name="genderValue"
          control={control}
          render={({ field }) => (
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent ref={field.ref}>
                <SelectGroup>
                  <SelectLabel className="font-sans text-base capitalize">
                    gender
                  </SelectLabel>
                  <SelectItem value="Male" className="font-sans text-base">
                    Male
                  </SelectItem>
                  <SelectItem value="Female" className="font-sans text-base">
                    Female
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {errors?.genderValue?.message && (
        <p className="font-sans text-sm text-red-600 italic capitalize">
          {errors?.genderValue?.message}
        </p>
      )}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="dateOfBirth"
          className="font-sans text-base capitalize  text-nowrap"
        >
          date of birth
        </Label>
        <Input
          {...register("date")}
          type="date"
          id="dateOfBirth"
          className="col-span-3"
        />
      </div>
      {errors?.date?.message && (
        <p className="font-sans text-sm text-red-600 italic capitalize">
          {errors?.date?.message}
        </p>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant={"destructive"}
          className="font-sans text-base"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormEditAuthor;
