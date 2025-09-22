import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";


export async function PUT(req: Request,  { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const updatedUser = await db.user.update({
        where: { id },
        data: {
            name: body.name,
            email: body.email,
            projects: body.project,
            role: body.role
        }
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}