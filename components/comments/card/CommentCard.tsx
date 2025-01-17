import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import CommentActions from "./CommentActions";
import { BookCommentSectionProps } from "@/actions/comments/get";

export default // Comment Card Component
function CommentCard({
  comment,
  bookId,
  isCurrentUser,
  openEditComment,
  setOpenEditComment,
}: {
  comment: BookCommentSectionProps[0];
  bookId: string;
  isCurrentUser: boolean;
  openEditComment: { isOpen: boolean; commentId?: string };
  setOpenEditComment: (state: { isOpen: boolean; commentId?: string }) => void;
}) {
  return (
    <Card id="comment-section">
      <CardHeader className="flex flex-row items-start space-x-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={comment.user.profileImgUrl || undefined} />
          <AvatarFallback>
            {comment.user.name?.[0] || comment.user.email[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-lg text-gray-700 dark:text-gray-100">
              {comment.user.name || comment.user.email}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            {format(new Date(comment.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-100">{comment.content}</p>
      </CardContent>
      {isCurrentUser && (
        <CommentActions
          commentId={comment.id}
          bookId={bookId}
          content={comment.content}
          avatar={
            comment.user.profileImgUrl || "https://via.placeholder.com/150"
          }
          author={comment.user.name || comment.user.email}
          openEditComment={openEditComment}
          setOpenEditComment={setOpenEditComment}
        />
      )}
    </Card>
  );
}

