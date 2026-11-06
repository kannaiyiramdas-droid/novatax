import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
import { createSession } from "@/lib/auth";

function slugify(value:string){return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,50)||"workspace";}

export async function POST(request:Request){
  try{
    const parsed=registerSchema.safeParse(await request.json());
    if(!parsed.success)return NextResponse.json({error:"Please check the information you entered."},{status:400});
    const {name,email,password,organizationName}=parsed.data;
    const exists=await prisma.user.findUnique({where:{email}});
    if(exists)return NextResponse.json({error:"An account with this email already exists."},{status:409});
    const passwordHash=await bcrypt.hash(password,12);
    const base=slugify(organizationName);
    const slug=`${base}-${crypto.randomUUID().slice(0,6)}`;
    const user=await prisma.user.create({data:{
      name,email,passwordHash,
      memberships:{create:{role:"OWNER",organization:{create:{name:organizationName,slug}}}}
    },select:{id:true}});
    await createSession(user.id);
    return NextResponse.json({ok:true});
  }catch(error){console.error("Registration error",error);return NextResponse.json({error:"Could not create account. Check database configuration and try again."},{status:500});}
}
