// "use server";
// import { updateUser } from "@/lib/auth-client";
// import { uploadImage } from "../SignUpImageUpload/cloudinary";
// import { APIError } from "better-auth/api";
// import { ErrorCode } from "../auth";
// import { revalidatePath } from "next/cache";

// export async function UpdateUserAction(formData: FormData) {

//     const name = String(formData.get("name"));
//     const imageFile = formData.get("image") as File | null;
//     const password = String(formData.get("password"));
//     const confirmPassword = String(formData.get("confirmPassword"));

//     if (!name && !imageFile && !password) {
//         return { error: "Please enter a name, image, or password" };
//     }

//     if (password) {
//         if (password.length < 6) {
//             return { error: "Password must be at least 6 characters" };
//         }
//         if (password !== confirmPassword) {
//             return { error: "Passwords do not match" };
//         }
//     }

//     let imageUrl: string | undefined = undefined;
//     if (imageFile) {
//         try {
//             imageUrl = await uploadImage(imageFile);
//         } catch (error) {
//             return { error: "Image Upload Failed. User was not updated. Please try again later." };
//         }
//     }

//     try {
//         await updateUser({
//         ...(name && { name }),
//         ...(password && { password }),
//         ...(imageUrl && { image: imageUrl })
//     });
//     revalidatePath("/home/profile");
//     return { error: null };   
//     } catch (err) {
//          if(err instanceof APIError) {
//             const errCode =  err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

//             switch(errCode) {
//                 case "USER_ALREADY_EXISTS":
//                     return {error: "Oops! Something went wrong!, please try again"}
//                 default:
//                     return {error: err.message};          
//             }
//         }

//         return {error: "Internal Server Error"}
//     }
// }

"use server";
import { updateUser } from "@/lib/auth-client";
import { uploadImage } from "../SignUpImageUpload/cloudinary";
import { APIError } from "better-auth/api";
import { ErrorCode } from "../auth";
import { revalidatePath } from "next/cache";

export async function UpdateUserAction(formData: FormData) {
  const name = String(formData.get("name"));
  const imageFile = formData.get("image") as File | null;
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirmPassword"));

  if (!name && !imageFile && !password) {
    return { error: "Please enter a name, image, or password" };
  }

  if (password) {
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" };
    }
    if (password !== confirmPassword) {
      return { error: "Passwords do not match" };
    }
  }

  let imageUrl: string | undefined;
  if (imageFile && imageFile.size > 0) {
    try {
      imageUrl = await uploadImage(imageFile);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Image upload failed:", error.message);
      }
      return {
        error:
          "Image Upload Failed. User was not updated. Please try again later.",
      };
    }
  }

  try {
    await updateUser({
      ...(name && { name }),
      ...(password && { password }),
      ...(imageUrl && { image: imageUrl }),
    });

    revalidatePath("/home/profile");
    return { error: null };
  } catch (err: unknown) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return { error: "Oops! Something went wrong!, please try again" };
        default:
          return { error: err.message };
      }
    }

    if (err instanceof Error) {
      console.error("Unexpected error updating user:", err.message);
    }
    return { error: "Internal Server Error" };
  }
}
