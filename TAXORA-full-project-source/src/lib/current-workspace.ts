import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

export async function requireWorkspace(){
  const userId=await getSessionUserId();
  if(!userId)redirect("/login");
  const membership=await prisma.membership.findFirst({
    where:{userId, user:{active:true}},
    include:{organization:{include:{_count:{select:{gstins:true,clients:true}}}},user:true},
    orderBy:{createdAt:"asc"}
  });
  if(!membership)redirect("/register");
  return membership;
}
