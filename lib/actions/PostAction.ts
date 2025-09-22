"use server"
import {  headers } from "next/headers";
import { db } from "../prisma";
import { auth, ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { sendEmailPostAction } from "../actions/sendEmailAction";

export async function PostActions(formData: FormData) {
    const headerlist = await headers();

    const session = await auth.api.getSession({
        headers:headerlist,
    });

    if(!session?.user.id) throw new Error("Not logged in")

    const content = String(formData.get("PostArea"));

    const title = "Activities";

    try {
        await db.post.create({
        data: {
            title,
            content,
            userid: session.user.id
        }
    });
   await sendEmailPostAction({
                        to: session.user.email,
                        subject: title,
                        meta: {
                            description:content,
                        }
                    })
     return {error: null};
    } catch (err) {
        if(err instanceof APIError) {
            const errCode =  err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

            switch(errCode) {
                case "USER_ALREADY_EXISTS":
                    return {error: "Oops! Something went wrong!, please try again"}
                default:
                    return {error: err.message};          
            }
        }
        return {error: "Internal Server Error"}
    }



    // const response = await db.post.create({
    //     data: {
    //         title,
    //         content,
    //         userid: session.user.id
    //     }
    // });

    // return response;
}