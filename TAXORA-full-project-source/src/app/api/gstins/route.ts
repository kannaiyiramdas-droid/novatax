import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { gstinSchema } from "@/lib/validation";

export async function POST(request:Request){
 try{
  const userId=await getSessionUserId(); if(!userId)return NextResponse.json({error:"Please sign in."},{status:401});
  const parsed=gstinSchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"Enter a valid GSTIN, legal name and two-digit state code."},{status:400});
  const membership=await prisma.membership.findFirst({where:{userId},orderBy:{createdAt:"asc"}});
  if(!membership)return NextResponse.json({error:"No organisation found."},{status:403});
  if(!["OWNER","ADMIN"].includes(membership.role))return NextResponse.json({error:"Only an owner or admin can add GSTINs."},{status:403});
  const data=parsed.data;
  const row=await prisma.gstRegistration.create({data:{...data,organizationId:membership.organizationId,tradeName:data.tradeName||null}});
  await prisma.auditLog.create({data:{organizationId:membership.organizationId,userId,action:"GSTIN_CREATED",entity:"GstRegistration",entityId:row.id,details:{gstin:row.gstin}}});
  return NextResponse.json({ok:true,id:row.id});
 }catch(error){console.error("GSTIN create error",error);return NextResponse.json({error:"Could not save GSTIN. It may already exist in this workspace."},{status:500});}
}
