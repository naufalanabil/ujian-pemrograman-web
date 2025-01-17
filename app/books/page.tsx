import { BookCard } from "@/components/BookCard";
import { BookCardGrid } from "@/components/BookCardGrid";
import { StarRating } from "@/components/StarRating";
import prisma from "@/lib/db";
import React from "react";

export default async function ReadingPage() {
  const books = await prisma.book.findMany({
    include: {
      ratings: {
        select: {
          rate: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const booksWithaverageRating = books.map((book) => ({
    ...book,
    averageRating:
      book.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
      book.ratings.length,
  }));
  return (
    <section className="min-h-screen grid place-items-center mx-auto w-full">
      <div>
        <div className=" text-center mt-5">
          <h1 className="text-3xl font-bold ">Reading Page</h1>
          <p className="text-muted-foreground ">This is the reading page</p>
        </div>
        <BookCardGrid>
          {booksWithaverageRating.map((book) => (
            <BookCard key={book.id} {...book}>
              <StarRating rating={book.averageRating} />
            </BookCard>
          ))}
        </BookCardGrid>
      </div>
    </section>
  );
}
