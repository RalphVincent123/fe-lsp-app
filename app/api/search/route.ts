// app/api/search/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // adjust path if needed
import { Projects_Names } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";

    if (!query) {
      return NextResponse.json([]);
    }

    // const results = await db.post.findMany({
    //   where: {
    //     AND: [
    //       {
    //         OR: [
    //           { title: { contains: query, mode: "insensitive" } },
    //           { content: { contains: query, mode: "insensitive" } },
    //           { user: { name: { contains: query, mode: "insensitive" } } },
    //         ],
    //       },
    //       {
    //          user:{
    //           projects: { in: [Projects_Names.PROJECT_A, Projects_Names.PROJECT_B, Projects_Names.PROJECT_C] }
    //          }
    //       }
    //     ]

    //   },
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         role: true,
    //         projects: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    //   take: 20, // limit results
    // });

    const results = await db.post.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { content: { contains: query, mode: "insensitive" } },
              { user: { name: { contains: query, mode: "insensitive" } } },
              { user: { email: { contains: query, mode: "insensitive" } } }, // search by email din
              {
                user: {
                  projects: {
                    in: Object.values(Projects_Names).filter((p) =>
                      p.toLowerCase().includes(query.toLowerCase())
                    ),
                  },
                },
              }, // search by project name
            ],
          },
          {
            user: {
              projects: {
                in: [
                  Projects_Names.PROJECT_A,
                  Projects_Names.PROJECT_B,
                  Projects_Names.PROJECT_C,
                ],
              },
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            projects: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
