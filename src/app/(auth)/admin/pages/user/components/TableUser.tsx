import { Button } from "@/components/ui/button";
import useUser from "@/hook/useUser";

import { format } from "date-fns";
import { Ban, Pencil } from "lucide-react";
import React from "react";

const TableUser = () => {
  const { dataUser } = useUser();
  return (
    <table className="w-full border-collapse border border-slate-400">
      <thead>
        <tr>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            id
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            Full Name
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            Address
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            Phone number
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            email
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            Create
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            Update
          </th>
          <th className="font-sans text-base capitalize px-2 py-2 border border-slate-300">
            Delete / Update
          </th>
        </tr>
      </thead>
      <tbody>
        {dataUser?.map((user) => (
          <tr key={user?.id}>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {user?.id}
            </td>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {user?.firstName} {user?.lastName}
            </td>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {user?.address}
            </td>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {user?.phoneNumber}
            </td>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {user?.email}
            </td>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {format(new Date(user?.createdAt), "dd/MM/yyy hh:mm:ss")}
            </td>
            <td className="font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              {format(new Date(user?.updatedAt), "dd/MM/yyy hh:mm:ss")}
            </td>
            <td className="h-full flex justify-center gap-3 font-sans text-base text-center capitalize px-2 py-2 border border-slate-300">
              <Button variant={"destructive"}>
                <Ban size={16} />
              </Button>
              <Button variant={"default"}>
                <Pencil size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableUser;
