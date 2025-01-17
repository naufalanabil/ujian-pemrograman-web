"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

 const deleteBook = async (id: string) =>(  await prisma.book.delete({ where: { id } }), revalidatePath("/dashboard/books"));

 export default deleteBook