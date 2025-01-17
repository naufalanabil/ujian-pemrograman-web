"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommentForm from "./CommentForm";
import useManageComment from "@/hooks/useComment";
import { BookCommentSectionProps } from "@/actions/comments/get";
import CommentCard from "./card/CommentCard";
import { Session } from "next-auth";
import { Suspense } from "react";
import { CommentSkeleton } from "../skeleton/CommentSkeleton";

// Main Component
export default function BookCommentSection({
  bookId,
  comments,
  session,
}: {
  bookId: string;
  comments: BookCommentSectionProps;
  session: Session;
}) {
  const openEditComment = useManageComment((state) => state.openEditComment);
  const setOpenEditComment = useManageComment(
    (state) => state.setOpenEditComment
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Comments</CardTitle>
          <CardDescription>{comments.length} comments</CardDescription>
        </CardHeader>
        <CardContent>
          <CommentForm bookId={bookId} />
        </CardContent>
      </Card>
      {comments.map((comment) => (
        <Suspense key={comment.id} fallback={<CommentSkeleton />}>
          <CommentCard
            key={comment.id}
            comment={comment}
            bookId={bookId}
            isCurrentUser={session.user.id === comment.user.id}
            openEditComment={openEditComment}
            setOpenEditComment={setOpenEditComment}
          />
        </Suspense>
      ))}
    </div>
  );
}
