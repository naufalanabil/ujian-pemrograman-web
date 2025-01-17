import prisma from "@/lib/db";
import { UserTable } from "../_components/UserTable";
export default async function Users() {
  const users = await prisma.user.findMany({
    where:{
      role: "USER"
    }
  });

  return <UserTable data={users} />;
}
