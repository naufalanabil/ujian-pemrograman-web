import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/signin");
  }

  redirect("/dashboard/books")
}
