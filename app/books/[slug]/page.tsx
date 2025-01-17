import getBookById from "@/actions/books/get";
import { getCommentsByBookId } from "@/actions/comments/get";
import BookDetails from "@/components/BookDetails";
import { BookRatingDialog } from "@/components/BookRatingDialog";
import BookCommentSection from "@/components/comments/CommentSection";
import CommentPaginations from "@/components/Paginations";
import { CommentSkeleton } from "@/components/skeleton/CommentSkeleton";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const maxDuration = 30;

export default async function ReadingDetails({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string; page?: string; pageSize?: string };
}) {
  const session = await getServerSession(authOptions);
  const books = await getBookById({
    slug: params.slug,
    id: searchParams.id,
  });
  if (!books || !session) notFound();

  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = parseInt(searchParams.pageSize || "3", 10);
  const { comments, total } = await getCommentsByBookId(
    books.book.id,
    page,
    pageSize
  );
  const { book, isRated } = books;
  const totalPages = Math.ceil(total / pageSize);
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <BookDetails book={book} isRated={isRated} />
      <BookRatingDialog book={book} isRated={isRated} />
      <Suspense fallback={<CommentSkeleton />}>
        <BookCommentSection
          session={session}
          comments={comments}
          bookId={book.id}
        />
        <CommentPaginations currentData={page - 1} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
