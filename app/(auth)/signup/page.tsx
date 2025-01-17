import { EditProfileForm } from "@/app/(protected)/dashboard/settings/_EditProfileForm";
import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import { notFound } from "next/navigation";

export default async function NewUser() {
  const user = await getAuthUserInfo();
  if (!user) notFound();
  return (
    <div className="flex justify-center flex-col min-h-screen items-center">
      <div className="text-3xl font-bold">Please Complete your profile</div>
      <div className="min-w-96">
        <EditProfileForm user={user} />
      </div>
    </div>
  );
}
