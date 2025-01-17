import { BookSkeleton } from "@/components/skeleton/BookSkeleton";
import { CommentSkeleton } from "@/components/skeleton/CommentSkeleton";

export default function Loading() {
    return (
        <div className="container min-h-screen mx-auto p-6">
        <BookSkeleton />
        <div className="mt-8">
          <CommentSkeleton />
        </div>
      </div>
    );
}