import { upsertComment } from "@/actions/comments/upsert";
import { deleteComment } from "@/actions/comments/delete";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { create } from "zustand";

type onUpsertProps = {
  commentId: string;
  content: string;
  bookId: string;
  router: ReturnType<typeof useRouter>;
};

interface EditCommentState {
  openEditComment: {
    isOpen: boolean;
    commentId?: string;
  };
  onUpsert: ({
    commentId,
    content,
    bookId,
    router,
  }: onUpsertProps) => Promise<void>;
  onDelete: (
    commentId: string,
    router: ReturnType<typeof useRouter>
  ) => Promise<void>;
  setOpenEditComment: (state: { isOpen: boolean; commentId?: string }) => void;
}
const useManageComment = create<EditCommentState>((set) => ({
  openEditComment: { isOpen: false, commentId: undefined },
  setOpenEditComment: (state) => set({ openEditComment: state }),
  onUpsert: async ({ commentId, content, bookId, router }) => {
    try {
      toast.promise(upsertComment({ commentId, content, bookId }), {
        loading: "Commenting",
        success: "Comment successfully",
        error: "Error comment",
      });

      set({ openEditComment: { isOpen: false } });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  },
  onDelete: async (commentId, router) => {
    toast.promise(deleteComment(commentId), {
      loading: "Deleting comment...",
      success: "Comment deleted successfully",
      error: "Error deleting comment",
    });
    router.refresh();
  },
}));

export default useManageComment;
