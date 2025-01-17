import prisma from "@/lib/db";
import { EditProfileForm } from "./_EditProfileForm";
import { notFound } from "next/navigation";
export default async function Settings({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const user = await prisma.user.findUnique({
    where: { email: searchParams.email },
  });
  if (!user) notFound();
  return (
    <>
      <EditProfileForm user={user} />
    </>
  );
}
