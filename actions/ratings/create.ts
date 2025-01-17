"use server";
import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { RatingValues } from "../../components/BookRatingDialog";
interface Rate extends RatingValues {
  book: {
    id: string;
  };
}
export default async function createRate(data: Rate) {
  const session = await getAuthUserInfo();
  if (!session) throw new Error("Unauthorized");

  const book = await prisma.book.findUnique({
    where: { id: data.book.id },
  });

  if (!book) {
    throw new Error("Book not found. Cannot create comment.");
  }
  const rating = await prisma.rating.create({
    data: {
      rate: data.rating,
      bookId: book.id,
      userId: session.id,
    },
  });

  if(rating) {
    revalidatePath("/books");
    return rating
  }
}
