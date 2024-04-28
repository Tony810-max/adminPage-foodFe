import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategory } from "@/hook/useCategory";

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const ModalCategory = () => {
  const { onHandleSubmit } = useCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form
      className="flex flex-col gap-4 py-4"
      onSubmit={handleSubmit((data) => onHandleSubmit(data))}
    >
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-right font-sans text-lg capitalize font-bold"
        >
          title
        </label>
        <Input
          {...register("title")}
          id="title"
          placeholder="please enter title"
        />
        {errors.title?.message && (
          <p className="font-sans text-base leading-normal italic text-red-500 capitalize">
            {errors.title?.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-right font-sans text-lg capitalize font-bold nor"
        >
          description
        </label>
        <Input
          {...register("description")}
          id="description"
          placeholder="please enter description"
        />
      </div>
      {errors.description?.message && (
        <p className="font-sans text-base leading-normal italic text-red-500 capitalize">
          {errors.description?.message}
        </p>
      )}
      <div className="flex justify-end">
        <Button
          variant={"destructive"}
          type="submit"
          className="font-sans text-lg font-bold capitalize"
        >
          add category
        </Button>
      </div>
    </form>
  );
};

export default ModalCategory;
