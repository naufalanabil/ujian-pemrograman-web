"use server";
import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";



type BookByIdResponse = Prisma.BookGetPayload<{
  include: {
    comments: {
      include: {
        user: {
          select: {
            name: true;
            email: true;
            profileImgUrl: true;
          };
        };
      };
      orderBy: { createdAt: "desc" };
    };
    ratings: {
      where: {
        userId: string;
      };
    };
  };
}>;

export interface BookResponse {
  book: BookByIdResponse;
  isRated: boolean;
}

export default async function getBookById({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) {
  const session = await getAuthUserInfo();
  if (!session) return null;
  const book = await prisma.book.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      category: true,
      content: true,
      imageUrl: true,
      updatedAt: true,
      description: true,
      name: true,
      author: true,
      comments: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              profileImgUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      ratings: {
        where: {
          userId: session?.id,
        },
      },
    },
  });
  if (!book) return null;
  const isRated = book.ratings.some((rating) => rating.userId === session?.id);

  return {
    book,
    isRated,
  } as BookResponse;
}
