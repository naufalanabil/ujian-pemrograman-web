import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { LoaderCircleIcon } from "lucide-react";
import useManageComment from "@/hooks/useComment";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
const commentSchema = z.object({
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});
export type CommentFormValues = z.infer<typeof commentSchema>;
export default function CommentForm({
  bookId,
  content,
  commentId,
}: {
  bookId: string;
  content?: string;
  commentId?: string;
}) {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: content || "" },
  });
  const { setOpenEditComment, isOpen, upsertComment } = useManageComment(
    useShallow((state) => ({
      upsertComment: state.onUpsert,
      setOpenEditComment: state.setOpenEditComment,
      isOpen: state.openEditComment.isOpen,
    }))
  );
  const router = useRouter();
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await upsertComment({
        commentId: commentId as string,
        content: data.content,
        bookId,
        router,
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 space-x-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={8} placeholder="Add a comment..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <LoaderCircleIcon className="animate-spin mr-2 h-6 w-6" />
          ) : (
            "Comment"
          )}
        </Button>
        {isOpen && commentId && (
          <Button
            onClick={() => setOpenEditComment({ isOpen: false })}
            type="button"
            variant={"secondary"}
          >
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}
