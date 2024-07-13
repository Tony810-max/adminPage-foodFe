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
import InfoUserDialog from "./InfoUserDialog";

const DataTableAdmin = () => {
  const [dataAdmin, setDataAdmin] = React.useState<IUsers>();

  const fetchAdmin = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken")!);
      const response = await axios.get(`${API_URL}/api/v1/user/admins`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response) {
        setDataAdmin(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your admin.</TableCaption>
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
            role
          </TableHead>
          <TableHead className="font-sans text-sm text-center capitalize">
            information administrator
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataAdmin?.users?.map((admin) => (
          <TableRow key={admin?.id}>
            <TableCell className="font-sans text-sm text-center capitalize">
              {admin?.id}
            </TableCell>
            <TableCell className="font-sans text-sm text-center capitalize">
              {`${admin?.firstName} ${admin?.lastName}`}
            </TableCell>
            <TableCell className="font-sans text-sm text-center capitalize">
              {admin?.isActice ? (
                <Badge className="bg-green-500 px-4 py-1 font-sans capitalize">
                  actived
                </Badge>
              ) : (
                <Badge className="bg-red-500 px-4 py-1 font-sans capitalize">
                  not actived
                </Badge>
              )}
            </TableCell>

            <TableCell className="font-sans text-sm text-center capitalize">
              {admin?.roles?.includes("admin") ? (
                <Badge className="font-sans text-sm bg-red-600 px-4">
                  Admin
                </Badge>
              ) : (
                <Badge className="font-sans text-sm bg-green-600 px-4">
                  User
                </Badge>
              )}
            </TableCell>
            <TableCell className="font-sans text-sm text-center capitalize">
              <InfoUserDialog user={admin} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTableAdmin;
