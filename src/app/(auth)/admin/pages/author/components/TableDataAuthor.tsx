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
import { format } from "date-fns";
import { AuthorContext } from "@/context/authorContext";
import EditDialogAuthor from "./EditDialogAuthor";
import DeleteAuthor from "./DeleteAuthor";
import PaginationChild from "@/components/PaginationChild";

const TableDataAuthor = () => {
  const context = React.useContext(AuthorContext);
  const dataAuthor = context.dataAuthor?.authors;
  const meta = context?.dataAuthor?.meta;
  const page = context?.page;

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] font-sans text-sm text-center">
              #
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              name
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              gender
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              date of birth
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              create at
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              update at
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              Edit author
            </TableHead>
            <TableHead className="font-sans text-sm text-center capitalize">
              delete author
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataAuthor?.map((author, index) => (
            <TableRow key={author?.id}>
              <TableCell className="font-sans text-sm text-center">
                {index + 1 + (Number(page) - 1) * 5}
              </TableCell>
              <TableCell className="font-sans text-sm text-center">
                {author?.name}
              </TableCell>
              <TableCell className="font-sans text-sm text-center">
                {author?.gender}
              </TableCell>
              <TableCell className="font-sans text-sm text-center">
                {format(new Date(author?.dateOfBirth), "dd-MM-yyyy HH:mm:ss")}
              </TableCell>
              <TableCell className="font-sans text-sm text-center">
                {format(new Date(author?.createdAt), "dd-MM-yyyy HH:mm:ss")}
              </TableCell>
              <TableCell className="font-sans text-sm text-center">
                {format(new Date(author?.updatedAt), "dd-MM-yyyy HH:mm:ss")}
              </TableCell>
              <TableCell className="font-sans text-sm text-center ">
                <EditDialogAuthor idAuthor={author?.id} />
              </TableCell>

              <TableCell className="font-sans text-sm text-center">
                <DeleteAuthor idAuthor={author?.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && meta?.totalPages > 1 && (
        <PaginationChild href="/admin/pages/author" metaComment={meta} />
      )}
    </div>
  );
};

export default TableDataAuthor;
