import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Book, Prisma } from "@prisma/client";
import Image from "next/image";
import capitalizeFirstLetter from "@/helper/capitalizeFirstLetter";
import Link from "next/link";
import rateFormatter from "@/helper/rateFormatter";
import DeleteBookBtn from "../../_components/DeleteBookBtn";

type BookWithRates = Prisma.BookGetPayload<{ include: { ratings: true } }>;

const booksColumns: ColumnDef<BookWithRates>[] = [
  {
    accessorKey: "imageUrl",
    header: "Book Cover",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Image
          className="rounded-md shadow-sm"
          src={row.original.imageUrl || "/img/book.png"}
          alt={row.original.name}
          width={100}
          height={100}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Title",
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <Badge variant={"outline"}>
          {capitalizeFirstLetter(row.original.category as string)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "ratings",
    header: "Rating",
    enableHiding: true,
    cell: ({ row }) => {
      const ratings = row.original.ratings;
      const totalValue = rateFormatter(ratings);
      return (
        <div className="flex items-center gap-2">
          {totalValue ? (
            <>
              <Star className="h-5 w-5" /> <span>{totalValue} / 5</span>
            </>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(book.id)}
            >
              Copy book ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/books/${book.id}`}>
                Edit book details
              </Link>
            </DropdownMenuItem>
            <DeleteBookBtn id={book.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default booksColumns;
