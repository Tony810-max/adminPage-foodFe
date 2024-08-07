"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { API_URL, IUsers } from "@/types/common";
import { Badge } from "@/components/ui/badge";
import InfoUserDialog from "../DataTableUser/InfoUserDialog";
import AlertDialogRestoreUser from "../../../list-admin/components/AlertDialogRestoreUser";
import { useSearchParams } from "next/navigation";

interface IDelete {
  tabCurr: string;
}

const DataTableUserDelete: React.FC<IDelete> = ({ tabCurr }) => {
  const [dataUserDelete, setDataUserDelete] = React.useState<IUsers>();
  const search = useSearchParams();
  const page = search.get("page");
  const check = tabCurr === "user delete actived" ? true : false;

  const fetchDataUserDelete = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);

      const response = await axios.get(
        `${API_URL}/api/v1/user/deleted?isActive=${check}&page=1&limit=5&search=5`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (response) {
        setDataUserDelete(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchDataUserDelete();
  }, [tabCurr]);

  return (
    <Table>
      <TableCaption>A list of your user deleted .</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] font-sans text-sm text-center">
            #
          </TableHead>
          <TableHead className="font-sans text-sm text-center capitalize">
            name
          </TableHead>
          <TableHead className="font-sans text-sm text-center capitalize">
            status
          </TableHead>
          <TableHead className="font-sans text-sm text-center capitalize">
            infomation user
          </TableHead>
          <TableHead className="font-sans text-sm text-center capitalize">
            restore
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataUserDelete?.users?.map((user) => (
          <TableRow key={user?.id}>
            <TableCell className="font-sans text-sm text-center capitalize">
              {user?.id}
            </TableCell>
            <TableCell className="font-sans text-sm text-center capitalize">
              {`${user?.firstName} ${user?.lastName}`}
            </TableCell>
            <TableCell className="font-sans text-sm text-center capitalize">
              {user?.isActice ? (
                <Badge className="bg-green-500 px-4 py-1 font-sans capitalize">
                  actived
                </Badge>
              ) : (
                <Badge className="bg-red-500 px-4 py-1 font-sans capitalize">
                  not actived
                </Badge>
              )}
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              <InfoUserDialog user={user} />
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              <AlertDialogRestoreUser
                idUser={user?.id}
                fetchUser={fetchDataUserDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTableUserDelete;
