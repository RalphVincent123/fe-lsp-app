import { NextResponse } from "next/server";
// import { auth} from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Projects_Names } from "@prisma/client";

//req: Request

export async function  GET() {
    try {

        const allProjects: Projects_Names[] = [
            Projects_Names.PROJECT_A,
            Projects_Names.PROJECT_B,
            Projects_Names.PROJECT_C,
        ];
        const post = await db.post.findMany({
            where:{
                user: {
                    projects: {in: allProjects}
                }
            },
            include: { user: true },
            orderBy: {createdAt: "desc"}
        })

        return NextResponse.json(post, {status: 200});

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

