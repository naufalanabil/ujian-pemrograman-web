"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";
import { usePaginations } from "../../_hooks";

interface PaginationProps {
  table: Table<any>;
}

export function TablePagination({ table }: PaginationProps) {
  const { totalPages, currentPage, getPageNumbers } = usePaginations({
    totalPages: table.getPageCount(),
    currentData: table.getState().pagination.pageIndex,
  });

  return totalPages > 1 ? (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={`${!table.getCanPreviousPage() && "hidden"}`}
        >
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              table.previousPage();
            }}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  table.setPageIndex(page - 1);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem className={`${!table.getCanNextPage() && "hidden"}`}>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              table.nextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ) : null;
}
