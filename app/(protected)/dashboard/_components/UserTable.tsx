"use client";

import { User } from "@prisma/client";
import userColumns from "../users/_column";
import { 
    ColumnVisibilityDropdown,
    Search,
    TableComponent,
    TablePagination,
} from "./tables"
import { useTablesSorting } from "../_hooks";


export function UserTable({ data }: { data: User[] }) {
  const { table } = useTablesSorting({ data, columns: userColumns });

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