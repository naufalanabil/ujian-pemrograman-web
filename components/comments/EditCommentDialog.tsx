import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import CommentForm from "./CommentForm";

interface Comment {
  id: string;
  author: string;
  content: string;
  bookId: string;
  avatar: string;
}

interface EditCommentDialogProps {
  comment: Comment;
  onClose: () => void;
}

export default function EditCommentDialog({
  comment,
  onClose,
}: EditCommentDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <CommentForm
          content={comment.content}
          commentId={comment.id}
          bookId={comment.bookId}
        />
      </DialogContent>
    </Dialog>
  );
}
