"use server";

import { auth, ErrorCode } from "../auth";
import { APIError } from "better-auth/api";
import { db } from "../prisma";
import { Projects_Names } from "@prisma/client";
import { uploadImage } from "../SignUpImageUpload/cloudinary";

export async function signUpEmailAction(formData: FormData) {

    const name = String(formData.get("name"));
    if (!name) return {error:"Please enter your name"};

    const email = String(formData.get("email"));
    if (!email) return {error:"Please enter your email"};

    const projects = String(formData.get("projects"));
    if (!projects) return {error:"Please select your assigned project"};

    const Image = formData.get("image") as File | null;
    if (!Image) return {error:"Please upload your image"};

    const projectEnum = (Object.values(Projects_Names) as string[]).includes(projects) ? (projects as Projects_Names) : null;
    if (!projectEnum) return {error: "Invalid project selected"};

    const password = String(formData.get("password"));
    if (!password) return {error:"Please enter your password"};

    let ImageUrl;
    try {
        ImageUrl = await uploadImage(Image)
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.error("Image upload failed:", error.message);
        }
        return { error: "Image Upload Failed. Post was not created. Please try again later." };
    }

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            }
        })
        
        await db.user.update({
            where: { email },
            data: { projects: projectEnum, image: ImageUrl },
        });
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
}