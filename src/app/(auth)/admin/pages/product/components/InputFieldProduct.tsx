import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  errorMessage?: string;
  defaultValue?: string;
  type?: string;
  register: UseFormRegister<any>;
}

const InputFieldProduct: React.FC<InputFieldProps> = ({
  label,
  name,
  defaultValue,
  register,
  errorMessage,
  type,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-sans text-base capitalize font-semibold"
      >
        {label}
      </label>
      <Input
        defaultValue={defaultValue}
        id={name}
        {...register(name)}
        type={type}
        min={type === "number" ? 0 : ""}
      />
      {errorMessage && (
        <p className="font-sans text-red-700 capitalize italic">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputFieldProduct;
