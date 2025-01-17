"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table"

interface SearchProps {
  table: Table<any>
}

export function Search({ table }: SearchProps) {
  return (
    <Input
      placeholder="Search Something..."
      value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("name")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}