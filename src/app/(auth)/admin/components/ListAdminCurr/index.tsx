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
import { ICardAdmin } from "../../types/common";
import { Badge } from "@/components/ui/badge";

const ListAdminCurr: React.FC<ICardAdmin> = ({ dataAdmin }) => {
  const filterAdmin = React.useMemo(() => {
    return dataAdmin?.users?.filter((admin) => admin.isActice);
  }, [dataAdmin]);

  return (
    <Table>
      <TableCaption>A list admin.</TableCaption>
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
        {filterAdmin?.map((admin, index) => {
          if (index < 5) {
            return (
              <TableRow key={admin?.id}>
                <TableCell className="font-sans text-sm text-center">
                  {admin?.id}
                </TableCell>
                <TableCell className="font-sans text-sm text-center">{`${admin?.firstName} ${admin?.lastName}`}</TableCell>
                <TableCell className="font-sans text-sm text-center">
                  {admin?.isActice && (
                    <Badge className="bg-green-500 px-4 py-1 font-sans capitalize">
                      actived
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {admin?.roles?.includes("admin") && (
                    <Badge className="font-sans bg-red-600 px-4">Admin</Badge>
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

export default ListAdminCurr;
