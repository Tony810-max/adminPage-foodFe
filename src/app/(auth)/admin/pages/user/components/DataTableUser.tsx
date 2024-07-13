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
import InfoUserDialog from "./InfoUserDialog";
import { Badge } from "@/components/ui/badge";
import AddRoleDialog from "./AddRoleDialog";
import RemoveRoleDialog from "./RemoveRoleDialog";
import BanUserDialog from "./BanUserDialog";

interface IDataUser {
  tabCurr: string;
}

const DataTableUser: React.FC<IDataUser> = ({ tabCurr }) => {
  const context = React.useContext(UserContext);
  const dataUser = context?.users;
  return (
    <Table>
      <TableCaption>
        {tabCurr === "actived"
          ? "A list of your user acitved."
          : "A list of your user not acitved."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] font-sans text-base text-center">
            #
          </TableHead>
          <TableHead className="font-sans text-base text-center capitalize">
            name
          </TableHead>
          <TableHead className="font-sans text-base text-center capitalize">
            role
          </TableHead>
          <TableHead className="font-sans text-base text-center capitalize">
            status
          </TableHead>
          <TableHead className="font-sans text-base text-center capitalize">
            Information user
          </TableHead>
          {tabCurr === "actived" ? (
            <TableHead className="font-sans text-base text-center capitalize">
              add role / remove role
            </TableHead>
          ) : (
            ""
          )}
          <TableHead className="font-sans text-base text-center capitalize">
            delete user
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataUser?.users?.map((user) => (
          <TableRow key={user?.id}>
            <TableCell className="font-sans text-base text-center">
              {user?.id}
            </TableCell>
            <TableCell className="font-sans text-sm text-center">
              {`${user?.firstName} ${user?.lastName}`}
            </TableCell>

            <TableCell className="font-sans text-base text-center">
              {user?.roles?.includes("admin") ? (
                <Badge className="font-sans bg-red-600 px-4">Admin</Badge>
              ) : (
                <Badge className="font-sans bg-green-600 px-5">User</Badge>
              )}
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              <InfoUserDialog user={user} />
            </TableCell>
            {tabCurr === "actived" ? (
              <TableCell className="font-sans text-base text-center">
                {user?.roles?.includes("admin") ? (
                  <RemoveRoleDialog idUser={user?.id} />
                ) : (
                  <AddRoleDialog idUser={user?.id} />
                )}
              </TableCell>
            ) : (
              ""
            )}

            <TableCell className="font-sans text-sm text-center">
              <BanUserDialog idUser={user?.id} tabCurr={tabCurr} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTableUser;
