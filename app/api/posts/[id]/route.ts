import { NextResponse } from "next/server";
import { auth} from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function PUT(req: Request,  { params }: { params: { id: string } }) {
    try {

         const { id } = await params;
        const session = await  auth.api.getSession({
            headers: req.headers
        })
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, content } = body;
        
        if (!title || !content) {
            return NextResponse.json({ error: "Missing fields" },
                { status: 400 }
            );
        }

        const updatedPost = await db.post.updateMany({
            where: {
               id,
                userid: session.user.id,
            },
            data: {
                title,
                content
            },
        });

        return NextResponse.json(updatedPost, {status: 200});

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}


export async function DELETE(req: Request, {params}: {params:{id: string}}) {
    try {

        const { id } = await params;
        const session = await  auth.api.getSession({
            headers: req.headers
        })
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const DeletePost = await db.post.deleteMany({
            where: {
               id,
                userid: session.user.id,
            },
        });
         return NextResponse.json(DeletePost, {status: 200});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
