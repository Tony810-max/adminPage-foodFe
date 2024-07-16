"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { IMeta } from "@/types/common";

interface IPaginations {
  href: string;
  metaComment: IMeta;
}

const Paginations: React.FC<IPaginations> = ({ href, metaComment }) => {
  const searchParam = useSearchParams();
  const searchPage = searchParam.get("page");

  const currentPage = Number(searchParam.get("page") || "1");
  const totalPages = metaComment && metaComment?.totalPage;

  const previous =
    currentPage && currentPage <= 1 ? 1 : currentPage && currentPage - 1;

  const next =
    totalPages && currentPage && currentPage >= totalPages
      ? totalPages
      : currentPage + 1;

  const startPage = currentPage && Math.max(currentPage - 5, 1);
  const endPage =
    startPage && totalPages && Math.min(startPage + 4, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            href={`${href}?page=${previous}`}
            className="px-4 hover:opacity-70"
            scroll={false}
          >
            Previous
          </Link>
        </PaginationItem>
        {startPage && startPage > 1 && (
          <>
            <PaginationItem>
              <Link
                href={`${href}?page=1`}
                className="px-4 hover:opacity-70"
                scroll={false}
              >
                1
              </Link>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {endPage &&
          Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <PaginationItem key={index}>
              <Link
                href={`${href}?page=${startPage + index}`}
                className={cn("px-4 hover:opacity-70", {
                  "text-[#F53E32] shadow-md py-2 border rounded-lg":
                    startPage + index === Number(searchPage),
                })}
                scroll={false}
              >
                {startPage + index}
              </Link>
            </PaginationItem>
          ))}
        {endPage && endPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Link
                href={`${href}?page=${totalPages}`}
                className="px-4 hover:opacity-70"
                scroll={false}
              >
                {totalPages}
              </Link>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Link
            href={`${href}?page=${next}`}
            className="px-4 hover:opacity-70"
            scroll={false}
          >
            Next
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
