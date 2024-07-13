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
import { PublisherContext } from "@/context/publisherContext";
import { format } from "date-fns";
import UpdateDialogPublisher from "./UpdateDialogPublisher";

const TableDataPublisher = () => {
  const context = React.useContext(PublisherContext);
  return (
    <Table>
      <TableCaption>A list of your publisher.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] text-center font-sans text-base capitalize">
            #
          </TableHead>
          <TableHead className="text-center font-sans text-base capitalize">
            name
          </TableHead>
          <TableHead className="text-center font-sans text-base capitalize">
            description
          </TableHead>
          <TableHead className="text-center font-sans text-base capitalize">
            Create at
          </TableHead>
          <TableHead className="text-center font-sans text-base capitalize">
            update at
          </TableHead>
          <TableHead className="text-center font-sans text-base capitalize">
            update - edit
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {context?.dataPublisher?.publishers?.map((publisher) => (
          <TableRow key={publisher?.id}>
            <TableCell className="font-sans text-base text-center">
              {publisher?.id}
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              {publisher?.name}
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              {publisher?.description}
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              {format(new Date(publisher?.createdAt), "dd-MM-yyyy HH:mm:ss")}
            </TableCell>
            <TableCell className="font-sans text-base text-center">
              {format(new Date(publisher?.updatedAt), "dd-MM-yyyy HH:mm:ss")}
            </TableCell>
            <TableCell className="flex justify-center">
              <UpdateDialogPublisher
                name={publisher?.name}
                value={publisher?.description}
                idPublisher={publisher?.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableDataPublisher;
