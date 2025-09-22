"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { db } from "../prisma";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";

export async function deleteUserAction({userId}: {userId:string}) {

    const headerList = await headers()

    const session = await auth.api.getSession({
        headers: headerList
    })

    if(!session) throw new Error("UnAuthorized");

    if(session.user.role !=="ADMIN" || session.user.id === userId) {
        throw new Error("FORBIDDEN")
    }

    try {
        await db.user.delete({
            where: {
                id: userId,
                role: "USER"
            },
        });

        if (session.user.id === userId) {
            await auth.api.signOut({
                headers: await headerList
            });

            redirect("/")
        }

        revalidatePath("/admin/dashboard");
        return {error: null}

    } catch (err) {
        if (isRedirectError(err)) {
            throw err;
        }
        if(err instanceof Error) {
            return {error: err.message};
        }
        return {error: "INTERNAL SERVER ERROR"}
    }
}