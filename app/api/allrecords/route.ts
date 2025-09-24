import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {

   const allTask = await db.user.findMany({
    })

   return NextResponse.json(allTask);
}