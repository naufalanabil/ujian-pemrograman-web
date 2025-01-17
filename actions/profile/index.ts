"use server";
import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import uploadToCloudinary from "@/helper/server/uploadToCloudinary";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateProfile({
  image,
}: {
  image: string | File;
}) {
  const sesssion = await getAuthUserInfo();

  const { secure_url } = await uploadToCloudinary({
    file: image,
    folder: "bookstore",
  });
  await prisma.user.update({
    where: { id: sesssion?.id as string },
    data: { profileImgUrl: secure_url },
  });
  if (sesssion?.role === "ADMIN") {
    revalidatePath("/dashboard");
    redirect("/dashboard");
  } else {
    revalidatePath("/");
    redirect("/");
  }
}
