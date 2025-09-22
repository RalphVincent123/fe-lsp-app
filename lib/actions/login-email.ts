
"use server";

import { auth, ErrorCode} from "../auth";
import {  headers } from "next/headers";
import { APIError } from "better-auth/api";
import { db } from "../prisma";
import { redirect } from "next/navigation";

export async function LoginInAction(formData: FormData) {

    const headerlist = await headers();

    const email = String(formData.get("email"));
    if (!email) return {error:"Please enter your email"};

    const password = String(formData.get("password"));
    if (!password) return {error:"Please enter your password"};

    try {
        await auth.api.signInEmail({
            headers: headerlist,
            body: {
                email,
                password,
            },
        });

        // Fetch user info from db to get role
        const user = await db.user.findUnique({
            where: { email },
            select: { role: true }
        });

        return { error: null, role: user?.role || "USER" };
    } catch (err) {

        if(err instanceof APIError) {
            const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
            switch (errCode) {
                case "EMAIL_NOT_VERIFIED":
                    redirect("/verify?error=email_not_verified");
                default:
                    return {error: err.message}
            }
           
        }

        return {error: "Internal Server Error"}
    }
}