import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { createSession } from "@/lib/auth";

export async function POST(request:Request){
  try{
    const parsed=loginSchema.safeParse(await request.json());
    if(!parsed.success)return NextResponse.json({error:"Enter a valid email and password."},{status:400});
    const user=await prisma.user.findUnique({where:{email:parsed.data.email}});
    if(!user||!user.active||!(await bcrypt.compare(parsed.data.password,user.passwordHash)))
      return NextResponse.json({error:"Email or password is incorrect."},{status:401});
    await createSession(user.id);
    return NextResponse.json({ok:true});
  }catch(error){console.error("Login error",error);return NextResponse.json({error:"Unable to sign in right now."},{status:500});}
}
