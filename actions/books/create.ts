"use server";
import { BookSchemaValues } from "@/app/(protected)/dashboard/_schemas/bookSchema";
import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import uploadToCloudinary from "@/helper/server/uploadToCloudinary";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function createBook(data: FormData) {
  const { title, description, category, author, content, image } =
    Object.fromEntries(data) as BookSchemaValues;
  try {
    const user = await getAuthUserInfo();
    if (!user) throw new Error("Unauthorized");
    const res = await prisma.book.create({
      data: {
        name: title,
        author,
        description,
        content,
        category: category.toLowerCase(),
        imageUrl: image
          ? (await uploadToCloudinary({ file: image, folder: "bookstore" })).secure_url
          : null,
        userId: user?.id as string,
      },
    });

    if(res){
      revalidatePath("/dashboard/books");
      return res
    }

  } catch (error) {
    console.log(error);

    throw new Error("Failed to create book");
  }
}
