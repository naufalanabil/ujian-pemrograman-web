import getAuthUserInfo from "@/helper/server/getAuthUserInfo";
import { EditProfileForm } from "../(protected)/dashboard/settings/_EditProfileForm";
import { notFound } from "next/navigation";

export default async function Profile() {
  const session = await getAuthUserInfo();
  if (!session) notFound();
  return (
    <section className="min-h-screen  grid place-items-center ">
      <div className="min-w-96">
        <h1 className="text-3xl text-center font-bold text-primary ">
          Profile {session.name ? session.name : session.email}
        </h1>
        <EditProfileForm user={session} />
      </div>
    </section>
  );
}
