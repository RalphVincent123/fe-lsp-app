import { createAuthClient } from "better-auth/react"
import {inferAdditionalFields, adminClient, customSessionClient} from "better-auth/client/plugins"
import type {auth} from "@/lib/auth";
import {ac, roles} from "@/lib/permission"
const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: 
        [inferAdditionalFields<typeof auth>(), adminClient({ac, roles}), customSessionClient<typeof auth>()],

    
})

export const { signUp, signOut, signIn, useSession, admin, sendVerificationEmail, forgetPassword, resetPassword, updateUser } = authClient;