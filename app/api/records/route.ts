import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {

   const allTask = await db.user.findMany({
    where: {
      role: {
        not: "ADMIN", // exclude admin users
      },
    },})

   return NextResponse.json(allTask);
}