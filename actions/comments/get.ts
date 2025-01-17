"use server"
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
export type BookCommentSectionProps = Prisma.CommentGetPayload<{
    select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImgUrl: true,
          },
        },
      },
}>[];
export const getCommentsByBookId = async (
    bookId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ comments: BookCommentSectionProps; total: number }> => {
    const total = await prisma.comment.count({
      where: { bookId },
    });
  
    const comments = await prisma.comment.findMany({
      where: { bookId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImgUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  
    return { comments, total };
  };