"use server";
import { BookSchemaValues } from "@/app/(protected)/dashboard/_schemas/bookSchema";
import uploadToCloudinary from "@/helper/server/uploadToCloudinary";
import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { extractPublicId } from "cloudinary-build-url";
import { cloudinary } from "@/lib/cld";
import checkAndDestroyImage from "@/helper/server/checkAndDestroyImage";
export default async function updateBook(data: FormData) {
  const { title, description, category, author, content, image, id } =
    Object.fromEntries(data) as BookSchemaValues;

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

    const isFileUpload = typeof image !== "string";
    const imageUrl = isFileUpload
      ? (await uploadToCloudinary({ file: image, folder: "bookstore" })).secure_url
      : image;

    // Update the book record in the database
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        name: title,
        author,
        description,
        content,
        category: category.toLowerCase(),
        imageUrl,
        userId: session?.user?.id as string,
      },
    });

    if (updatedBook) {
      revalidatePath("/dashboard/books");
      redirect("/dashboard/books");
    } else {
      throw new Error("Failed to update book");
    }

}
