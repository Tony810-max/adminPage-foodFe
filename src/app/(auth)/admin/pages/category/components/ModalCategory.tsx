import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const ModalCategory = () => {
  return (
    <form className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="name" className="text-right">
          Name
        </label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="username" className="text-right">
          Username
        </label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
};

export default ModalCategory;
