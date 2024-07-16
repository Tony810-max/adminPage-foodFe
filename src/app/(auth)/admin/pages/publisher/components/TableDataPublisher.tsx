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
import DeletePublisher from "./DeletePublisher";
import PaginationChild from "@/components/PaginationChild";
import { useSearchParams } from "next/navigation";

const TableDataPublisher = () => {
  const context = React.useContext(PublisherContext);
  const data = context.dataPublisher?.publishers;
  const meta = context.dataPublisher?.meta;
  const search = useSearchParams();
  const page = search.get("page");

  return (
    <>
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
            <TableHead className="text-center font-sans text-base capitalize">
              delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((publisher, index) => (
            <TableRow key={publisher?.id}>
              <TableCell className="font-sans text-base text-center">
                {index + 1 + (Number(page) - 1) * 5}
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
              <TableCell>
                <UpdateDialogPublisher
                  name={publisher?.name}
                  value={publisher?.description}
                  idPublisher={publisher?.id}
                />
              </TableCell>
              <TableCell className="text-center">
                <DeletePublisher idPublisher={publisher?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && meta.totalPages > 1 && (
        <PaginationChild href="/admin/pages/publisher" metaComment={meta} />
      )}
    </>
  );
};

export default TableDataPublisher;
