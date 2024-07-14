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
import { UserContext } from "@/context/userContext";
import { Badge } from "@/components/ui/badge";

const ListUserNew = () => {
  const userContext = React.useContext(UserContext);
  const dataUser = userContext?.users;
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] font-sans text-sm text-center">
            #
          </TableHead>
          <TableHead className="font-sans text-sm text-center">Name</TableHead>
          <TableHead className="font-sans text-sm text-center">
            Status
          </TableHead>
          <TableHead className="font-sans text-sm text-center">Role</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dataUser?.users.map((user, index) => {
          if (index < 5) {
            return (
              <TableRow key={user?.id}>
                <TableCell className="font-sans text-sm text-center">
                  {user?.id}
                </TableCell>
                <TableCell className="font-sans text-sm text-center">{`${user?.firstName}${user?.lastName}`}</TableCell>
                <TableCell className="font-sans text-sm text-center">
                  {user?.isActice && (
                    <Badge className="bg-green-500 px-4 py-1 font-sans capitalize">
                      actived
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="font-sans text-sm text-center">
                  {user?.roles?.includes("user") && (
                    <Badge className="font-sans bg-green-600 px-5">User</Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  );
};

export default ListUserNew;
