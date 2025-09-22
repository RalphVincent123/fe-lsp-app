// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/prisma";


// export async function PUT(req: NextRequest,  { params }: { params: { id: string } }) {
//     try {
//         const { id } = await params;
//         const body = await req.json();

//         const updatedUser = await db.user.update({
//         where: { id },
//         data: {
//             name: body.name,
//             email: body.email,
//             projects: body.project,
//             role: body.role
//         }
//         });

//         return NextResponse.json(updatedUser);

//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
//     }
// }

import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // notice Promise dito
) {
  try {
    const { id } = await context.params; // <-- await kasi Promise
    const body = await req.json();

    const updatedUser = await db.user.update({
      where: { id }, // or Number(id) kung Int
      data: {
        name: body.name,
        email: body.email,
        projects: body.project,
        role: body.role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
     console.error(error);
     return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
