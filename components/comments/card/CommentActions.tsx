import { SquarePen } from "lucide-react";
import { Button } from "../../ui/button";
import { CardFooter } from "../../ui/card";
import DeleteCommentBtn from "../DeleteCommentBtn";
import EditCommentDialog from "../EditCommentDialog";

export default // Comment Actions Component
function CommentActions({
  commentId,
  bookId,
  content,
  avatar,
  author,
  openEditComment,
  setOpenEditComment,
}: {
  commentId: string;
  bookId: string;
  content: string;
  avatar: string;
  author: string;
  openEditComment: { isOpen: boolean; commentId?: string };
  setOpenEditComment: (state: { isOpen: boolean; commentId?: string }) => void;
}) {
  return (
    <CardFooter className="flex justify-end">
      {!openEditComment.isOpen && (
        <Button
          size="icon"
          onClick={() =>
            setOpenEditComment({
              isOpen: true,
              commentId,
            })
          }
          variant="ghost"
        >
          <SquarePen className="h-4 w-4" />
        </Button>
      )}
      <DeleteCommentBtn commentId={commentId} />
      {openEditComment.isOpen && openEditComment.commentId === commentId && (
        <EditCommentDialog
          comment={{ bookId, id: commentId, content, avatar, author }}
          onClose={() => setOpenEditComment({ isOpen: false })}
        />
      )}
    </CardFooter>
  );
}
