import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCategory } from "@/hook/useCategory";

interface modalUpdateProps {
  id: number;
  tittleDefault: string;
  desDefault: string;
}

const schema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const ModaUpdateCategory: React.FC<modalUpdateProps> = ({
  id,
  desDefault,
  tittleDefault,
}) => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const { onHandleSubmitUpdate } = useCategory(id);

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit((data) => onHandleSubmitUpdate(data))}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor="idCategory"
          className="font-sans text-base font-bold uppercase"
        >
          id
        </label>
        <Input
          id="idCategory"
          defaultValue={id}
          className="col-span-3"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="title"
          className="font-sans text-base font-bold uppercase"
        >
          title
        </label>
        <Input
          {...register("title")}
          id="title"
          defaultValue={tittleDefault}
          className="col-span-3"
        />
      </div>
      <div className="flex flex-col  gap-1">
        <label
          htmlFor="description"
          className="font-sans text-base font-bold uppercase"
        >
          description
        </label>
        <Input
          {...register("description")}
          id="description"
          defaultValue={desDefault}
          className="col-span-3"
        />
      </div>
      <div className="flex justify-end">
        <Button variant={"destructive"} type="submit">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default ModaUpdateCategory;
