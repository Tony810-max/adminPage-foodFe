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

import { IPostMain } from "@/types/common";
import AuthorDialogPost from "./AuthorDialogPost";
import ToolTipPost from "./ToolTipPost";
import CheckAlertDialog from "./CheckAlertDialog";
import { tab } from "../page";
import PaginationChild from "@/components/PaginationChild";

interface ITable {
  dataPost?: IPostMain;
  fetchPost: () => void;
  tab: tab;
  page: string | null;
}

const TablePost: React.FC<ITable> = ({ dataPost, fetchPost, tab, page }) => {
  const post = dataPost?.posts;
  const meta = dataPost?.meta;

  return (
    <div className="space-y-4">
      <Table className="py-5">
        <TableCaption>A list of your post.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center font-sans text-base capitalize">
              id
            </TableHead>
            <TableHead className="text-center font-sans text-base capitalize">
              title
            </TableHead>
            <TableHead className="text-center font-sans text-base capitalize">
              description
            </TableHead>
            <TableHead className="text-center font-sans text-base capitalize">
              author
            </TableHead>
            {tab?.title === "UnApproved" ? (
              <TableHead className="text-center font-sans text-base capitalize">
                Approve
              </TableHead>
            ) : (
              ""
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {post?.map((post, index) => (
            <TableRow key={post?.id} className="max-h-10 ">
              <TableCell className="text-center font-sans text-base">
                {index + 1 + (Number(page) - 1) * 5}
              </TableCell>
              <TableCell className="text-center font-sans text-base">
                {post?.title}
              </TableCell>
              <TableCell className="text-center font-sans text-base max-w-60 truncate">
                <ToolTipPost description={post?.description} />
              </TableCell>
              <TableCell className="text-center font-sans text-base">
                <AuthorDialogPost data={post?.author} />
              </TableCell>
              {!post?.isApproved ? (
                <TableCell className="flex justify-center">
                  <CheckAlertDialog idPost={post?.id} fetchPost={fetchPost} />
                </TableCell>
              ) : (
                ""
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && meta?.totalPages > 1 && (
        <PaginationChild href="/admin/pages/post" metaComment={meta} />
      )}
    </div>
  );
};

export default TablePost;
