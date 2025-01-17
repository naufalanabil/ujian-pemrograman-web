import authOptions from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function getAuthUserInfo() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  };
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });
  return user;
}
