"use client";

import { Book } from "@prisma/client";
import booksColumns from "../books/_column";
import { 
    ColumnVisibilityDropdown,
    Search,
    TableComponent,
    TablePagination,
} from "./tables"
import { useTablesSorting } from "../_hooks";


export function BooksTable({ data }: { data: Book[] }) {
  const { table } = useTablesSorting({ data, columns: booksColumns });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 space-x-4">
        <Search table={table} />
        <ColumnVisibilityDropdown table={table} />
      </div>
      <TableComponent table={table} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <TablePagination table={table} />
      </div>
    </div>
  );
}