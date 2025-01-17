import prisma from "@/lib/db";
import React from "react";
import { BooksTable } from "../_components/BooksTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import AlertDeleteBook from '@/components/AlertDeleteBook';
export default async function Books() {
  const books = await prisma.book.findMany({
    include:{
      ratings: true
    }
  });
  return (
    <>
      <BooksTable data={books} />
      <Button className="fixed bottom-6 right-6" variant={"default"} asChild>
        <Link href="/dashboard/books/new" className="flex items-center">
          <Plus className="h-6 w-6" />
          <p>Create New Book</p>
        </Link>
      </Button>
      <AlertDeleteBook/>
    </>
  );
}
