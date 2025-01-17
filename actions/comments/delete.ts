"use server";

import titleToSlug from "@/helper/titleToSlug";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const deleteComment = async (commentId: string) => {
  await prisma.comment.delete({ where: { id: commentId } });
};
