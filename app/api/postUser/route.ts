import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {

  const PostRecord = await db.post.findMany({
     include: {
      user: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc"
      }
    ]
  })

  return NextResponse.json(PostRecord)
}