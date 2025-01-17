"use server";
import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import prisma from "@/lib/db";

export type inputUpsertComment = {
  commentId: string;
  bookId: string;
  content: string;
};
export async function upsertComment(data: inputUpsertComment) {
  try {
    const session = await getAuthUserInfo();
    if (!session) throw new Error("Unauthorized");
    const comment = await prisma.comment.upsert({
      where: { id: data.commentId || "" }, // Use a fallback for `id` if it's undefined
      create: {
        content: data.content,
        book: { connect: { id: data.bookId } },
        user: { connect: { id: session.id } },
      },
      update: {
        content: data.content,
      },
    });


    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
