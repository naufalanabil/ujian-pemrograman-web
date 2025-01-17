import prisma from "@/lib/db";
import UpdateBookForm from "./_UpdateBookForm";
import { notFound } from "next/navigation";

export default async function UpdateBookPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await prisma.book.findFirst({
    where: { id: params.id },
    include: {
        comments: {
          select:{
            id: true,
            content:true,
            user:{
              select:{
                name: true,
                email: true,
                profileImgUrl: true
              }
            },
            createdAt: true,
          }
        },
      },
  });
  if (!book) {
    notFound();
  }
  return <UpdateBookForm book={book} />;
}
